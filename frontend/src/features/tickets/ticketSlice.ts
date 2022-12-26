import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getTickets, addTicket } from "./ticketService";
import type { CreatedTicket } from "../types";

interface InitialState {
  tickets: CreatedTicket[] | null;
  ticket: CreatedTicket | null;
  isLoading: boolean;
  message: string;
}

const initialState: InitialState = {
  tickets: null,
  ticket: null,
  isLoading: false,
  message: "",
};

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state) => {
        state.ticket = null;
        state.tickets = null;
      })
      .addCase(
        getTickets.fulfilled,
        (state, action: PayloadAction<CreatedTicket[]>) => {
          state.tickets = action.payload;
        }
      )
      .addCase(getTickets.rejected, (state, action) => {
        state.message = action.error.message || "Unknown error";
      })
      .addCase(addTicket.pending, (state) => {
        state.isLoading = true;
        state.ticket = null;
        state.tickets = null;
      })
      .addCase(
        addTicket.fulfilled,
        (state, action: PayloadAction<CreatedTicket>) => {
          state.isLoading = false;
          state.ticket = action.payload;
        }
      )
      .addCase(addTicket.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default ticketSlice.reducer;
