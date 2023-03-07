import mongoose from "mongoose";
import logger from "../utils/logger.js";
import { dbUri } from "./env.js";

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to database");
  })
  .catch((err) => {
    logger.error(`Error connecting to database: ${err}`);
  });

export default mongoose;
