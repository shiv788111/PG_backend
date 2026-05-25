import * as pgService from "./pg.service.js";

import { successResponse, errorResponse } from "../../common/utils/response.js";

/*------------------Create PG-------------*/

export const createProperty = async (req, res) => {
  try {
    const data = await pgService.createProperty(req.body);

    return successResponse(res, data, "Property submitted successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*------------------Get Approved PG-------------*/

export const getApprovedProperties = async (req, res) => {
  try {
    const data = await pgService.getApprovedProperties();

    return successResponse(res, data, "Properties fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*------------------Get Single PG-------------*/

export const getSingleProperty = async (req, res) => {
  try {
    const data = await pgService.getSingleProperty(req.params.id);

    return successResponse(res, data, "Property fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*------------------Update PG-------------*/

export const updateProperty = async (req, res) => {
  try {
    const data = await pgService.updateProperty(req.params.id, req.body);

    return successResponse(res, data, "Property updated successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*------------------Delete PG-------------*/

export const deleteProperty = async (req, res) => {
  try {
    const data = await pgService.deleteProperty(req.params.id);

    return successResponse(res, data, "Property deleted successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*------------------Approve PG-------------*/

export const approveProperty = async (req, res) => {
  try {
    const data = await pgService.approveProperty(req.params.id);

    return successResponse(res, data, "Property approved successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
