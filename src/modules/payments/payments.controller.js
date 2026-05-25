import * as paymentsService from "./payments.service.js";

import { successResponse, errorResponse } from "../../common/utils/response.js";

/*--------------Create Payment-----------*/

export const createPayment = async (req, res) => {
  try {
    const data = await paymentsService.createPayment(req.body, req.user);

    return successResponse(res, data, "Payment created successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*--------------Get Payments-----------*/

export const getPayments = async (req, res) => {
  try {
    const data = await paymentsService.getPayments(req.user);

    return successResponse(res, data, "Payments fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
