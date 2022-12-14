import axios from "axios";
import getErrorMessage from "../utils/getErrorMessage";
import getTokenFromLS from "../utils/getTokenFromLS";
import type { NewTicket, CreatedTicket } from "../types";

const API_URL = "/api/tickets";

const addTicket = async (
  ticket: NewTicket,
  token: string
): Promise<CreatedTicket> => {
  try {
    if (!token) {
      throw new Error("Not authorized");
    }

    const response = await axios.post(API_URL, ticket, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);

    throw new Error(message);
  }
};

const getTickets = async (): Promise<CreatedTicket[]> => {
  try {
    const token = getTokenFromLS();

    if (!token) {
      throw new Error("Not authorized");
    }

    const response = await axios.get(API_URL, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const tickets = response.data;

    return tickets;
  } catch (error) {
    const message = getErrorMessage(error);

    throw new Error(message);
  }
};

const ticketsService = { getTickets, addTicket };

export default ticketsService;
