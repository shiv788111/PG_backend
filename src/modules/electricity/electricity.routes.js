import express from "express";

const router = express.Router();

import {
  addElectricityReading,
  getElectricityReadings,
  generateTenantBills,
  getTenantBills,
  markBillPaid,
} from "./electricity.controller.js";

// Add Reading
router.post("/add-reading", addElectricityReading);

// Get Readings
router.get("/readings", getElectricityReadings);

// Generate Tenant Bills
router.post("/generate-bills/:reading_id", generateTenantBills);

// Get Tenant Bills
router.get("/tenant-bills", getTenantBills);

// Mark Bill Paid
router.put("/bill-paid/:bill_id", markBillPaid);

export default router;
