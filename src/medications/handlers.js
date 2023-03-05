import { respondToError } from "../utils/validationUtil.js";
import MedicationModel from "./model.js";

const MedicationHandlers = {
  registerMedication: async (req, res, next) => {
    try {
      const medication = await MedicationModel.create(req.body);
      res.status(201).json(medication);
    } catch (err) {
      respondToError(err, res, next);
    }
  },

  getAllMedications: async (req, res, next) => {
    try {
      const medications = await MedicationModel.find();
      res.json(medications);
    } catch (err) {
      respondToError(err, res, next);
    }
  },

  getMedicationByCode: async (req, res, next) => {
    try {
      const medication = await MedicationModel.findOne({
        code: req.params.code,
      });
      if (!medication) {
        res.status(404).json({ error: "Medication not found" });
        return;
      }
      res.json(medication);
    } catch (err) {
      respondToError(err, res, next);
    }
  },
};

export default MedicationHandlers;
