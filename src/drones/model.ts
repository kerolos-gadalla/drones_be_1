import mongoose from "../config/db";

export const DRONE_STATES = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  LOADED: "LOADED",
  DELIVERING: "DELIVERING",
  DELIVERED: "DELIVERED",
  RETURNING: "RETURNING",
};
const DRONE_STATES_ARRAY = Object.values(DRONE_STATES);

export const DRONE_MODELS = {
  Lightweight: "Lightweight",
  Middleweight: "Middleweight",
  Cruiserweight: "Cruiserweight",
  Heavyweight: "Heavyweight",
};
const DRONE_MODELS_ARRAY = Object.values(DRONE_MODELS);

export const serialNumberSchema = {
  type: String,
  maxlength: 100,
  required: true,
};

const droneSchema = new mongoose.Schema({
  serialNumber: { ...serialNumberSchema, unique: true },
  model: {
    type: String,
    enum: DRONE_MODELS_ARRAY,
    required: true,
  },
  weightLimit: {
    type: Number,
    max: 500,
    required: true,
  },
  batteryCapacity: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
    default: 100,
  },
  state: {
    type: String,
    enum: DRONE_STATES_ARRAY,
    required: true,
    default: DRONE_STATES.IDLE,
  },
  loadedMedications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medication",
    },
  ],
});

const DroneModel = mongoose.model("Drone", droneSchema);

export default DroneModel;
