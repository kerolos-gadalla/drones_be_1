import DroneModel, { DRONE_STATES } from "./model.js";
import MedicationModel from "../medications/model.js";
import { respondToError } from "../utils/validationUtil.js";

const DroneHandlers = {
  listAllDrones: async (req, res, next) => {
    try {
      const drone = await DroneModel.find();
      return res.status(200).json(drone);
    } catch (err) {
      return respondToError(err, res, next);
    }
  },
  getDroneByID: async (req, res, next) => {
    try {
      const drone = await DroneModel.findById(req.params.id);
      return res.status(200).json(drone);
    } catch (err) {
      return respondToError(err, res, next);
    }
  },
  registerDrone: async (req, res, next) => {
    try {
      const drone = await DroneModel.create(req.body);
      return res.status(201).json(drone);
    } catch (err) {
      return respondToError(err, res, next);
    }
  },

  loadMedications: async (req, res, next) => {
    try {
      const droneId = req.params.id;
      const medicationCodes = req.body;

      // Get drone and medications from database
      const drone = await DroneModel.findById(droneId);
      const medications = await MedicationModel.find({
        code: { $in: medicationCodes },
      });

      // Check if drone has enough battery
      if (drone.state !== DRONE_STATES.IDLE || drone.batteryCapacity < 25) {
        return res
          .status(400)
          .json({ error: "Drone is not available for loading, Battery low." });
      }

      const medsDict = medications.reduce((acc, med) => {
        acc[med.code] = med;
        return acc;
      }, {});

      // Check weight limit
      const medicationsToLoad = medicationCodes.map(
        (code) => medsDict[code],
      );
      const currentWeight = medicationsToLoad.reduce(
        (acc, med) => acc + med.weight,
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

  getLoadedMedications: async (req, res, next) => {
    try {
      const droneId = req.params.id;
      const drone = await DroneModel.findById(droneId).populate(
        "loadedMedications",
      );
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
      const drone = await DroneModel.findById(droneId);
      return res.json({ batteryCapacity: drone.batteryCapacity });
    } catch (err) {
      return next(err);
    }
  },
};

export default DroneHandlers;
