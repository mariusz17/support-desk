import axios from "axios";
import type { User } from "./authSlice";

const API_URL = "/api/users";

// Register user
const register = async (userData: User) => {
  try {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    let message: string;

    if (axios.isAxiosError(error)) {
      message = error.response?.data.message || error.message;
    } else {
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }
    }

    throw new Error(message);
  }
};

// Login user
const login = async (userData: User) => {
  try {
    const response = await axios.post(API_URL + "/login", userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    let message: string;

    if (axios.isAxiosError(error)) {
      message = error.response?.data.message || error.message;
    } else {
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }
    }

    throw new Error(message);
  }
};

const authService = {
  register,
  login,
};

export default authService;
