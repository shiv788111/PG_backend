import express from "express";

import reportsController from "./reports.controller.js";

const router = express.Router();

/* ===============================
   DUE RENT REPORT
================================ */
router.get("/due-rent", reportsController.getDueRentReport);

/* ===============================
   OCCUPANCY REPORT
================================ */
router.get("/occupancy", reportsController.getOccupancyReport);

/* ===============================
   TENANT REPORT
================================ */
router.get("/tenant", reportsController.getTenantReport);

/* ===============================
   AGREEMENT REPORT
================================ */
router.get("/agreements", reportsController.getAgreementReport);

/* ===============================
   REFUND REPORT
================================ */
router.get("/refund", reportsController.getRefundReport);

router.get("/due-rent/pdf", reportsController.exportDueRentPDF);

router.get("/due-rent/excel", reportsController.exportDueRentExcel);

export default router;
