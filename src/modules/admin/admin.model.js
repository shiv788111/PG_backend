import db from "../../common/config/db.js";

export const checkEmailExists = async (email) => {
  const query = `
    SELECT *
    FROM users
    WHERE email = ?
    LIMIT 1
  `;

  return new Promise((resolve, reject) => {
    db.query(query, [email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
};

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

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [2, data.name, data.email, data.password],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      },
    );
  });
};
