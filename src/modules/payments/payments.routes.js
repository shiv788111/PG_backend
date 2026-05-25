import express from "express";

import { createPayment, getPayments } from "./payments.controller.js";

import { verifyToken } from "../../common/middlewares/auth.middleware.js";

import { allowRoles } from "../../common/middlewares/role.middleware.js";

const router = express.Router();

/*--------------Create Payment-----------*/

router.post("/create", verifyToken, allowRoles("admin"), createPayment);

/*--------------Get Payments-----------*/

router.get("/", verifyToken, allowRoles("admin"), getPayments);

export default router;
