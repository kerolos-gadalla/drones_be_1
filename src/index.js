import app from "./app.js";
import { connectDB } from "./config/db.js";
import initScheduledJobs from "./jobs/index.js";
import logger from "./utils/logger.js";
// loading environment variables from.env file

const port = process.env.PORT || 3000;
connectDB();

initScheduledJobs();
app
  .listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  })
  .on("error", (err) => {
    logger.error(`Error: ${err}`);
});
