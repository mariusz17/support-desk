import { createAsyncThunk } from "@reduxjs/toolkit";
import extractErrorMessage from "../utils/extractErrorMessage";
import { RootState } from "../../app/store";
import axios from "axios";
import type { CreatedNote, NewNote } from "../types";

const API_URL = process.env.REACT_APP_API_URL;

export const getNotes = createAsyncThunk<
  CreatedNote[],
  string,
  { state: RootState }
>("notes/getNotes", async (ticketId, thunkAPI) => {
  try {
    if (!API_URL) {
      throw new Error("API URL was not found in environment variables");
    }

    const token = thunkAPI.getState().auth.user?.token;
    if (!token) throw new Error("Not authorized");

    const url = `${API_URL}/tickets/${ticketId}/notes`;
    const response = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

export const addNote = createAsyncThunk<
  CreatedNote,
  NewNote,
  { state: RootState }
>("notes/addNote", async (newNote, thunkAPI) => {
  try {
    if (!API_URL) {
      throw new Error("API URL was not found in environment variables");
    }

    const token = thunkAPI.getState().auth.user?.token;
    if (!token) throw new Error("Not authorized");

    const ticketId = thunkAPI.getState().ticket.ticket?._id;
    if (!ticketId) throw new Error("Ticket not found");

    const url = `${API_URL}/tickets/${ticketId}/notes`;
    const response = await axios.post(url, newNote, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});
