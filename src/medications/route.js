import { Router } from "express";
import MedicationsHandlers from './handlers.js'
const router = Router();

router.post('', MedicationsHandlers.registerMedication);
router.get('', MedicationsHandlers.getAllMedications);
router.get('/:code', MedicationsHandlers.getMedicationByCode);

export default router;
