import db from "../../common/config/db.js";

// ============================
// CREATE AMENITY
// ============================
export const createAmenity = async (data) => {
  const sql = `
    INSERT INTO amenities
    (
      name,
      description
    )
    VALUES (?, ?)
  `;

  const values = [data.name, data.description || null];

  const [result] = await db.query(sql, values);

  return {
    amenity_id: result.insertId,
    ...data,
  };
};

// ============================
// GET ALL AMENITIES
// ============================
export const getAmenities = async () => {
  const sql = `
    SELECT
      amenity_id,
      name,
      description,
      created_at,
      updated_at
    FROM amenities
    WHERE deleted_at IS NULL
    ORDER BY amenity_id DESC
  `;

  const [rows] = await db.query(sql);

  return rows;
};

// ============================
// GET AMENITY BY ID
// ============================
export const getAmenityById = async (id) => {
  const sql = `
    SELECT
      amenity_id,
      name,
      description,
      created_at,
      updated_at
    FROM amenities
    WHERE amenity_id = ?
    AND deleted_at IS NULL
  `;

  const [rows] = await db.query(sql, [id]);

  return rows[0];
};

// ============================
// UPDATE AMENITY
// ============================
export const updateAmenity = async (id, data) => {
  const sql = `
    UPDATE amenities
    SET
      name = ?,
      description = ?,
      updated_at = NOW()
    WHERE amenity_id = ?
  `;

  const values = [data.name, data.description || null, id];

  await db.query(sql, values);

  return {
    amenity_id: id,
    ...data,
  };
};

// ============================
// DELETE AMENITY
// ============================
export const deleteAmenity = async (id) => {
  const sql = `
    UPDATE amenities
    SET
      deleted_at = NOW()
    WHERE amenity_id = ?
  `;

  await db.query(sql, [id]);

  return true;
};

// ============================
// ASSIGN ROOM AMENITY
// ============================
export const assignRoomAmenity = async (data) => {
  const sql = `
    INSERT INTO room_amenities
    (
      room_id,
      amenity_id
    )
    VALUES ?
  `;

  const values = data.amenity_ids.map((amenityId) => [data.room_id, amenityId]);

  const [result] = await db.query(sql, [values]);

  return {
    room_id: data.room_id,
    amenity_ids: data.amenity_ids,
    inserted: result.affectedRows,
  };
};

// ============================
// GET ROOM AMENITIES
// ============================
export const getRoomAmenities = async (room_id) => {
  const sql = `
    SELECT
      ra.room_amenity_id,
      ra.room_id,

      a.amenity_id,
      a.name,
      a.description

    FROM room_amenities ra

    INNER JOIN amenities a
      ON a.amenity_id =
      ra.amenity_id

    WHERE ra.room_id = ?
    AND ra.deleted_at IS NULL
    AND a.deleted_at IS NULL
  `;

  const [rows] = await db.query(sql, [room_id]);

  return rows;
};
