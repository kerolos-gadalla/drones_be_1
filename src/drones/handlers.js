import DroneModel from "../models/droneModel.js";
import MedicationModel from "../models/medicationModel.js";
import auditEventLogger from "../utils/auditEventLogger.js";

const DroneHandlers = {
  registerDrone: async (req, res, next) => {
    try {
      const drone = await DroneModel.create(req.body);
      res.status(201).json(drone);
    } catch (err) {
      next(err);
    }
  },

  loadMedications: async (req, res, next) => {
    try {
      const droneId = req.params.id;
      const medicationData = req.body;

      // Get drone and medications from database
      const drone = await DroneModel.findById(droneId);
      const medications = await MedicationModel.find({
        code: { $in: medicationData },
      });

      // Check if drone has enough battery
      if (drone.state !== "IDLE" || drone.batteryCapacity < 25) {
        res.status(400).json({ error: "Drone is not available for loading" });
        return;
      }

      // Check weight limit
      const currentWeight = medications.reduce(
        (acc, med) => acc + med.weight,
        0,
      );
      if (currentWeight > drone.weightLimit) {
        res.status(400).json({
          error: "Drone cannot carry the weight of the loaded medications",
        });
        return;
      }

      // Load medications onto drone and update database
      drone.loadedMedications = medications;
      drone.state = "LOADED";
      await drone.save();

      // Record audit event
      auditEventLogger.logEvent("DRONE_MEDICATION_LOADED", {
        droneId,
        medications,
      });

      res.json(drone);
    } catch (err) {
      next(err);
    }
  },

  getLoadedMedications: async (req, res, next) => {
    try {
      const droneId = req.params.id;
      const drone = await DroneModel.findById(droneId).populate(
        "loadedMedications",
      );
      res.json(drone.loadedMedications);
    } catch (err) {
      next(err);
    }
  },

  getAvailableDrones: async (req, res, next) => {
    try {
      const availableDrones = await DroneModel.find({
        state: "IDLE",
        batteryCapacity: { $gte: 25 },
      });
      res.json(availableDrones);
    } catch (err) {
      next(err);
    }
  },

  getDroneBattery: async (req, res, next) => {
    try {
      const droneId = req.params.id;
      const drone = await DroneModel.findById(droneId);
      res.json({ batteryCapacity: drone.batteryCapacity });
    } catch (err) {
      next(err);
    }
  },
};

export default DroneHandlers;
