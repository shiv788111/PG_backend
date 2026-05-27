import db from "../../common/config/db.js";

/* ======================================================
   Get Dashboard Stats
====================================================== */

const getDashboardStats = async () => {
  const query = `
    SELECT
      (SELECT COUNT(*) FROM properties WHERE deleted_at IS NULL) AS totalProperties,

      (SELECT COUNT(*) FROM branches WHERE deleted_at IS NULL) AS totalBranches,

      (SELECT COUNT(*) FROM rooms WHERE deleted_at IS NULL) AS totalRooms,

      (SELECT COUNT(*) 
       FROM tenants 
       WHERE deleted_at IS NULL 
       AND status = 'active') AS totalTenants,

      (SELECT COUNT(*) 
       FROM beds 
       WHERE deleted_at IS NULL 
       AND status = 'occupied') AS occupiedBeds,

      (SELECT COUNT(*) 
       FROM beds 
       WHERE deleted_at IS NULL 
       AND status = 'vacant') AS vacantBeds,

      (SELECT IFNULL(SUM(amount),0) 
       FROM payments 
       WHERE deleted_at IS NULL) AS totalPayments,

      (SELECT IFNULL(SUM(amount),0) 
       FROM expenses 
       WHERE deleted_at IS NULL) AS totalExpenses
  `;

  const [result] = await db.execute(query);

  return {
    totalProperties: Number(result[0].totalProperties),
    totalBranches: Number(result[0].totalBranches),
    totalRooms: Number(result[0].totalRooms),
    totalTenants: Number(result[0].totalTenants),
    occupiedBeds: Number(result[0].occupiedBeds),
    vacantBeds: Number(result[0].vacantBeds),
    totalPayments: Number(result[0].totalPayments),
    totalExpenses: Number(result[0].totalExpenses),
  };
};

/* ======================================================
   Get Monthly Revenue
====================================================== */

const getMonthlyRevenue = async () => {
  const query = `
    SELECT 
      MONTHNAME(payment_date) AS month,
      YEAR(payment_date) AS year,
      SUM(amount) AS revenue
    FROM payments
    WHERE deleted_at IS NULL
    GROUP BY 
      YEAR(payment_date),
      MONTH(payment_date),
      MONTHNAME(payment_date)
    ORDER BY 
      YEAR(payment_date),
      MONTH(payment_date)
  `;

  const [rows] = await db.execute(query);

  return rows;
};

/* ======================================================
   Get Occupancy Stats
====================================================== */

const getOccupancyStats = async () => {
  const query = `
    SELECT
      COUNT(*) AS totalBeds,

      SUM(
        CASE 
          WHEN status = 'occupied' 
          THEN 1 
          ELSE 0 
        END
      ) AS occupiedBeds,

      SUM(
        CASE 
          WHEN status = 'vacant' 
          THEN 1 
          ELSE 0 
        END
      ) AS vacantBeds

    FROM beds

    WHERE deleted_at IS NULL
  `;

  const [result] = await db.execute(query);

  const data = result[0];

  return {
    totalBeds: Number(data.totalBeds),
    occupiedBeds: Number(data.occupiedBeds),
    vacantBeds: Number(data.vacantBeds),
    occupancyPercentage:
      data.totalBeds > 0
        ? Math.round((data.occupiedBeds / data.totalBeds) * 100)
        : 0,
  };
};

/* ======================================================
   Get Recent Payments
====================================================== */

const getRecentPayments = async () => {
  const query = `
    SELECT
      payments.payment_id,
      payments.amount,
      payments.payment_mode,
      payments.payment_date,

      tenants.first_name,
      tenants.last_name

    FROM payments

    INNER JOIN tenants
    ON payments.tenant_id = tenants.tenant_id

    WHERE payments.deleted_at IS NULL

    ORDER BY payments.payment_date DESC

    LIMIT 5
  `;

  const [rows] = await db.execute(query);

  return rows.map((item) => ({
    paymentId: item.payment_id,
    tenantName: `${item.first_name} ${item.last_name}`,
    amount: Number(item.amount),
    paymentMode: item.payment_mode,
    paymentDate: item.payment_date,
  }));
};

/* ======================================================
   Get Recent Tenants
====================================================== */

const getRecentTenants = async () => {
  const query = `
    SELECT
      tenants.tenant_id,
      tenants.first_name,
      tenants.last_name,
tenants.created_at,
      rooms.name AS room_name,

      beds.label AS bed_label

    FROM tenants

    INNER JOIN beds
    ON tenants.bed_id = beds.bed_id

    INNER JOIN rooms
    ON beds.room_id = rooms.room_id

    WHERE tenants.deleted_at IS NULL

    ORDER BY tenants.created_at DESC

    LIMIT 5
  `;

  const [rows] = await db.execute(query);

  return rows.map((item) => ({
    tenantId: item.tenant_id,
    tenantName: `${item.first_name} ${item.last_name}`,
    room: item.room_name,
    bed: item.bed_label,
   checkInDate: item.created_at,
  }));
};

/* ======================================================
   Get Branch Analytics
====================================================== */

const getBranchAnalytics = async () => {
  const query = `
    SELECT

    branches.branch_id,
    branches.name AS branch_name,

    COUNT(DISTINCT rooms.room_id) AS totalRooms,

    COUNT(DISTINCT tenants.tenant_id) AS totalTenants,

    COUNT(
      DISTINCT CASE
        WHEN beds.status = 'occupied'
        THEN beds.bed_id
      END
    ) AS occupiedBeds,

    IFNULL(
      (
        SELECT SUM(p.amount)
        FROM payments p
        WHERE p.branch_id = branches.branch_id
        AND p.deleted_at IS NULL
      ),
      0
    ) AS totalRevenue

    FROM branches

    LEFT JOIN rooms
    ON branches.branch_id = rooms.branch_id

    LEFT JOIN beds
    ON rooms.room_id = beds.room_id

    LEFT JOIN tenants
    ON tenants.branch_id = branches.branch_id

    WHERE branches.deleted_at IS NULL

    GROUP BY branches.branch_id

    ORDER BY branches.created_at DESC
  `;

  const [rows] = await db.execute(query);

  return rows.map((item) => ({
    branchId: item.branch_id,
    branchName: item.branch_name,
    totalRooms: Number(item.totalRooms),
    totalTenants: Number(item.totalTenants),
    occupiedBeds: Number(item.occupiedBeds),
    totalRevenue: Number(item.totalRevenue),
  }));
};

export default {
  getDashboardStats,
  getMonthlyRevenue,
  getOccupancyStats,  
  getRecentPayments,
  getRecentTenants,
  getBranchAnalytics,
};
