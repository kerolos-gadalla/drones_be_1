import AuditModel from "../audit/model.js";
import DroneModel from "../drones/model.js";

const logBatteriesToAudit = async () => {
  const drones = await DroneModel.find({}, { _id: 1, batteryCapacity: 1 });
  let unSaved = [];
  const save = async () => {
    await AuditModel.insertMany(unSaved);
    unSaved = [];
  };

  for (let index = 0; index < drones.length; index += 1) {
    const drone = drones[index];
    unSaved.push(
      new AuditModel({
        drone,
        serialNumber: drone.serialNumber,
        batteryCapacity: drone.batteryCapacity,
      }),
    );
    if ((index + 1) % 100) {
      // eslint-disable-next-line no-await-in-loop
      await save();
    }
  }
  await save();
};

export default logBatteriesToAudit;
