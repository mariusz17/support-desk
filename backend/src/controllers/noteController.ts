import Note, { INote } from "../models/noteModel";
import User, { IUser } from "../models/userModel";
import Ticket, { ITicket } from "../models/ticketModel";
import { isValidObjectId } from "mongoose";
import type { RequestHandler, Response } from "express";
import type { VerifiedUser } from "../middleware/authMiddleware";

//@desc		Get notes for a ticket
//@route	GET /api/tickets/:id/notes
//@access	Private
export const getNotes: RequestHandler<
  { id: string },
  INote[],
  { user: VerifiedUser }
> = async (req, res, next) => {
  try {
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

      const notes = await Note.find({ ticket: req.params.id });

      res.status(200).json(notes);
    } else {
      res.status(404);
      throw new Error("Ticket not found");
    }
  } catch (error) {
    next(error);
  }
};
//@desc		Add note to a ticket
//@route	POST /api/tickets/:id/notes
//@access	Private
export const addNote: RequestHandler<
  { id: string },
  INote,
  { user: VerifiedUser; note: string }
> = async (req, res, next) => {
  try {
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

      if (!req.body.note) {
        res.status(400);
        throw new Error("Please add note text");
      }

      const note = await Note.create({
        user: req.body.user.id,
        ticket: req.params.id,
        text: req.body.note,
      });

      res.status(200).json(note);
    } else {
      res.status(404);
      throw new Error("Ticket not found");
    }
  } catch (error) {
    next(error);
  }
};
