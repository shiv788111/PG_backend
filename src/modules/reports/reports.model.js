import db from "../../common/config/db.js";

/* ===============================
   DUE RENT REPORT
================================ */

const getDueRentReport = async () => {
  const [rows] = await db.query(`
      SELECT
        t.tenant_id,

        CONCAT(
          t.first_name,
          ' ',
          t.last_name
        ) AS tenant_name,

        b.bed_id,
        b.label AS bed_name,
        b.bed_monthly_rent,

        r.room_id,
        r.name AS room_name,

        br.branch_id,
        br.name AS branch_name,

        IFNULL(SUM(p.amount), 0) AS paid_amount,

        (
          b.bed_monthly_rent
          -
          IFNULL(SUM(p.amount), 0)
        ) AS due_amount

      FROM tenants t

      JOIN beds b
        ON b.bed_id = t.bed_id

      JOIN rooms r
        ON r.room_id = b.room_id

      JOIN branches br
        ON br.branch_id = r.branch_id

      LEFT JOIN payments p
        ON p.tenant_id = t.tenant_id
        AND p.deleted_at IS NULL

      WHERE
        t.deleted_at IS NULL
        AND t.status = 'active'

      GROUP BY t.tenant_id

      HAVING due_amount > 0

      ORDER BY due_amount DESC
  `);

  return rows;
};

/* ===============================
   OCCUPANCY REPORT
================================ */

const getOccupancyReport = async () => {
  const [rows] = await db.query(`
      SELECT
        COUNT(*) AS total_rooms,

        SUM(
          CASE
            WHEN is_active = 1
            THEN 1
            ELSE 0
          END
        ) AS occupied_rooms,

        SUM(
          CASE
            WHEN is_active = 0
            THEN 1
            ELSE 0
          END
        ) AS vacant_rooms

      FROM rooms

      WHERE deleted_at IS NULL
  `);

  return rows[0];
};

/* ===============================
   TENANT REPORT
================================ */

const getTenantReport = async () => {
  const [rows] = await db.query(`
      SELECT
        t.tenant_id,

        CONCAT(
          t.first_name,
          ' ',
          t.last_name
        ) AS tenant_name,

        t.phone,
        t.email,
        t.status,

        b.label AS bed_name,

        r.name AS room_name,

        br.name AS branch_name

      FROM tenants t

      JOIN beds b
        ON b.bed_id = t.bed_id

      JOIN rooms r
        ON r.room_id = b.room_id

      JOIN branches br
        ON br.branch_id = r.branch_id

      WHERE t.deleted_at IS NULL

      ORDER BY t.tenant_id DESC
  `);

  return rows;
};

/* ===============================
   AGREEMENT REPORT
================================ */

const getAgreementReport = async () => {
  const [rows] = await db.query(`
      SELECT
        tenant_id,

        CONCAT(
          first_name,
          ' ',
          last_name
        ) AS tenant_name,

        check_in_date,
        expected_exit_date,

        DATEDIFF(
          expected_exit_date,
          CURDATE()
        ) AS days_left

      FROM tenants

      WHERE
        deleted_at IS NULL
        AND status = 'active'

      ORDER BY expected_exit_date ASC
  `);

  return rows;
};

/* ===============================
   REFUND REPORT
================================ */

const getRefundReport = async () => {
  const [rows] = await db.query(`
      SELECT
        tenant_id,

        CONCAT(
          first_name,
          ' ',
          last_name
        ) AS tenant_name,

        security_deposit,

        vacated_date,

        CASE
          WHEN vacated_date IS NOT NULL
          THEN 'Refund Pending'
          ELSE 'Active'
        END AS refund_status

      FROM tenants

      WHERE deleted_at IS NULL

      ORDER BY tenant_id DESC
  `);

  return rows;
};

export default {
  getDueRentReport,
  getOccupancyReport,
  getTenantReport,
  getAgreementReport,
  getRefundReport,
};
