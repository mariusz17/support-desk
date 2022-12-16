import axios from "axios";
import type { NewTicket, CreatedTicket } from "../types";

const API_URL = "/api/tickets";

const addTicket = async (
  ticket: NewTicket,
  token: string
): Promise<CreatedTicket> => {
  const response = await axios.post(API_URL, ticket, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getTickets = async (token: string): Promise<CreatedTicket[]> => {
  const response = await axios.get(API_URL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const ticketsService = { getTickets, addTicket };

export default ticketsService;
