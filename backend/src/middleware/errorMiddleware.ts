import { ErrorRequestHandler } from "express";
import env from "../config/env";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
