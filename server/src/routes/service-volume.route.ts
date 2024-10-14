import express from "express";
import { getServiceAndVolume } from "../controller/service-volume.controller";

const router = express.Router();

router.get("/", getServiceAndVolume);

export default router;
