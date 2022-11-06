import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { config } from "../config/config";

// Import types
import { RequestHandler, Request } from "express";
import { IUser } from "../models/userModel";
import { TypedRequestBody } from "../models/requestTypes";

interface MyDecodedToken extends jwt.JwtPayload {
  id: string;
}

const protect: RequestHandler = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Get token from header
      const token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, config.JWT_SECRET) as MyDecodedToken;
      // Get user from token
      const user = await User.findById(decoded.id).select("-password");
      // Check if user is found
      if (user === null) {
        throw new Error("User not found");
      }

      (req as TypedRequestBody<{ user: IUser }>).body.user = user;

      next();
    } else {
      throw new Error("Token not found");
    }
  } catch (e) {
    console.log(e);
    res.status(401);
    next(new Error("Not authorized"));
  }
};

export default protect;
