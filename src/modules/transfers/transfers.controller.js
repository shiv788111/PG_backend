import * as transfersService from "./transfers.service.js";

import { successResponse, errorResponse } from "../../common/utils/response.js";

/*--------------------------------------------------------------------------
| Create Transfer
|--------------------------------------------------------------------------
| Ye API tenant ko ek bed/room se dusre bed/room me
| transfer karne ke liye use hoti hai.
|--------------------------------------------------------------------------
*/

export const createTransfer = async (req, res) => {
  try {
    const data = await transfersService.createTransfer(req.body, req.user);

    return successResponse(res, data, "Transfer created successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*--------------------------------------------------------------------------
| Get Transfers
|--------------------------------------------------------------------------
| Ye API saare transfer records fetch karti hai.
|--------------------------------------------------------------------------
*/

export const getTransfers = async (req, res) => {
  try {
    const data = await transfersService.getTransfers(req.user);

    return successResponse(res, data, "Transfers fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
