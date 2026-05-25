import db from "../../common/config/db.js";

/*---------------- Create Meal Plan ----------------*/

const createMealPlan = async (data) => {
  const { branch_id, name, breakfast, lunch, dinner } = data;

  const [result] = await db.query(
    `
      INSERT INTO meal_plans
      (
        branch_id,
        name,
        breakfast,
        lunch,
        dinner
      )
      VALUES (?, ?, ?, ?, ?)
      `,
    [branch_id, name, breakfast, lunch, dinner],
  );

  return result;
};

/*---------------- Get Meal Plans ----------------*/

const getMealPlans = async () => {
  const [rows] = await db.query(
    `
      SELECT
        mp.meal_plan_id,
        b.branch_id,
        b.name AS branch_name,
        mp.name,
        mp.breakfast,
        mp.lunch,
        mp.dinner,
        mp.is_active

      FROM meal_plans mp

      JOIN branches b
        ON b.branch_id = mp.branch_id

      WHERE mp.deleted_at IS NULL

      ORDER BY mp.meal_plan_id DESC
      `,
  );

  return rows;
};

/*---------------- Get Single Meal Plan ----------------*/

const getSingleMealPlan = async (id) => {
  const [rows] = await db.query(
    `
      SELECT
        mp.meal_plan_id,
        b.branch_id,
        b.name AS branch_name,
        mp.name,
        mp.breakfast,
        mp.lunch,
        mp.dinner,
        mp.is_active

      FROM meal_plans mp

      JOIN branches b
        ON b.branch_id = mp.branch_id

      WHERE mp.meal_plan_id = ?
      `,
    [id],
  );

  return rows[0];
};

/*---------------- Update Meal Plan ----------------*/

const updateMealPlan = async (id, data) => {
  const { name, breakfast, lunch, dinner } = data;

  const [result] = await db.query(
    `
      UPDATE meal_plans
      SET
        name = ?,
        breakfast = ?,
        lunch = ?,
        dinner = ?
      WHERE meal_plan_id = ?
      `,
    [name, breakfast, lunch, dinner, id],
  );

  return result;
};

/*---------------- Delete Meal Plan ----------------*/

const deleteMealPlan = async (id) => {
  const [result] = await db.query(
    `
      DELETE FROM meal_plans
      WHERE meal_plan_id = ?
      `,
    [id],
  );

  return result;
};

export default {
  createMealPlan,
  getMealPlans,
  getSingleMealPlan,
  updateMealPlan,
  deleteMealPlan,
};
