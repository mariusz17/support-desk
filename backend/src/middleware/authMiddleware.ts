import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { config } from "../config/config";

// Import types
import { RequestHandler } from "express";

interface DecodedToken extends jwt.JwtPayload {
  id: string;
}

export interface VerifiedUser {
  name: string;
  email: string;
  id: string;
  token: string;
}

const protect: RequestHandler<{}, any, { user: VerifiedUser }> = async (
  req,
  res,
  next
) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Get token from header
      const token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, config.JWT_SECRET) as DecodedToken;
      // Get user from token
      const user = await User.findById(decoded.id).select("-password");
      // Check if user is found
      if (user === null) {
        throw new Error("User not found");
      }

      req.body.user = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        token,
      };

      next();
    } else {
      throw new Error("Token not found");
    }
  } catch (e) {
    console.error(e);
    res.status(401);
    next(new Error("Not authorized"));
  }
};

export default protect;
