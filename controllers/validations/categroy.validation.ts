import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import statusCodes from "../../utils/status-codes.util";

const createCategoryValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }

  next();
};

const updateCategoryValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }

  next();
};
