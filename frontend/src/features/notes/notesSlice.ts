import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getNotes, addNote } from "./notesService";
import resetReduxState from "../resetAll";
import type { CreatedNote } from "../types";

type InitialState = {
  note: CreatedNote | null;
  notes: CreatedNote[] | null;
};

const initialState: InitialState = {
  note: null,
  notes: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    reset: (state) => {
      state.note = null;
      state.notes = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetReduxState, (state) => {
        state.note = null;
        state.notes = null;
      })
      .addCase(
        getNotes.fulfilled,
        (state, action: PayloadAction<CreatedNote[]>) => {
          state.notes = action.payload;
        }
      )
      .addCase(
        addNote.fulfilled,
        (state, action: PayloadAction<CreatedNote>) => {
          if (state.notes) {
            state.notes.push(action.payload);
          }
        }
      );
  },
});

export const { reset } = notesSlice.actions;

export default notesSlice.reducer;
