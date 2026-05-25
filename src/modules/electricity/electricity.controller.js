import {
  addElectricityReadingService,
  getElectricityReadingsService,
  generateTenantBillsService,
  getTenantBillsService,
  markBillPaidService,
} from "./electricity.service.js";

// ADD READING
export const addElectricityReading = async (req, res) => {
  try {
    const result = await addElectricityReadingService(req.body);

    res.status(201).json({
      success: true,
      message: "Electricity reading added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET READINGS
export const getElectricityReadings = async (req, res) => {
  try {
    const result = await getElectricityReadingsService();

    res.status(200).json({
      success: true,
      message: "Electricity readings fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GENERATE BILLS
export const generateTenantBills = async (req, res) => {
  try {
    const result = await generateTenantBillsService(req.params.reading_id);

    res.status(201).json({
      success: true,
      message: "Tenant electricity bills generated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET TENANT BILLS
export const getTenantBills = async (req, res) => {
  try {
    const result = await getTenantBillsService();

    res.status(200).json({
      success: true,
      message: "Tenant electricity bills fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// MARK BILL PAID
export const markBillPaid = async (req, res) => {
  try {
    const result = await markBillPaidService(req.params.bill_id);

    res.status(200).json({
      success: true,
      message: "Bill marked as paid",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
