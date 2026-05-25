import db from "../../common/config/db.js";

/*---------------- Create Manager ----------------*/

const createManager = async (data) => {
  const { user_id, branch_id, phone, salary, joining_date } = data;

  const [result] = await db.query(
    `
      INSERT INTO managers
      (
        user_id,
        branch_id,
        phone,
        salary,
        joining_date
      )
      VALUES (?, ?, ?, ?, ?)
      `,
    [user_id, branch_id, phone, salary, joining_date],
  );

  return result;
};

/*---------------- Get All Managers ----------------*/

const getManagers = async () => {
  const [rows] = await db.query(
    `
      SELECT
        m.manager_id,
        u.user_id,
        u.name AS manager_name,
        b.branch_id,
        b.name AS branch_name,
        m.phone,
        m.salary,
        m.joining_date,
        m.is_active
      FROM managers m
      JOIN users u
        ON u.user_id = m.user_id
      JOIN branches b
        ON b.branch_id = m.branch_id
      WHERE m.deleted_at IS NULL
      ORDER BY m.manager_id DESC
      `,
  );

  return rows;
};

/*---------------- Get Single Manager ----------------*/

const getSingleManager = async (id) => {
  const [rows] = await db.query(
    `
      SELECT
        m.manager_id,
        u.user_id,
        u.name AS manager_name,
        b.branch_id,
        b.name AS branch_name,
        m.phone,
        m.salary,
        m.joining_date,
        m.is_active
      FROM managers m
      JOIN users u
        ON u.user_id = m.user_id
      JOIN branches b
        ON b.branch_id = m.branch_id
      WHERE m.manager_id = ?
      `,
    [id],
  );

  return rows[0];
};

/*---------------- Update Manager ----------------*/

const updateManager = async (id, data) => {
  const { phone, salary, joining_date } = data;

  const [result] = await db.query(
    `
      UPDATE managers
      SET
        phone = ?,
        salary = ?,
        joining_date = ?
      WHERE manager_id = ?
      `,
    [phone, salary, joining_date, id],
  );

  return result;
};

/*---------------- Delete Manager ----------------*/

const deleteManager = async (id) => {
  const [result] = await db.query(
    `
      DELETE FROM managers
      WHERE manager_id = ?
      `,
    [id],
  );

  return result;
};

export default {
  createManager,
  getManagers,
  getSingleManager,
  updateManager,
  deleteManager,
};
