import { ErrorRequestHandler } from "express";
import { config } from "../config/config";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  console.log(err);

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: config.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
