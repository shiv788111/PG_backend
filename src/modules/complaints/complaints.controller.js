// complaints.controller.js

import * as complaintsService from "./complaints.service.js";

import { successResponse, errorResponse } from "../../common/utils/response.js";

/*===========================================================================

| CREATE COMPLAINT
| New complaint create karta hai

===========================================================================*/

export const createComplaint = async (req, res) => {
  try {
    const data = await complaintsService.createComplaint(req.body);

    return successResponse(res, data, "Complaint created successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*===========================================================================

| GET COMPLAINTS
| Saari complaints fetch karta hai

===========================================================================*/

export const getComplaints = async (req, res) => {
  try {
    const data = await complaintsService.getComplaints();

    return successResponse(res, data, "Complaints fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*===========================================================================

| RESOLVE COMPLAINT
| Complaint status ko resolved karta hai

===========================================================================*/

export const resolveComplaint = async (req, res) => {
  try {
    const data = await complaintsService.resolveComplaint(req.params.id);

    return successResponse(res, data, "Complaint resolved successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
