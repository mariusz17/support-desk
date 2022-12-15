import axios from "axios";
import extractErrorMessage from "../utils/extractErrorMessage";
import type { NewTicket, CreatedTicket } from "../types";

const API_URL = "/api/tickets";

const addTicket = async (
  ticket: NewTicket,
  token: string
): Promise<CreatedTicket> => {
  try {
    const response = await axios.post(API_URL, ticket, {
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

const getTickets = async (token: string): Promise<CreatedTicket[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const tickets = response.data;

    return tickets;
  } catch (error) {
    const message = extractErrorMessage(error);

    throw new Error(message);
  }
};

const ticketsService = { getTickets, addTicket };

export default ticketsService;
