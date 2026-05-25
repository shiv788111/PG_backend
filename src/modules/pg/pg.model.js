// import db from "../../common/config/db.js";

// /*------------------Create PG-------------*/

// export const createPropertyQuery = async (data) => {
//   const query = `
//     INSERT INTO properties
//     (
//       user_id,
//       owner_name,
//       name,
//       address,
//       city,
//       state,
//       pincode,
//       phone,
//       email,
//       gst_number,
//       status
//     )
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   return new Promise((resolve, reject) => {
//     db.query(
//       query,
//       [
//         data.user_id,
//         data.owner_name,
//         data.name,
//         data.address,
//         data.city,
//         data.state,
//         data.pincode,
//         data.phone,
//         data.email,
//         data.gst_number,
//         "pending",
//       ],
//       (err, results) => {
//         if (err) reject(err);
//         else resolve(results);
//       },
//     );
//   });
// };

// /*------------------Get Approved PGs-------------*/

// export const getApprovedPropertiesQuery = async () => {
//   const query = `
//     SELECT *
//     FROM properties
//     WHERE deleted_at IS NULL
//     ORDER BY property_id DESC
//   `;

//   return new Promise((resolve, reject) => {
//     db.query(query, (err, results) => {
//       if (err) reject(err);
//       else resolve(results);
//     });
//   });
// };

// /*------------------Get Single PG-------------*/

// export const getSinglePropertyQuery = async (property_id) => {
//   const query = `
//     SELECT *
//     FROM properties
//     WHERE property_id = ?
//     AND deleted_at IS NULL
//     LIMIT 1
//   `;

//   return new Promise((resolve, reject) => {
//     db.query(query, [property_id], (err, results) => {
//       if (err) reject(err);
//       else resolve(results[0]);
//     });
//   });
// };

// /*------------------Update PG-------------*/

// export const updatePropertyQuery = async (data, property_id) => {
//   const query = `
//     UPDATE properties
//     SET
//       name = ?,
//       address = ?,
//       city = ?,
//       state = ?,
//       pincode = ?,
//       phone = ?,
//       email = ?,
//       gst_number = ?
//     WHERE property_id = ?
//   `;

//   return new Promise((resolve, reject) => {
//     db.query(
//       query,
//       [
//         data.name,
//         data.address,
//         data.city,
//         data.state,
//         data.pincode,
//         data.phone,
//         data.email,
//         data.gst_number,
//         property_id,
//       ],
//       (err, results) => {
//         if (err) reject(err);
//         else resolve(results);
//       },
//     );
//   });
// };

// /*------------------Delete PG-------------*/

// export const deletePropertyQuery = async (property_id) => {
//   const query = `
//     UPDATE properties
//     SET deleted_at = NOW()
//     WHERE property_id = ?
//   `;

//   return new Promise((resolve, reject) => {
//     db.query(query, [property_id], (err, results) => {
//       if (err) reject(err);
//       else resolve(results);
//     });
//   });
// };

// /*------------------Approve PG-------------*/

// export const approvePropertyQuery = async (property_id) => {
//   const query = `
//     UPDATE properties
//     SET
//       status = 'approved',
//       approved_at = NOW(),
//       is_active = TRUE
//     WHERE property_id = ?
//   `;

//   return new Promise((resolve, reject) => {
//     db.query(query, [property_id], (err, results) => {
//       if (err) reject(err);
//       else resolve(results);
//     });
//   });
// };

// /*------------------Check User By Email-------------*/

// export const getUserByEmailQuery = async (email) => {
//   const query = `
//     SELECT *
//     FROM users
//     WHERE email = ?
//     LIMIT 1
//   `;

//   return new Promise((resolve, reject) => {
//     db.query(query, [email], (err, results) => {
//       if (err) reject(err);
//       else resolve(results[0]);
//     });
//   });
// };

// /*------------------Create User-------------*/

// export const createUserQuery = async (data) => {
//   const query = `
//     INSERT INTO users
//     (
//       role_id,
//       name,
//       email,
//       password_hash
//     )
//     VALUES (?, ?, ?, ?)
//   `;

//   return new Promise((resolve, reject) => {
//     db.query(
//       query,
//       [data.role_id, data.name, data.email, data.password_hash],
//       (err, results) => {
//         if (err) reject(err);
//         else resolve(results);
//       },
//     );
//   });
// };

import db from "../../common/config/db.js";

/*------------------Create PG-------------*/

export const createPropertyQuery = async (data) => {
  const query = `
    INSERT INTO properties
    (
      user_id,
      owner_name,
      name,
      address,
      city,
      state,
      pincode,
      phone,
      email,
      gst_number,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.query(query, [
    data.user_id,
    data.owner_name,
    data.name,
    data.address,
    data.city,
    data.state,
    data.pincode,
    data.phone,
    data.email,
    data.gst_number,
    "pending",
  ]);

  return result;
};

/*------------------Get Approved PGs-------------*/

export const getApprovedPropertiesQuery = async () => {
  const query = `
    SELECT *
    FROM properties
    WHERE deleted_at IS NULL
    ORDER BY property_id DESC
  `;

  const [results] = await db.query(query);

  return results;
};

/*------------------Get Single PG-------------*/

export const getSinglePropertyQuery = async (property_id) => {
  const query = `
    SELECT *
    FROM properties
    WHERE property_id = ?
    AND deleted_at IS NULL
    LIMIT 1
  `;

  const [results] = await db.query(query, [property_id]);

  return results[0];
};

/*------------------Update PG-------------*/

export const updatePropertyQuery = async (data, property_id) => {
  const query = `
    UPDATE properties
    SET
      name = ?,
      address = ?,
      city = ?,
      state = ?,
      pincode = ?,
      phone = ?,
      email = ?,
      gst_number = ?
    WHERE property_id = ?
  `;

  const [result] = await db.query(query, [
    data.name,
    data.address,
    data.city,
    data.state,
    data.pincode,
    data.phone,
    data.email,
    data.gst_number,
    property_id,
  ]);

  return result;
};

/*------------------Delete PG-------------*/

export const deletePropertyQuery = async (property_id) => {
  const query = `
    UPDATE properties
    SET deleted_at = NOW()
    WHERE property_id = ?
  `;

  const [result] = await db.query(query, [property_id]);

  return result;
};

/*------------------Approve PG-------------*/

export const approvePropertyQuery = async (property_id) => {
  const query = `
    UPDATE properties
    SET
      status = 'approved',
      approved_at = NOW(),
      is_active = TRUE
    WHERE property_id = ?
  `;

  const [result] = await db.query(query, [property_id]);

  return result;
};

/*------------------Check User By Email-------------*/

export const getUserByEmailQuery = async (email) => {
  const query = `
    SELECT *
    FROM users
    WHERE email = ?
    LIMIT 1
  `;

  const [results] = await db.query(query, [email]);

  return results[0];
};

/*------------------Create User-------------*/

export const createUserQuery = async (data) => {
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
    data.role_id,
    data.name,
    data.email,
    data.password_hash,
  ]);

  return result;
};
