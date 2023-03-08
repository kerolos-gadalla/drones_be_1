import MedicationModel from "./model";

const MedicationHandlers = {
  registerMedication: async (req, res, next) => {
    try {
      const { name, weight, code, image } = req.body;
      const medication = await MedicationModel.create({
        name,
        weight,
        code,
        image,
      });
      return res.status(201).json(medication);
    } catch (err) {
      return next(err);
    }
  },

  getAllMedications: async (req, res, next) => {
    try {
      const medications = await MedicationModel.find();
      return res.status(200).json(medications);
    } catch (err) {
      return next(err);
    }
  },

  getMedicationByCode: async (req, res, next) => {
    try {
      const medication = await MedicationModel.findOne({
        code: req.params.code,
      });
      if (!medication) {
        return res.status(404).json({ error: "Medication not found" });
      }
      return res.json(medication);
    } catch (err) {
      return next(err);
    }
  },
  getMedicationById: async (req, res, next) => {
    try {
      const medication = await MedicationModel.findById(req.params.id);
      if (!medication) {
        return res.status(404).json({ error: "Medication not found" });
      }
      return res.json(medication);
    } catch (err) {
      return next(err);
    }
  },
};

export default MedicationHandlers;
