import CronJob from "node-cron";
import logBatteriesToAudit from "./batteryAudit.js";

const durationMin = process.env.CRON_DURATION;

const initScheduledJobs = () => {
  const scheduledJobFunction = CronJob.schedule(
    `*/${durationMin} * * * *`,
    () => {
      console.log(`every ${durationMin} min`);
      logBatteriesToAudit();
    },
  );

  scheduledJobFunction.start();
};

export default initScheduledJobs;
