import express from "express";
import {
  getTickets,
  getTicket,
  createTicket,
} from "../controllers/ticketController";
import protect from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, getTickets).post(protect, createTicket);
router.get("/:id", protect, getTicket);

export default router;
