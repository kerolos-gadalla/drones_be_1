import { Router } from "express";
import MedicationsHandlers from "./handlers";

const router = Router();

router.post("", MedicationsHandlers.registerMedication);
router.get("", MedicationsHandlers.getAllMedications);
router.get("/:code", MedicationsHandlers.getMedicationByCode);

export default router;
