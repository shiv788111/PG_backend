import express from "express";

import { createTransfer, getTransfers } from "./transfers.controller.js";

import { verifyToken } from "../../common/middlewares/auth.middleware.js";

import { allowRoles } from "../../common/middlewares/role.middleware.js";

const router = express.Router();

/*--------------------------------------------------------------------------
| Create Transfer
|--------------------------------------------------------------------------
| Tenant transfer create karne ki API
|--------------------------------------------------------------------------
*/

router.post("/create", verifyToken, allowRoles("admin"), createTransfer);

/*--------------------------------------------------------------------------
| Get Transfers
|--------------------------------------------------------------------------
| Saare transfer records fetch karne ki API
|--------------------------------------------------------------------------
*/

router.get("/", verifyToken, allowRoles("admin"), getTransfers);

export default router;
