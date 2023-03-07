import CronJob from "node-cron";
import { durationMin } from "../config/env.js";
import logger from "../utils/logger.js";
import logBatteriesToAudit from "./batteryAudit.js";


const initScheduledJobs = () => {
  const scheduledJobFunction = CronJob.schedule(
    `*/${durationMin} * * * *`,
    () => {
      logger.info(`every ${durationMin} min`);
      logBatteriesToAudit();
    },
  );

  scheduledJobFunction.start();
};

export default initScheduledJobs;
