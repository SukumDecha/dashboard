import express from "express";
import {
  getCustomers,
  getCustomerSatisfaction,
} from "../controller/customer.controller";

const router = express.Router();

// Customer route
router.get("/", getCustomers);

// Customer Satisfaction route
router.get("/satisfaction", getCustomerSatisfaction);

export default router;
