import { genSalt, hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { config } from "../config/config";

// Import types
import { RequestHandler } from "express";
import { Types } from "mongoose";
import { TypedRequestBody } from "../models/requestTypes";
import { IUser } from "../models/userModel";

//@desc		Register a new user
//@route	/api/users
//@access	Public
export const registerUser: RequestHandler = async (
  req: TypedRequestBody<{
    name: string;
    email: string;
    password: string;
  }>,
  res,
  next
) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please include all fields");
    }

    // Find if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (e) {
    next(e);
  }
};

//@desc		Login a user
//@route	/api/users/login
//@access	Public
export const loginUser: RequestHandler = async (
  req: TypedRequestBody<{
    email: string;
    password: string;
  }>,
  res,
  next
) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400);
      throw new Error("Please include all fields");
    }

    const user = await User.findOne({ email });

    // Check user and passwords match
    if (user && (await compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid credentials");
    }
  } catch (e) {
    next(e);
  }
};

//@desc		Get current user
//@route	/api/users/me
//@access	Private
export const getMe: RequestHandler = async (
  req: TypedRequestBody<{ user: IUser }>,
  res,
  next
) => {
  try {
    const user = {
      id: req.body.user._id?.toString() || "Could not get user id.",
      email: req.body.user.email,
      name: req.body.user.name,
    };

    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const generateToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: "30d",
  });
};
