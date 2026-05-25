import * as complaintsService from "./complaints.service.js";
import { successResponse, errorResponse } from "../../common/utils/response.js";

/*--------------Create Complaint-----------*/

export const createComplaint = async (req, res) => {
  try {
    const data = await complaintsService.createComplaint(req.body);

    return successResponse(res, data, "Complaint created successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*--------------Get Complaints-----------*/

export const getComplaints = async (req, res) => {
  try {
    const data = await complaintsService.getComplaints(req.user);

    return successResponse(res, data, "Complaints fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*--------------Resolve Complaint-----------*/

export const resolveComplaint = async (req, res) => {
  try {
    const data = await complaintsService.resolveComplaint(req.params.id);

    return successResponse(res, data, "Complaint resolved successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
