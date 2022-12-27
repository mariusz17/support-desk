import express from "express";
import {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController";
import protect from "../middleware/authMiddleware";
import noteRouter from "./noteRoutes";

// path: /api/tickets
const router = express.Router();

// reroute into note router
router.use("/:id/notes", noteRouter);

router.route("/").get(protect, getTickets).post(protect, createTicket);
router
  .route("/:id")
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);

export default router;
