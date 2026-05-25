import {
  createElectricityReading,
  getElectricityReadingsModel,
  generateTenantBillsModel,
  getTenantBillsModel,
  markBillPaidModel,
} from "./electricity.model.js";

export const addElectricityReadingService = async (data) => {
  return await createElectricityReading(data);
};

export const getElectricityReadingsService = async () => {
  return await getElectricityReadingsModel();
};

export const generateTenantBillsService = async (reading_id) => {
  return await generateTenantBillsModel(reading_id);
};

export const getTenantBillsService = async () => {
  return await getTenantBillsModel();
};

export const markBillPaidService = async (bill_id) => {
  return await markBillPaidModel(bill_id);
};
