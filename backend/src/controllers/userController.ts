import { RequestHandler, Request } from "express";

interface reqRegisterUser extends Request {
  body: { name: string; email: string; password: string };
}

//@desc		Register a new user
//@route	/api/users
//@access	Public
export const registerUser: RequestHandler = (req: reqRegisterUser, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  res.send("Register route");
};

//@desc		Login a user
//@route	/api/users/login
//@access	Public
export const loginUser: RequestHandler = (req, res) => {
  res.send("Login route");
};
