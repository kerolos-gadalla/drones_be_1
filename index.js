import app from "./app.js";
import initScheduledJobs from "./src/jobs/index.js";
import logger from "./src/utils/logger.js";
// loading environment variables from.env file

const port = process.env.PORT || 3000;

initScheduledJobs();
app
  .listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  })
  .on("error", (err) => {
    logger.error(`Error: ${err}`);
  });
