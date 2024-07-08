import { Request, Response } from "express";
import config from "./config/config";

const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDatabase } = require("./config/db/database");
const { notFound, errorHandler } = require("./middlewares/error.middleware");

dotenv.config();

connectDatabase();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/v1/users", require("./routes/user.route"));

const env = config.ENV;

app.use(notFound);
app.use(errorHandler);

app.listen(config.PORT, () => {
  if (env === "development") {
    console.log(`Server is running on http://localhost:${config.PORT}`);
  } else {
    console.log(`Server is running on port ${config.PORT}`);
  }
});
