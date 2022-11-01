import { RequestHandler, Request } from "express";
import { genSalt, hash } from "bcryptjs";
import User from "../models/userModel";

interface TypedRequestBody<T> extends Request {
  body: T;
}

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
export const loginUser: RequestHandler = (req, res) => {
  res.send("Login route");
};
