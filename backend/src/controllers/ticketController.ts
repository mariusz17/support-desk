import User from "../models/userModel";
import Ticket from "../models/ticketModel";
import type { TypedRequestBody } from "../models/requestTypes";
import type { RequestHandler } from "express";

//@desc		Get tickets
//@route	GET /api/tickets
//@access	Private
export const getTickets: RequestHandler = async (req, res, next) => {
  res.status(200).json({ message: "Get Tickets" });
};

//@desc		Create new ticket
//@route	POST /api/tickets
//@access	Private
export const createTicket: RequestHandler = async (req, res, next) => {
  res.status(200).json({ message: "Create Ticket" });
};
