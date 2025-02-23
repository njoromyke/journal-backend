import express, { Request, Response } from "express";
require("dotenv").config();
import config from "./config/config";

const app = express();
const cors = require("cors");
const { connectDatabase } = require("./config/db/database");
const { notFound, errorHandler } = require("./middlewares/error.middleware");
const morgan = require("morgan");

connectDatabase();

app.use(cors());
app.use(express.json());

if (config.ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/users", require("./routes/user.route"));
app.use("/api/category", require("./routes/category.route"));
app.use("/api/journals", require("./routes/journal.route"));

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
