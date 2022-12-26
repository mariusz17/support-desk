import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import resetReduxState from "../resetAll";

interface InitialState {
  path: string;
}

const initialState: InitialState = {
  path: "/",
};

const savePathSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    savePath: (state, action: PayloadAction<string>) => {
      state.path = action.payload;
    },
    resetPath: (state) => {
      state.path = "/";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetReduxState, (state) => {
      state.path = "/";
    });
  },
});

export const { savePath, resetPath } = savePathSlice.actions;

export default savePathSlice.reducer;
