import { RequestHandler } from "express";

export const registerUser: RequestHandler = (req, res) => {
  res.send("Register route");
};

export const loginUser: RequestHandler = (req, res) => {
  res.send("Login route");
};
