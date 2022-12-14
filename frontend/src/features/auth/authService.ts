import { createAsyncThunk } from "@reduxjs/toolkit";
import extractErrorMessage from "../utils/extractErrorMessage";
import axios from "axios";
import getTokenFromLS from "../utils/getTokenFromLS";
import type { UserLogin, UserRegister, UserLocalStorage } from "../types";

const API_URL = process.env.REACT_APP_API_URL;

// Register user
export const register = createAsyncThunk<UserLocalStorage, UserRegister>(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      if (!API_URL) {
        throw new Error("API URL was not found in environment variables");
      }

      const response = await axios.post(API_URL + "/users", user);

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      const message = extractErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk<UserLocalStorage, UserLogin>(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      if (!API_URL) {
        throw new Error("API URL was not found in environment variables");
      }

      const response = await axios.post(API_URL + "/users/login", user);

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      const message = extractErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user from local storage and authorize with backend
export const getMe = createAsyncThunk<UserLocalStorage, void>(
  "auth/getMe",
  async (_, thunkAPI) => {
    try {
      if (!API_URL) {
        throw new Error("API URL was not found in environment variables");
      }

      const token = getTokenFromLS();

      if (!token) {
        throw new Error("Not authorized");
      }

      const response = await axios.get(API_URL + "/users/me", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      const message = extractErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
