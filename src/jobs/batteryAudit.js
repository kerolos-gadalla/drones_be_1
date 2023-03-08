import AuditModel from "../audit/model";
import DroneModel from "../drones/model";
import logger from "../utils/logger";

const logBatteriesToAudit = async () => {
  const drones = await DroneModel.find({}, { _id: 1, batteryCapacity: 1, serialNumber: 1 });
  let unSaved = [];
  const save = async () => {
    await AuditModel.insertMany(unSaved);
    unSaved = [];
  };

  for (let index = 0; index < drones.length; index += 1) {
    const drone = drones[index];
    const data = {
      drone,
      serialNumber: drone.serialNumber,
      batteryCapacity: drone.batteryCapacity,
    };
    unSaved.push(
      new AuditModel(data),
    );

    if ((index + 1) % 100) {
      logger.debug(unSaved);
      // eslint-disable-next-line no-await-in-loop
      await save();
    }
  }
  await save();
};

export default logBatteriesToAudit;
