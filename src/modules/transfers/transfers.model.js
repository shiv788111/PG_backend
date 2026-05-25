// import db from "../../common/config/db.js";

// /*--------------Check Tenant Ownership-----------*/

// export const checkTenantOwnership = async (tenant_id, user_id) => {
//   const query = `
//       SELECT tenants.*
//       FROM tenants

//       JOIN branches
//       ON branches.branch_id =
//       tenants.branch_id

//       JOIN properties
//       ON properties.property_id =
//       branches.property_id

//       WHERE tenants.tenant_id = ?
//       AND properties.user_id = ?

//       LIMIT 1
//     `;

//   return new Promise((resolve, reject) => {
//     db.query(query, [tenant_id, user_id], (err, results) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results[0]);
//       }
//     });
//   });
// };

// /*--------------Check New Bed Available-----------*/

// export const checkNewBedAvailable = async (bed_id) => {
//   const query = `
//       SELECT *
//       FROM beds

//       WHERE bed_id = ?
//       AND status = 'vacant'

//       LIMIT 1
//     `;

//   return new Promise((resolve, reject) => {
//     db.query(query, [bed_id], (err, results) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results[0]);
//       }
//     });
//   });
// };

// /*--------------Create Transfer-----------*/

// export const createTransferQuery =
//   async (data) => {

//     const query = `
//       INSERT INTO tenant_transfers
//       (
//         tenant_id,
//         old_room_id,
//         old_bed_id,
//         new_room_id,
//         new_bed_id,
//         transfer_date,
//         reason,
//         transfer_status,
//         transferred_by
//       )
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     return new Promise((resolve, reject) => {

//       db.query(
//         query,
//         [

//           data.tenant_id,

//           data.old_room_id,

//           data.old_bed_id,

//           data.new_room_id,

//           data.new_bed_id,

//           data.transfer_date,

//           data.reason,

//           data.transfer_status,

//           data.transferred_by,

//         ],
//         (err, results) => {

//           if (err) {

//             reject(err);

//           } else {

//             resolve(results);

//           }

//         }
//       );

//     });

// };

// /*--------------Make Old Bed Vacant-----------*/

// export const makeOldBedVacantQuery = async (bed_id) => {
//   const query = `
//       UPDATE beds
//       SET status = 'vacant'
//       WHERE bed_id = ?
//     `;

//   return new Promise((resolve, reject) => {
//     db.query(query, [bed_id], (err, results) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// };

// /*--------------Make New Bed Occupied-----------*/

// export const makeNewBedOccupiedQuery = async (bed_id) => {
//   const query = `
//       UPDATE beds
//       SET status = 'occupied'
//       WHERE bed_id = ?
//     `;

//   return new Promise((resolve, reject) => {
//     db.query(query, [bed_id], (err, results) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// };

// /*--------------Update Tenant Bed-----------*/

// export const updateTenantBedQuery = async (tenant_id, new_bed_id) => {
//   const query = `
//       UPDATE tenants
//       SET bed_id = ?
//       WHERE tenant_id = ?
//     `;

//   return new Promise((resolve, reject) => {
//     db.query(query, [new_bed_id, tenant_id], (err, results) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// };

// /*--------------Get Transfers-----------*/

// export const getTransfersQuery = async (user_id) => {
//   const query = `
//       SELECT tenant_transfers.*
//       FROM tenant_transfers

//       JOIN tenants
//       ON tenants.tenant_id =
//       tenant_transfers.tenant_id

//       JOIN branches
//       ON branches.branch_id =
//       tenants.branch_id

//       JOIN properties
//       ON properties.property_id =
//       branches.property_id

//       WHERE properties.user_id = ?

//       ORDER BY transfer_id DESC
//     `;

//   return new Promise((resolve, reject) => {
//     db.query(query, [user_id], (err, results) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// };

// /*--------------Update Tenant Status-----------*/

// export const updateTenantStatusQuery =
//   async (tenant_id) => {

//     const query = `
//       UPDATE tenants
//       SET status = 'active'
//       WHERE tenant_id = ?
//     `;

//     return new Promise((resolve, reject) => {

//       db.query(
//         query,
//         [tenant_id],
//         (err, results) => {

//           if (err) {

//             reject(err);

//           } else {

//             resolve(results);

//           }

//         }
//       );

//     });

// };

import db from "../../common/config/db.js";

/*--------------Check Tenant Ownership-----------*/

export const checkTenantOwnership = async (tenant_id, user_id) => {
  const query = `
      SELECT tenants.*
      FROM tenants

      JOIN branches
      ON branches.branch_id =
      tenants.branch_id

      JOIN properties
      ON properties.property_id =
      branches.property_id

      WHERE tenants.tenant_id = ?
      AND properties.user_id = ?

      LIMIT 1
    `;

  const [results] = await db.query(query, [tenant_id, user_id]);

  return results[0];
};

/*--------------Check New Bed Available-----------*/

export const checkNewBedAvailable = async (bed_id) => {
  const query = `
      SELECT *
      FROM beds

      WHERE bed_id = ?
      AND status = 'vacant'

      LIMIT 1
    `;

  const [results] = await db.query(query, [bed_id]);

  return results[0];
};

/*--------------Create Transfer-----------*/

export const createTransferQuery = async (data) => {
  const query = `
      INSERT INTO tenant_transfers
      (
        tenant_id,
        old_room_id,
        old_bed_id,
        new_room_id,
        new_bed_id,
        transfer_date,
        reason,
        transfer_status,
        transferred_by
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const [result] = await db.query(query, [
    data.tenant_id,
    data.old_room_id,
    data.old_bed_id,
    data.new_room_id,
    data.new_bed_id,
    data.transfer_date,
    data.reason,
    data.transfer_status,
    data.transferred_by,
  ]);

  return result;
};

/*--------------Make Old Bed Vacant-----------*/

export const makeOldBedVacantQuery = async (bed_id) => {
  const query = `
      UPDATE beds
      SET status = 'vacant'
      WHERE bed_id = ?
    `;

  const [result] = await db.query(query, [bed_id]);

  return result;
};

/*--------------Make New Bed Occupied-----------*/

export const makeNewBedOccupiedQuery = async (bed_id) => {
  const query = `
      UPDATE beds
      SET status = 'occupied'
      WHERE bed_id = ?
    `;

  const [result] = await db.query(query, [bed_id]);

  return result;
};

/*--------------Update Tenant Bed-----------*/

export const updateTenantBedQuery = async (tenant_id, new_bed_id) => {
  const query = `
      UPDATE tenants
      SET bed_id = ?
      WHERE tenant_id = ?
    `;

  const [result] = await db.query(query, [new_bed_id, tenant_id]);

  return result;
};

/*--------------Get Transfers-----------*/

export const getTransfersQuery = async (user_id) => {
  const query = `
      SELECT tenant_transfers.*
      FROM tenant_transfers

      JOIN tenants
      ON tenants.tenant_id =
      tenant_transfers.tenant_id

      JOIN branches
      ON branches.branch_id =
      tenants.branch_id

      JOIN properties
      ON properties.property_id =
      branches.property_id

      WHERE properties.user_id = ?

      ORDER BY transfer_id DESC
    `;

  const [results] = await db.query(query, [user_id]);

  return results;
};

/*--------------Update Tenant Status-----------*/

export const updateTenantStatusQuery = async (tenant_id) => {
  const query = `
      UPDATE tenants
      SET status = 'active'
      WHERE tenant_id = ?
    `;

  const [result] = await db.query(query, [tenant_id]);

  return result;
};
