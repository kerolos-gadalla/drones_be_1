import mongoose from "../config/db.js";
import { serialNumberSchema } from "../drones/model.js";

const auditSchema = new mongoose.Schema(
  {
    drone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drone",
    },
    serialNumber: serialNumberSchema,
    batteryCapacity: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
  },
  { timestamps: true },
);

const AuditModel = mongoose.model("Audit", auditSchema);

export default AuditModel;
