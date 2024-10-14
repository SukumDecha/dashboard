import { getTargetAndReality } from "../controller/target-volume.controller";
import express from "express";

const router = express.Router();

router.get("/", getTargetAndReality);

export default router;
