import DroneModel, { DRONE_STATES } from "./model";
import MedicationModel from "../medications/model";
import logger from "../utils/logger";

const getDroneByIDMiddleware = async (req, res, next) => {
  try {
    const drone = await DroneModel.findById(req.params.id);
    res.locals.drone = drone;
    if (!drone) {
      return sendDroneNotFound(res);
    }
    next();
  } catch (err) {
    return next(err);
  }
};

const DroneHandlers = {
  listAllDrones: async (_req, res, next) => {
    try {
      const drone = await DroneModel.find();
      return res.status(200).json(drone);
    } catch (err) {
      return next(err);
    }
  },
  getDroneByID: [
    getDroneByIDMiddleware,
    async (req, res, next) => {
      try {
        const drone = res.locals.drone;
        return res.status(200).json(drone);
      } catch (err) {
        return next(err);
      }
    },
  ],
  getDroneBySerialNumber: async (req, res, next) => {
    try {
      const drone = await DroneModel.find({
        serialNumber: req.params.serialNumber,
      });
      return res.status(200).json(drone);
    } catch (err) {
      return next(err);
    }
  },
  registerDrone: async (req, res, next) => {
    try {
      const drone = await DroneModel.create(req.body);
      return res.status(201).json(drone);
    } catch (err) {
      logger.error("got an error");
      return next(err);
    }
  },

  loadMedications: [
    getDroneByIDMiddleware,
    async (req, res, next) => {
      try {
        const medicationCodes = req.body;
        const drone = res.locals.drone;

        // Check if drone has enough battery
        if (drone.state !== DRONE_STATES.IDLE) {
          return res
            .status(400)
            .json({ error: "Drone is not available for loading, not IDLE." });
        }

        if (drone.batteryCapacity < 25) {
          return res.status(400).json({
            error: "Drone is not available for loading, Battery low.",
          });
        }

        const medications = await MedicationModel.find({
          code: { $in: medicationCodes },
        });

        const medsDict = medications.reduce((acc, med) => {
          acc[med.code] = med;
          return acc;
        }, {});
        const NOT_FOUND = Symbol("NOT_FOUND");
        // Check weight limit
        const medicationsToLoad = medicationCodes.map(
          (code) => medsDict[code] || NOT_FOUND
        );
        if (NOT_FOUND in medicationsToLoad) {
          return res
            .status(400)
            .json({ error: "Some given medicaton codes not found" });
        }
        const currentWeight = medicationsToLoad.reduce(
          (acc, med) => acc + med.weight,
          0
        );

        if (currentWeight > drone.weightLimit) {
          return res.status(400).json({
            error: "Drone cannot carry the weight of the loaded medications",
          });
        }

        // Load medications onto drone and update database
        drone.state = DRONE_STATES.LOADING;
        drone.loadedMedications = medicationsToLoad;
        await drone.save();

        return res.json(drone);
      } catch (err) {
        return next(err);
      }
    },
  ],

  getLoadedMedications: async (req, res, next) => {
    try {
      const droneId = req.params.id;
      const drone = await DroneModel.findById(droneId).populate(
        "loadedMedications"
      );
      if (!drone) {
        return res.status(404).json({ error: "Drone not found" });
      }

      return res.json(drone.loadedMedications);
    } catch (err) {
      return next(err);
    }
  },

  getAvailableDrones: async (req, res, next) => {
    try {
      const availableDrones = await DroneModel.find({
        state: DRONE_STATES.IDLE,
        batteryCapacity: { $gte: 25 },
      });
      return res.json(availableDrones);
    } catch (err) {
      return next(err);
    }
  },

  getDroneBattery: async (req, res, next) => {
    try {
      const droneId = req.params.id;
      const drone = await DroneModel.findById(droneId, { batteryCapacity: 1 });
      if (!drone) {
        return sendDroneNotFound(res);
      }
      return res.json({ batteryCapacity: drone.batteryCapacity });
    } catch (err) {
      return next(err);
    }
  },
};

export default DroneHandlers;
function sendDroneNotFound(res: any) {
  return res.status(404).json({ error: "Drone not found" });
}
