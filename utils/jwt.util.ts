import config from "../config/config";

const jwt = require("jsonwebtoken");

export const generateToken = (id: string) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_TOKEN_EXPIRY,
  });
};
