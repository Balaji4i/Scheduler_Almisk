import Router from "express";
import {
  getStartScheduler,
  getStatusScheduler,
  getStopScheduler,
} from "../controllers/scheduler";

const router = Router();

router.get("/scheduler/start", getStartScheduler);
router.get("/scheduler/stop", getStopScheduler);
router.get("/scheduler/status", getStatusScheduler);

export default router;
