import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import extractErrorMessage from "../utils/extractErrorMessage";
import type { NewTicket, CreatedTicket } from "../types";

const API_URL = process.env.REACT_APP_API_URL;

// Get tickets of current user
export const getTickets = createAsyncThunk<
  CreatedTicket[],
  void,
  { state: RootState }
>("tickets/getTickets", async (_, thunkAPI) => {
  try {
    if (!API_URL) {
      throw new Error("API URL was not found in environment variables");
    }

    const token = thunkAPI.getState().auth.user?.token;
    if (!token) throw new Error("Not authorized");

    const response = await axios.get(API_URL + "/tickets", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response.data;
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
    if (!API_URL) {
      throw new Error("API URL was not found in environment variables");
    }

    const token = thunkAPI.getState().auth.user?.token;
    if (!token) throw new Error("Not authorized");

    const response = await axios.post(API_URL + "/tickets", ticket, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

export const getTicket = createAsyncThunk<
  CreatedTicket,
  string,
  { state: RootState }
>("tickets/getTicket", async (ticketId, thunkAPI) => {
  try {
    if (!API_URL) {
      throw new Error("API URL was not found in environment variables");
    }

    const token = thunkAPI.getState().auth.user?.token;
    if (!token) throw new Error("Not authorized");

    const response = await axios.get(API_URL + `/tickets/${ticketId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

export const closeTicket = createAsyncThunk<
  CreatedTicket,
  string,
  { state: RootState }
>("tickets/closeTicket", async (ticketId, thunkAPI) => {
  try {
    if (!API_URL) {
      throw new Error("API URL was not found in environment variables");
    }

    const token = thunkAPI.getState().auth.user?.token;
    if (!token) throw new Error("Not authorized");

    const response = await axios.put(
      API_URL + `/${ticketId}`,
      {
        status: "closed",
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});
