import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";
import extractErrorMessage from "../utils/extractErrorMessage";
import type { UserLogin, UserRegister, UserLocalStorage } from "../types";

export interface InitialState {
  user: UserLocalStorage | null;
  isLoading: boolean;
}

const initialState: InitialState = {
  user: null,
  isLoading: false,
};

// Register new user
export const register = createAsyncThunk<UserLocalStorage, UserRegister>(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message = extractErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk<UserLocalStorage, UserLogin>(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      const message = extractErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user from local storage and authorize by backend
export const getMe = createAsyncThunk<UserLocalStorage, void>(
  "auth/getMe",
  async (_, thunkAPI) => {
    try {
      return await authService.getMe();
    } catch (error) {
      const message = extractErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
