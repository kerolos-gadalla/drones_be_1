import mongoose from "../config/db.js";

const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9_-]*$/,
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    match: /^[A-Z0-9_]*$/,
  },
  image: {
    type: String,
    required: true,
  },
});

const MedicationModel = mongoose.model("Medication", medicationSchema);

export default MedicationModel;
