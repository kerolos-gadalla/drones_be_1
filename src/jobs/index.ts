import CronJob from "node-cron";
import { durationMin } from "../config/env";
import logger from "../utils/logger";
import logBatteriesToAudit from "./batteryAudit";


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
