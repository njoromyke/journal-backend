import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import statusCodes from "../../utils/status-codes.util";

const createUserValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }

  next();
};

const loginUserValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }

  next();
};

const updateProfileValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }

  next();
};

export { createUserValidator, loginUserValidator, updateProfileValidator };
