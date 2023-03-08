/* eslint-disable no-restricted-syntax */
import fs from "fs";
import logger from "../utils/logger";
import MigrationModel from "./model";
/**
 * This will be a crude migration implementation
 * Just special for seeding some values
 */

async function migrate() {
  for (const file of fs.readdirSync(`${__dirname}/scripts`).sort()) {
    if (!file.endsWith(".js")) {
      // eslint-disable-next-line no-continue
      continue;
    }
    // eslint-disable-next-line no-await-in-loop
    const count = await MigrationModel.count({ filename: file });
    if (count === 0) {
      // eslint-disable-next-line no-await-in-loop
      const script = await import(`${__dirname}/scripts/${file}`);
      logger.info(`Applying migration ${file}`);

      // eslint-disable-next-line no-await-in-loop
      await script.default.up();
      // eslint-disable-next-line no-await-in-loop
      await MigrationModel.create({ filename: file });
    }
  }
}

export default migrate;
