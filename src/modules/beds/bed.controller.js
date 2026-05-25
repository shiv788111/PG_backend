import * as bedsService from "./bed.service.js";
import { successResponse, errorResponse } from "../../common/utils/response.js";

/*--------------Create Bed-----------*/
export const createBed = async (req, res) => {
  try {
    const data = await bedsService.createBed(req.body);

    return successResponse(res, data, "Bed created successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*--------------Get Beds-----------*/
export const getBeds = async (req, res) => {
  try {
    const data = await bedsService.getBeds();

    return successResponse(res, data, "Beds fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*--------------Get Single Bed-----------*/
export const getSingleBed = async (req, res) => {
  try {
    const data = await bedsService.getSingleBed(req.params.id);

    return successResponse(res, data, "Bed fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*--------------Update Bed-----------*/
export const updateBed = async (req, res) => {
  try {
    const data = await bedsService.updateBed(req.params.id, req.body);

    return successResponse(res, data, "Bed updated successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*--------------Delete Bed-----------*/
export const deleteBed = async (req, res) => {
  try {
    const data = await bedsService.deleteBed(req.params.id);

    return successResponse(res, data, "Bed deleted successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
