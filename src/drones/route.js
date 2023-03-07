import { Router } from "express";
import DroneHandlers from "./handlers.js";

const router = Router();

router.get("/available", DroneHandlers.getAvailableDrones);
router.get("/:id", DroneHandlers.getDroneByID);
router.get("", DroneHandlers.listAllDrones);
router.post("", DroneHandlers.registerDrone);
router.post("/:id/medications", DroneHandlers.loadMedications);
router.get("/:id/medications", DroneHandlers.getLoadedMedications);
router.get("/:id/battery", DroneHandlers.getDroneBattery);

export default router;
