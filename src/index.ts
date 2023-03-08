import app from "./app";
import { connectDB } from "./config/db";
import initScheduledJobs from "./jobs/index";
import migrate from "./migrations/index";
import logger from "./utils/logger";
// loading environment variables from.env file

const port = process.env.PORT || 3000;
connectDB();
migrate();
initScheduledJobs();
app
  .listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  })
  .on("error", (err) => {
    logger.error(`Error: ${err}`);
  });
