import express from "express";
import { getSales } from "../controller/sale.controller";

const router = express.Router();

router.get("/", getSales);

export default router;
