import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type User = {
  email: string;
  password: string;
  name?: string;
};

interface InitialState {
  user: string | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: InitialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register new user
export const register = createAsyncThunk(
  "auth/register",
  async (user: User, thunkAPI) => {
    console.log(user);
  }
);

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (user: User, thunkAPI) => {
    console.log(user);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, () => {})
      .addCase(register.fulfilled, () => {})
      .addCase(register.rejected, () => {});
  },
});

export default authSlice.reducer;
