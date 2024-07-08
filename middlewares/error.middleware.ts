import { NextFunction, Request, Response } from "express";

const statusCodes = require("../utils/status-codes");

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(statusCodes.NOT_FOUND);
  next(error);
};

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === statusCodes.OK ? statusCodes.INTERNAL_SERVER_ERROR : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

module.exports = { notFound, errorHandler };
