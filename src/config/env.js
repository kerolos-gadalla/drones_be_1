export const dbUri = process.env.DB_URI;

export const durationMin = process.env.CRON_DURATION;

export const logLevel = process.env.LOG_LEVEL || "info";

export const nodeEnv = process.env.NODE_ENV || "dev";

export const isDevEnv = nodeEnv === "dev";
