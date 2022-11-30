import mongoose from "mongoose";

export interface ITicket {
  user: mongoose.Schema.Types.ObjectId;
  product: string;
  description: string;
  status: string;
}

const ticketSchema = new mongoose.Schema<ITicket>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please select a product"],
      enum: ["iPhone", "MacBook", "iMac", "iPad"],
    },
    description: {
      type: String,
      required: [true, "Please write description of the issue."],
    },
    status: {
      type: String,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITicket>("Ticket", ticketSchema);
