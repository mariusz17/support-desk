import mongoose from "mongoose";

export interface INote {
  user: mongoose.Schema.Types.ObjectId;
  ticket: mongoose.Schema.Types.ObjectId;
  text: string;
  isStaff: boolean;
  staffId: string;
}

const noteSchema = new mongoose.Schema<INote>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Ticket",
    },
    text: {
      type: String,
      required: [true, "Please add some text."],
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    staffId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<INote>("Note", noteSchema);
