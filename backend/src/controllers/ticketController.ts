import User, { IUser } from "../models/userModel";
import Ticket from "../models/ticketModel";
import type { TypedRequestBody } from "../models/requestTypes";
import type { RequestHandler } from "express";

interface CreateTicketRequest {
  user: IUser;
  product: string;
  description: string;
}

//@desc		Get tickets
//@route	GET /api/tickets
//@access	Private
export const getTickets: RequestHandler = async (
  req: TypedRequestBody<{ user: IUser }>,
  res,
  next
) => {
  try {
    //get user using id in the JWT
    const user = await User.findById(req.body.user._id);

    if (!user) {
      throw new Error("User not found");
    }

    const tickets = await Ticket.find({
      user: req.body.user._id,
    });

    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

//@desc		Create new ticket
//@route	POST /api/tickets
//@access	Private
export const createTicket: RequestHandler = async (
  req: TypedRequestBody<CreateTicketRequest>,
  res,
  next
) => {
  try {
    const { product, description } = req.body;

    if (!product || !description) {
      res.status(400);
      throw new Error("Please include product and description");
    }

    //get user using id in the JWT
    const user = await User.findById(req.body.user._id);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const ticket = await Ticket.create({
      product,
      description,
      user: req.body.user._id,
    });

    res.status(201).json(ticket);
  } catch (error) {
    next(error);
  }
};
