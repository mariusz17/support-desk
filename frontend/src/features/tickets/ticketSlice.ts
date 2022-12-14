import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import ticketsService from "./ticketService";
import type { UserLocalStorage, NewTicket, CreatedTicket } from "../types";

interface InitialState {
  tickets: CreatedTicket[];
  ticket: CreatedTicket | null;
  isLoading: boolean;
  message: string;
}

const initialState: InitialState = {
  tickets: [],
  ticket: null,
  isLoading: false,
  message: "",
};

// Get tickets of current user
export const getTickets = createAsyncThunk<
  CreatedTicket[],
  void,
  { state: RootState }
>("tickets/getTickets", async (_, thunkAPI) => {
  const user = thunkAPI.getState().auth.user;
  const token = user?.token;
  if (!token) throw new Error("Not authorized");
  return ticketsService.getTickets(token);
});

// Create new ticket
export const addTicket = createAsyncThunk<
  CreatedTicket,
  NewTicket,
  { state: RootState }
>("tickets/addTicket", async (ticket, thunkAPI) => {
  const user = thunkAPI.getState().auth.user;
  const token = user?.token;
  if (!token) throw new Error("Not authorized");
  return ticketsService.addTicket(ticket, token);
});

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.message = "";
      state.ticket = null;
      state.tickets = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getTickets.fulfilled,
        (state, action: PayloadAction<CreatedTicket[]>) => {
          state.isLoading = false;
          state.tickets = action.payload;
        }
      )
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message || "Unknown error";
      })
      .addCase(addTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        addTicket.fulfilled,
        (state, action: PayloadAction<CreatedTicket>) => {
          state.isLoading = false;
          state.ticket = action.payload;
          state.message = "";
        }
      )
      .addCase(addTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.ticket = null;
        state.message = action.error.message || "Unknown error";
      });
  },
});

export default ticketSlice.reducer;

export const { reset } = ticketSlice.actions;
