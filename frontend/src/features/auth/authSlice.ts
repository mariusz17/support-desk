import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// interface InitialState {
//   user: string | null;
//   isError: boolean;
//   isSuccess: boolean;
//   isLoading: boolean;
//   message: string;
// }

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
