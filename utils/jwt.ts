import config from "../config/config";

const jwt = require("jsonwebtoken");

export const generateToken = (payload: any) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_TOKEN_EXPIRY,
  });
};
