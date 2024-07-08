import { NextFunction, Request, Response } from "express";
import config from "../config/config";

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const statusCodes = require("../utils/status-codes");
const { prisma } = require("../config/db/database");

interface CustomRequest extends Request {
  user: any;
}

const protect = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, config.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (user) req.user = user;
    } catch (error) {
      res.status(statusCodes.UNAUTHORIZED);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(statusCodes.UNAUTHORIZED);
    throw new Error("Not authorized, no token");
  }

  next();
});

module.exports = protect;
