import express from "express";
import cors from "cors";
import mongoose, { connectDB } from "./src/config/db.js";
import medicationsRoute from "./src/medications/index.js";
import dronesRoute from "./src/drones/index.js";
import { respondToError } from "./src/utils/validationUtil.js";
import logger from "./src/utils/logger.js";

connectDB();
const app = express();

function getReqLoggingLiteral(req) {
  return `Request ${req.method} to ${req.path}`;
}

app.use((req, _, next) => {
  logger.info(getReqLoggingLiteral(req));
  return next();
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/healthcheck", (_, res) => res.send("OK"));

app.get("/healthcheck2", async (_, res) => {
  res.send(await mongoose.connection.db.listCollections().toArray());
});

app.use("/medications", medicationsRoute);
app.use("/drones", dronesRoute);

// quick error handler for mongoose
app.use((error, req, res, next) => {
  logger.error(getReqLoggingLiteral(req), error);

  return next(error);
});
app.use((error, req, res, next) => respondToError(error, res, next));

export default app;
