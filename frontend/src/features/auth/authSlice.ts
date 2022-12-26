import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { register, login, getMe } from "./authService";
import type { UserLocalStorage } from "../types";

export interface InitialState {
  user: UserLocalStorage | null;
  isLoading: boolean;
}

// I set isLoading to true by default, because of the App logic
// I chose. The logic is that I dispatch getMe action in App.tsx
// and that action gets user from local storage and sends it to backend
// to verify. When verified, the user is set in Redux store, if not,
// the user is set to null. With this logic if I set isLoading to false
// by default and user accesses private route directly (like for example /tickets)
// then PrivateRoute component will instantly redirect user to login page,
// not waiting for action getMe to end (because user initial state is null
// and isLoading is false).
const initialState: InitialState = {
  user: null,
  isLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoading = false;
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<UserLocalStorage>) => {
          state.isLoading = false;
          state.user = action.payload;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<UserLocalStorage>) => {
          state.isLoading = false;
          state.user = action.payload;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
        state.user = null;
      })
      .addCase(
        getMe.fulfilled,
        (state, action: PayloadAction<UserLocalStorage>) => {
          state.isLoading = false;
          state.user = action.payload;
        }
      )
      .addCase(getMe.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;
