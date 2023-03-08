import dotenv from "dotenv";

dotenv.config();

export const dbUri= process.env.DB_URI || '';

export const durationMin = Number.parseInt(process.env.CRON_DURATION as any, 10) || 1;

export const logLevel = process.env.LOG_LEVEL || "info";

export const nodeEnv = process.env.NODE_ENV || "dev";

export const isDevEnv = nodeEnv === "dev";
