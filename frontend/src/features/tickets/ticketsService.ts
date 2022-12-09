import axios from "axios";
import { User } from "../auth/authSlice";
import { Ticket } from "./ticketSlice";

const API_URL = "/api/tickets";

const getTickets = async () => {
  try {
    // Get user from local storage
    const userLS = localStorage.getItem("user");
    if (!userLS) {
      throw new Error("Not authorized");
    }

    // Get token from user object
    const { token } = JSON.parse(userLS) as User;
    if (!token) {
      throw new Error("Not authorized");
    }

    const response = await axios.get(API_URL, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const tickets = response.data as Ticket[];

    return tickets;
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

const ticketsService = { getTickets };

export default ticketsService;
