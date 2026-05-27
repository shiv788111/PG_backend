

import db from "../../common/config/db.js";

/*--------------Check Room Ownership-----------*/

export const checkRoomOwnership = async (room_id, user_id) => {
  const query = `
      SELECT rooms.*
      FROM rooms

      JOIN branches
      ON branches.branch_id =
      rooms.branch_id

      JOIN properties
      ON properties.property_id =
      branches.property_id

      WHERE rooms.room_id = ?
      AND properties.user_id = ?

      LIMIT 1
    `;

  const [results] = await db.query(query, [room_id, user_id]);

  return results[0];
};

/*--------------Create Bed-----------*/

export const createBedQuery = async (data) => {
  const query = `
    INSERT INTO beds (
      room_id,
      label,
      bed_type,
      bed_monthly_rent
    )
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await db.query(query, [
    data.room_id,
    data.label,
    data.bed_type,
    data.bed_monthly_rent,
  ]);

  return result;
};

/*--------------Get Beds-----------*/

export const getBedsQuery = async () => {
  const query = `
    SELECT *
    FROM beds
    WHERE deleted_at IS NULL
    ORDER BY bed_id DESC
  `;

  const [results] = await db.query(query);

  return results;
};

/*--------------Get Single Bed-----------*/

export const getSingleBedQuery = async (bed_id) => {
  const query = `
    SELECT *
    FROM beds
    WHERE bed_id = ?
    AND deleted_at IS NULL
    LIMIT 1
  `;

  const [results] = await db.query(query, [bed_id]);

  return results[0];
};

/*--------------Update Bed-----------*/

export const updateBedQuery = async (data, bed_id) => {
  const query = `
    UPDATE beds
    SET
      label = ?,
      bed_type = ?,
      bed_monthly_rent = ?
    WHERE bed_id = ?
  `;

  const [result] = await db.query(query, [
    data.label,
    data.bed_type,
    data.bed_monthly_rent,
    bed_id,
  ]);

  return result;
};

/*--------------Delete Bed-----------*/

export const deleteBedQuery = async (bed_id) => {
  const query = `
    UPDATE beds
    SET deleted_at = NOW()
    WHERE bed_id = ?
  `;

  const [result] = await db.query(query, [bed_id]);

  return result;
};
