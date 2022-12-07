import User from "../models/userModel";
import Ticket, { ITicket } from "../models/ticketModel";
import { isValidObjectId } from "mongoose";
import type { RequestHandler, Response } from "express";
import type { VerifiedUser } from "../middleware/authMiddleware";

//@desc		Get tickets
//@route	GET /api/tickets
//@access	Private
export const getTickets: RequestHandler<{}, ITicket[], { user: VerifiedUser }> =
  async (req, res, next) => {
    try {
      //get user using id in the JWT
      const user = await User.findById(req.body.user.id);

      if (!user) {
        throw new Error("User not found");
      }

      const tickets = await Ticket.find({
        user: req.body.user.id,
      });

      res.status(200).json(tickets);
    } catch (error) {
      next(error);
    }
  };

//@desc		Get one ticket
//@route	GET /api/ticket/:id
//@access	Private
export const getTicket: RequestHandler<
  { id: string },
  ITicket,
  { user: VerifiedUser }
> = async (req, res, next) => {
  try {
    //get user using id in the JWT
    const user = await User.findById(req.body.user.id);

    if (!user) {
      throw new Error("User not found");
    }

    if (isValidObjectId(req.params.id)) {
      const ticket = await Ticket.findById(req.params.id);

      if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
      }

      if (ticket.user.toString() !== req.body.user.id) {
        res.status(401);
        throw new Error("Not authorized");
      }

      res.status(200).json(ticket);
    } else {
      res.status(404);
      throw new Error("Ticket not found");
    }
  } catch (error) {
    next(error);
  }
};

//@desc		Delete ticket
//@route	DELETE /api/ticket/:id
//@access	Private
export const deleteTicket: RequestHandler<
  { id: string },
  { success: boolean },
  { user: VerifiedUser }
> = async (req, res, next) => {
  try {
    //get user using id in the JWT
    const user = await User.findById(req.body.user.id);

    if (!user) {
      throw new Error("User not found");
    }

    if (isValidObjectId(req.params.id)) {
      const ticket = await Ticket.findById(req.params.id);

      if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
      }

      if (ticket.user.toString() !== req.body.user.id) {
        res.status(401);
        throw new Error("Not authorized");
      }

      await ticket.remove();

      res.status(200).json({ success: true });
    } else {
      res.status(404);
      throw new Error("Ticket not found");
    }
  } catch (error) {
    next(error);
  }
};

//@desc		Update ticket
//@route	PUT /api/ticket/:id
//@access	Private
export const updateTicket: RequestHandler<
  { id: string },
  ITicket,
  {
    user: VerifiedUser;
    product: string;
    description: string;
    status: string;
  }
> = async (req, res, next) => {
  try {
    //get user using id in the JWT
    const user = await User.findById(req.body.user.id);

    if (!user) {
      throw new Error("User not found");
    }

    if (isValidObjectId(req.params.id)) {
      const ticket = await Ticket.findById(req.params.id);

      if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
      }

      if (ticket.user.toString() !== req.body.user.id) {
        res.status(401);
        throw new Error("Not authorized");
      }

      const updatedTicket = (await Ticket.findByIdAndUpdate(
        req.params.id,
        {
          product: req.body.product,
          description: req.body.description,
          status: req.body.status,
        },
        { new: true }
      )) as ITicket;

      res.status(200).json(updatedTicket);
    } else {
      res.status(404);
      throw new Error("Ticket not found");
    }
  } catch (error) {
    next(error);
  }
};

//@desc		Create new ticket
//@route	POST /api/tickets
//@access	Private
export const createTicket: RequestHandler<
  {},
  ITicket,
  { user: VerifiedUser; product: string; description: string }
> = async (req, res, next) => {
  try {
    const { product, description } = req.body;

    if (!product || !description) {
      res.status(400);
      throw new Error("Please include product and description");
    }

    //get user using id in the JWT
    const user = await User.findById(req.body.user.id);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const ticket = await Ticket.create({
      product,
      description,
      user: req.body.user.id,
    });

    res.status(201).json(ticket);
  } catch (error) {
    next(error);
  }
};
