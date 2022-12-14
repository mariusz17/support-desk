import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";
import type { UserLogin, UserRegister, UserLocalStorage } from "../types";

export interface InitialState {
  user: UserLocalStorage | null;
  isLoading: boolean;
  message: string;
}

const initialState: InitialState = {
  user: null,
  isLoading: false,
  message: "",
};

// Register new user
export const register = createAsyncThunk<UserLocalStorage, UserRegister>(
  "auth/register",
  async (user) => {
    return await authService.register(user);
  }
);

// Login user
export const login = createAsyncThunk<UserLocalStorage, UserLogin>(
  "auth/login",
  async (user) => {
    return await authService.login(user);
  }
);

// Get user from local storage and authorize by backend
export const getMe = createAsyncThunk("auth/getMe", async () => {
  return await authService.getMe();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.message = "";
      state.user = null;
    },
    logout: (state) => {
      state.isLoading = false;
      state.message = "";
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
          state.message = "";
          state.user = action.payload;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.message = action.error.message || "Unknown error";
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<UserLocalStorage>) => {
          state.isLoading = false;
          state.message = "";
          state.user = action.payload;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.message = action.error.message || "Unknown error";
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getMe.fulfilled,
        (state, action: PayloadAction<UserLocalStorage>) => {
          state.isLoading = false;
          state.message = "";
          state.user = action.payload;
        }
      )
      .addCase(getMe.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.message = "";
      });
  },
});

export default authSlice.reducer;

export const { reset, logout } = authSlice.actions;
