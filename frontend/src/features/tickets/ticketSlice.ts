import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import ticketsService from "./ticketsService";

export type Ticket = {
  product: "iPhone" | "MacBook" | "iPad";
  description: string;
  user?: string;
};

interface InitialState {
  tickets: Ticket[];
  ticket: Ticket | {};
  isLoading: boolean;
  message: string;
}

const initialState: InitialState = {
  tickets: [],
  ticket: {},
  isLoading: false,
  message: "",
};

// Get tickets of current user
export const getTickets = createAsyncThunk("tickets/getTickets", async () => {
  return ticketsService.getTickets();
});

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getTickets.fulfilled,
        (state, action: PayloadAction<Ticket[]>) => {
          state.isLoading = false;
          state.tickets = action.payload;
        }
      )
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message || "Unknown error";
      });
  },
});

export default ticketSlice.reducer;
