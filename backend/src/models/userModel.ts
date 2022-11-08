import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  _id?: mongoose.Types.ObjectId;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
