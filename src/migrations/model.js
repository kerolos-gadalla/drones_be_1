import mongoose from "../config/db.js";

const migrationSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const MigrationModel = mongoose.model("Migration", migrationSchema);

export default MigrationModel;
