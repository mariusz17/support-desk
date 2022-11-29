import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";

export type User = {
  email: string;
  password: string;
  name?: string;
  token?: string;
  _id?: number;
};

interface InitialState {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

// Get user from local storage
const userJSON = localStorage.getItem("user");
const user = userJSON ? JSON.parse(userJSON) : null;

const initialState: InitialState = {
  user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register new user
export const register = createAsyncThunk(
  "auth/register",
  async (user: User) => {
    return await authService.register(user);
  }
);

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (user: User, thunkAPI) => {}
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.user = null;
    },
    logout: () => {
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message =
          action.error.message || "Unknown error registering a user";
      });
  },
});

export default authSlice.reducer;

export const { reset, logout } = authSlice.actions;
