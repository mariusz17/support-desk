import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTickets, addTicket, getTicket, closeTicket } from "./ticketService";
import resetReduxState from "../resetAll";
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
        state.tickets = null;
      })
      .addCase(addTicket.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addTicket.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getTicket.pending, (state) => {
        state.ticket = null;
      })
      .addCase(
        getTicket.fulfilled,
        (state, action: PayloadAction<CreatedTicket>) => {
          state.ticket = action.payload;
        }
      )
      .addCase(closeTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        closeTicket.fulfilled,
        (state, action: PayloadAction<CreatedTicket>) => {
          state.ticket = action.payload;
          state.tickets =
            state.tickets?.map((ticket) =>
              ticket._id === action.payload._id ? action.payload : ticket
            ) || null;
          state.isLoading = false;
        }
      )
      .addCase(closeTicket.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(resetReduxState, (state) => {
        state.tickets = null;
        state.ticket = null;
        state.isLoading = false;
        state.message = "";
      });
  },
});

export default ticketSlice.reducer;
