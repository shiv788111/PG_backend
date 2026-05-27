import dashboardModel from "./dashboard.model.js";

/* ======================================================
   Dashboard Services
====================================================== */

const getDashboardStats = async () => {
  return await dashboardModel.getDashboardStats();
};

const getMonthlyRevenue = async () => {
  return await dashboardModel.getMonthlyRevenue();
};

const getOccupancyStats = async () => {
  return await dashboardModel.getOccupancyStats();
};

const getRecentPayments = async () => {
  return await dashboardModel.getRecentPayments();
};

const getRecentTenants = async () => {
  return await dashboardModel.getRecentTenants();
};

const getBranchAnalytics = async () => {
  return await dashboardModel.getBranchAnalytics();
};

export default {
  getDashboardStats,
  getMonthlyRevenue,
  getOccupancyStats,
  getRecentPayments,
  getRecentTenants,
  getBranchAnalytics,
};