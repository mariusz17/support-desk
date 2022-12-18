import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import ticketsService from "./ticketService";
import type { NewTicket, CreatedTicket } from "../types";
import extractErrorMessage from "../utils/extractErrorMessage";

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

// Get tickets of current user
export const getTickets = createAsyncThunk<
  CreatedTicket[],
  void,
  { state: RootState }
>("tickets/getTickets", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    if (!token) throw new Error("Not authorized");
    return await ticketsService.getTickets(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

// Create new ticket
export const addTicket = createAsyncThunk<
  CreatedTicket,
  NewTicket,
  { state: RootState }
>("tickets/addTicket", async (ticket, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    if (!token) throw new Error("Not authorized");
    return await ticketsService.addTicket(ticket, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

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
