import dashboardService from "./dashboard.service.js";

/* ======================================================
   Get Dashboard Stats Controller
====================================================== */
const getDashboardStats = async (req, res) => {
  try {
    const data = await dashboardService.getDashboardStats();

    return res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   Get Monthly Revenue Controller
====================================================== */
const getMonthlyRevenue = async (req, res) => {
  try {
    const data = await dashboardService.getMonthlyRevenue();

    return res.status(200).json({
      success: true,
      message: "Monthly revenue fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   Get Occupancy Statistics Controller
====================================================== */
const getOccupancyStats = async (req, res) => {
  try {
    const data = await dashboardService.getOccupancyStats();

    return res.status(200).json({
      success: true,
      message: "Occupancy stats fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   Get Recent Payments Controller
====================================================== */
const getRecentPayments = async (req, res) => {
  try {
    const data = await dashboardService.getRecentPayments();

    return res.status(200).json({
      success: true,
      message: "Recent payments fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   Get Recent Tenants Controller
====================================================== */
const getRecentTenants = async (req, res) => {
  try {
    const data = await dashboardService.getRecentTenants();

    return res.status(200).json({
      success: true,
      message: "Recent tenants fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   Get Branch Analytics Controller
====================================================== */
const getBranchAnalytics = async (req, res) => {
  try {
    const data = await dashboardService.getBranchAnalytics();

    return res.status(200).json({
      success: true,
      message: "Branch analytics fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  getDashboardStats,
  getMonthlyRevenue,
  getOccupancyStats,
  getRecentPayments,
  getRecentTenants,
  getBranchAnalytics,
};
