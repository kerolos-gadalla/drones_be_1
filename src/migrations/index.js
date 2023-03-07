/* eslint-disable no-restricted-syntax */
import fs from "fs";
import MigrationModel from "./model.js";
/**
 * This will be a crude migration implementation
 * Just special for seeding some values
 */

async function migrate() {
  for (const file of fs.readdirSync("./scripts").sort()) {
    // eslint-disable-next-line no-await-in-loop
    const count = await MigrationModel.count({ filename: file });
    if (count === 0) {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const script = require(`./scripts/${file}`);
      script.up();
      // eslint-disable-next-line no-await-in-loop
      await MigrationModel.create({ filename: file });
    }
  }
}

export default migrate;
