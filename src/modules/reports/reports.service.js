import reportsModel from "./reports.model.js";

/* ===============================
   DUE RENT REPORT
================================ */
const getDueRentReport = async () => {
  return await reportsModel.getDueRentReport();
};

/* ===============================
   OCCUPANCY REPORT
================================ */
const getOccupancyReport = async () => {
  return await reportsModel.getOccupancyReport();
};

/* ===============================
   TENANT REPORT
================================ */
const getTenantReport = async () => {
  return await reportsModel.getTenantReport();
};

/* ===============================
   AGREEMENT REPORT
================================ */
const getAgreementReport = async () => {
  return await reportsModel.getAgreementReport();
};

/* ===============================
   REFUND REPORT
================================ */
const getRefundReport = async () => {
  return await reportsModel.getRefundReport();
};

export default {
  getDueRentReport,
  getOccupancyReport,
  getTenantReport,
  getAgreementReport,
  getRefundReport,
};
