import axios from "axios";
import extractErrorMessage from "../utils/extractErrorMessage";
import getTokenFromLS from "../utils/getTokenFromLS";
import type { UserLogin, UserRegister, UserLocalStorage } from "../types";

const API_URL = "/api/users";

// Register user
const register = async (userData: UserRegister): Promise<UserLocalStorage> => {
  try {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    const message = extractErrorMessage(error);

    throw new Error(message);
  }
};

// Login user
const login = async (userData: UserLogin): Promise<UserLocalStorage> => {
  try {
    const response = await axios.post(API_URL + "/login", userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    const message = extractErrorMessage(error);

    throw new Error(message);
  }
};

// Get user from local storage and authorize with backend
const getMe = async (): Promise<UserLocalStorage> => {
  try {
    const token = getTokenFromLS();

    if (!token) {
      throw new Error("Not authorized");
    }

    const response = await axios.get(API_URL + "/me", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    const message = extractErrorMessage(error);

    throw new Error(message);
  }
};

const authService = {
  register,
  login,
  getMe,
};

export default authService;
