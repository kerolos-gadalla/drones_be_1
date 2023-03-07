import DroneModel, { DRONE_STATES } from "./model.js";
import MedicationModel from "../medications/model.js";
import { respondToError } from "../utils/validationUtil.js";

const DroneHandlers = {
  listAllDrones: async (req, res, next) => {
    try {
      const drone = await DroneModel.find();
      res.status(200).json(drone);
    } catch (err) {
      respondToError(err, res, next);
    }
  },
  getDroneByID: async (req, res, next) => {
    try {
      const drone = await DroneModel.findById(req.params.id);
      res.status(200).json(drone);
    } catch (err) {
      respondToError(err, res, next);
    }
  },
  registerDrone: async (req, res, next) => {
    try {
      const drone = await DroneModel.create(req.body);
      res.status(201).json(drone);
    } catch (err) {
      respondToError(err, res, next);
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
        res
          .status(400)
          .json({ error: "Drone is not available for loading, Battery low." });
        return;
      }

      const medsDict = medications.reduce((acc, med) => {
        acc[med.code] = med;
        return acc;
      }, {});

      // Check weight limit
      const medicationsToLoad = medicationCodes.map(
        (code) =>  medsDict[code]
      );
      const currentWeight = medicationsToLoad.reduce(
        (acc, med) => acc + med.weight
      );
      if (currentWeight > drone.weightLimit) {
        res.status(400).json({
          error: "Drone cannot carry the weight of the loaded medications",
        });
        return;
      }

      // Load medications onto drone and update database
      drone.state = DRONE_STATES.LOADING;
      drone.loadedMedications = medicationsToLoad;
      await drone.save();

      res.json(drone);
    } catch (err) {
      respondToError(err, res, next);
    }
  },

  getLoadedMedications: async (req, res, next) => {
    try {
      const droneId = req.params.id;
      const drone = await DroneModel.findById(droneId).populate(
        "loadedMedications"
      );
      res.json(drone.loadedMedications);
    } catch (err) {
      respondToError(err, res, next);
    }
  },

  getAvailableDrones: async (req, res, next) => {
    try {
      const availableDrones = await DroneModel.find({
        state: DRONE_STATES.IDLE,
        batteryCapacity: { $gte: 25 },
      });
      res.json(availableDrones);
    } catch (err) {
      respondToError(err, res, next);
    }
  },

  getDroneBattery: async (req, res, next) => {
    try {
      const droneId = req.params.id;
      const drone = await DroneModel.findById(droneId);
      res.json({ batteryCapacity: drone.batteryCapacity });
    } catch (err) {
      respondToError(err, res, next);
    }
  },
};

export default DroneHandlers;
