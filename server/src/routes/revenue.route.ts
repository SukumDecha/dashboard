import express from "express";
import { getRevenue } from "../controller/revenue.controller";

const router = express.Router();

router.get("/", getRevenue);

export default router;
