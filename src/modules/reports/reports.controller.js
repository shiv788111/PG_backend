import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";

import reportsService from "./reports.service.js";

/* ===============================
   DUE RENT REPORT
================================ */
const getDueRentReport = async (req, res) => {
  try {
    const data = await reportsService.getDueRentReport();

    return res.status(200).json({
      success: true,
      message: "Due rent report fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* ===============================
   OCCUPANCY REPORT
================================ */
const getOccupancyReport = async (req, res) => {
  try {
    const data = await reportsService.getOccupancyReport();

    return res.status(200).json({
      success: true,
      message: "Occupancy report fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* ===============================
   TENANT REPORT
================================ */
const getTenantReport = async (req, res) => {
  try {
    const data = await reportsService.getTenantReport();

    return res.status(200).json({
      success: true,
      message: "Tenant report fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* ===============================
   AGREEMENT REPORT
================================ */
const getAgreementReport = async (req, res) => {
  try {
    const data = await reportsService.getAgreementReport();

    return res.status(200).json({
      success: true,
      message: "Agreement report fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* ===============================
   REFUND REPORT
================================ */
const getRefundReport = async (req, res) => {
  try {
    const data = await reportsService.getRefundReport();

    return res.status(200).json({
      success: true,
      message: "Refund report fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* ===============================
   EXPORT DUE RENT PDF
================================ */
const exportDueRentPDF = async (req, res) => {
  try {
    const data = await reportsService.getDueRentReport();

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=due-rent-report.pdf",
    );

    doc.pipe(res);

    doc.fontSize(20).text("Due Rent Report", {
      align: "center",
    });

    doc.moveDown();

    data.forEach((item, index) => {
      doc.fontSize(14).text(`Tenant : ${item.tenant_name}`);

      doc.text(`Branch : ${item.branch_name}`);

      doc.text(`Bed : ${item.bed_name}`);

      doc.text(`Room : ${item.room_name}`);

      doc.text(`Monthly Rent : ₹${item.monthly_rent}`);

      doc.text(`Paid Amount : ₹${item.paid_amount}`);

      doc.text(`Due Amount : ₹${item.due_amount}`);

      doc.moveDown();

      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* ===============================
   EXPORT DUE RENT EXCEL
================================ */
const exportDueRentExcel = async (req, res) => {
  try {
    const data = await reportsService.getDueRentReport();

    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet("Due Rent Report");

    if (data.length > 0) {
      worksheet.columns = Object.keys(data[0]).map((key) => ({
        header: key,
        key: key,
        width: 25,
      }));

      data.forEach((item) => {
        worksheet.addRow(item);
      });
    }

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=due-rent-report.xlsx",
    );

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default {
  getDueRentReport,
  getOccupancyReport,
  getTenantReport,
  getAgreementReport,
  getRefundReport,

  exportDueRentPDF,
  exportDueRentExcel,
};
