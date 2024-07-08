const config = {
  PORT: process.env.PORT || 4000,
  ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_TOKEN_EXPIRY: process.env.JWT_TOKEN_EXPIRY,
};

export default config;
