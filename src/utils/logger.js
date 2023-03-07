import { createLogger, format, transports } from "winston";
import { isDevEnv, logLevel } from "../config/env.js";

const logger = createLogger({
  transports: [
    ...(isDevEnv ? [new transports.Console({ level: "debug" })] : []),
    new transports.File({
      filename: "logs/server.log",
      level: logLevel,
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
  ],
});

export default logger;
