import * as adminService from "./admin.service.js";

import { successResponse, errorResponse } from "../../common/utils/response.js";

export const createAdmin = async (req, res) => {
  try {
    const data = await adminService.createAdmin(req.body);

    return successResponse(res, data, "Admin created successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
