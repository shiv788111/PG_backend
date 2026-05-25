import db from "../../common/config/db.js";

/*--------------Get Tenant-----------*/

export const getTenantById = async (tenant_id) => {
  const query = `
    SELECT
      tenant_id,
      room_id,
      branch_id
    FROM tenants
    WHERE tenant_id = ?
    LIMIT 1
  `;

  const [results] = await db.query(query, [tenant_id]);

  return results[0];
};

/*--------------Create Complaint-----------*/

export const createComplaintQuery = async (data) => {
  const query = `
    INSERT INTO complaints
    (
      tenant_id,
      branch_id,
      room_id,
      title,
      description,
      category
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.query(query, [
    data.tenant_id,
    data.branch_id,
    data.room_id,
    data.title,
    data.description,
    data.category,
  ]);

  return result;
};

/*--------------Get Complaints-----------*/

export const getComplaintsQuery = async () => {
  const query = `
    SELECT *
    FROM complaints
    WHERE deleted_at IS NULL
    ORDER BY complaint_id DESC
  `;

  const [results] = await db.query(query);

  return results;
};

/*--------------Check Complaint Ownership-----------*/

export const checkComplaintOwnership = async (complaint_id, user_id) => {
  const query = `
    SELECT complaints.*
    FROM complaints

    JOIN branches
      ON branches.branch_id = complaints.branch_id

    JOIN properties
      ON properties.property_id = branches.property_id

    WHERE complaints.complaint_id = ?
    AND properties.user_id = ?

    LIMIT 1
  `;

  const [results] = await db.query(query, [complaint_id, user_id]);

  return results[0];
};

/*--------------Resolve Complaint-----------*/

export const resolveComplaintQuery = async (complaint_id) => {
  const query = `
    UPDATE complaints
    SET status = 'resolved'
    WHERE complaint_id = ?
  `;

  const [result] = await db.query(query, [complaint_id]);

  return result;
};



/*===========================================================================
| GET SINGLE COMPLAINT
 Complaint ID se complete complaint detail laata hai
===========================================================================*/
export const getComplaintById = async (complaint_id) => {
  const query = `
    SELECT
      c.complaint_id,
      c.tenant_id,
      c.branch_id,
      c.room_id,
      c.title,
      c.description,
      c.category,
      c.status,
      c.created_at,
      c.updated_at,

      CONCAT(
        t.first_name,
        ' ',
        t.last_name
      ) AS tenant_name,

      r.name AS room_name,
      b.name AS branch_name

    FROM complaints c

    LEFT JOIN tenants t
      ON t.tenant_id = c.tenant_id

    LEFT JOIN rooms r
      ON r.room_id = c.room_id

    LEFT JOIN branches b
      ON b.branch_id = c.branch_id

    WHERE c.complaint_id = ?
    LIMIT 1
  `;

  const [rows] = await db.query(query, [complaint_id]);

  return rows[0];
};