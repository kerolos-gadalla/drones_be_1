import mongoose from "mongoose";
import logger from "../utils/logger";
import { dbUri } from "./env";

export const connectDB = async () => {
  mongoose
    .connect(dbUri)
    .then(() => {
      logger.info("Connected to database");
    })
    .catch((err) => {
      logger.error(`Error connecting to database: ${err}`);
    });
};

export default mongoose;
