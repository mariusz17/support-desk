import express from "express";
import { getTickets, createTicket } from "../controllers/ticketController";
import protect from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, getTickets).post(protect, createTicket);

export default router;
