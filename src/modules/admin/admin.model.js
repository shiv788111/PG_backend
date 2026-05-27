import db from "../../common/config/db.js";

/* =====================================================
   CHECK EMAIL EXISTS
   ===================================================== */

export const checkEmailExists = async (email) => {
  const query = `
    SELECT *
    FROM users
    WHERE email = ?
    LIMIT 1
  `;

  const [results] = await db.query(query, [email]);

  return results[0] || null;
};

/* =====================================================
   CREATE ADMIN USER
   ===================================================== */

export const createAdminUser = async (data) => {
  const query = `
    INSERT INTO users
    (
      role_id,
      name,
      email,
      password_hash
    )
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await db.query(query, [
    2, // Admin Role ID
    data.name,
    data.email,
    data.password,
  ]);

  return {
    user_id: result.insertId,
    affectedRows: result.affectedRows,
  };
};
