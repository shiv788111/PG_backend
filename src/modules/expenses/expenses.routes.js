import express from "express";

import {
  createExpenseCategory,
  getExpenseCategories,
  createExpense,
  getExpenses,
} from "./expenses.controller.js";

import { verifyToken } from "../../common/middlewares/auth.middleware.js";

import { allowRoles } from "../../common/middlewares/role.middleware.js";

const router = express.Router();

/*--------------Create Expense Category-----------*/

router.post(
  "/category/create",
  verifyToken,
  allowRoles("admin"),
  createExpenseCategory,
);

/*--------------Get Expense Categories-----------*/

router.get(
  "/categories",
  verifyToken,
  allowRoles("admin"),
  getExpenseCategories,
);

/*--------------Create Expense-----------*/

router.post("/create", verifyToken, allowRoles("admin"), createExpense);

/*--------------Get Expenses-----------*/

router.get("/", verifyToken, allowRoles("admin"), getExpenses);

export default router;
