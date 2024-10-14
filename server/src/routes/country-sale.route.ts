import express from "express";
import { getCountrySales } from "../controller/country-sale.controller";

const router = express.Router();

router.get("/", getCountrySales);

export default router;
