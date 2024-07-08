import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import statusCodes from "../../utils/status-codes.util";

const createJournalValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryId: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }
};

const updateJournalValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryId: Joi.number().required(),
    id: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }
};

export { createJournalValidator, updateJournalValidator };
