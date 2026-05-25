import {
  createExpenseCategoryQuery,
  getExpenseCategoriesQuery,
  createExpenseQuery,
  getExpensesQuery,
  checkBranchOwnership,
} from "./expenses.model.js";

/*--------------Create Expense Category-----------*/

export const createExpenseCategory = async (payload) => {
  const { name } = payload;

  await createExpenseCategoryQuery(name);

  return null;
};

/*--------------Get Expense Categories-----------*/

export const getExpenseCategories = async () => {
  return await getExpenseCategoriesQuery();
};

/*--------------Create Expense-----------*/

export const createExpense = async (payload, user) => {
  const {
    branch_id,

    expense_category_id,

    amount,

    expense_date,

    description,

    receipt_url,
  } = payload;

  /*
    |--------------------------------------------------------------------------
    | Check Branch Ownership
    |--------------------------------------------------------------------------
    */

  const branch = await checkBranchOwnership(branch_id, user.user_id);

  if (!branch) {
    throw new Error("Branch not found");
  }

  await createExpenseQuery({
    branch_id,

    expense_category_id,

    amount,

    expense_date,

    description,

    receipt_url,
  });

  return null;
};

/*--------------Get Expenses-----------*/

export const getExpenses = async (user) => {
  return await getExpensesQuery(user.user_id);
};
