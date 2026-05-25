import db from "../../common/config/db.js";

const getDashboardStats = () => {
  return new Promise((resolve, reject) => {
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

    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

/*-------------Get Revenuse---------------*/
const getMonthlyRevenue = () => {
  return new Promise((resolve, reject) => {
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

    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getOccupancyStats = () => {
  return new Promise((resolve, reject) => {
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

    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const data = result[0];

        const occupancyPercentage =
          data.totalBeds > 0
            ? Math.round((data.occupiedBeds / data.totalBeds) * 100)
            : 0;

        resolve({
          totalBeds: Number(data.totalBeds),
          occupiedBeds: Number(data.occupiedBeds),
          vacantBeds: Number(data.vacantBeds),
          occupancyPercentage,
        });
      }
    });
  });
};

const getRecentPayments = () => {
  return new Promise((resolve, reject) => {
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

    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const formattedData = result.map((item) => ({
          paymentId: item.payment_id,
          tenantName: `${item.first_name} ${item.last_name}`,
          amount: Number(item.amount),
          paymentMode: item.payment_mode,
          paymentDate: item.payment_date.toISOString().split("T")[0],
        }));

        resolve(formattedData);
      }
    });
  });
};

const getRecentTenants = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT

      tenants.tenant_id,
      tenants.first_name,
      tenants.last_name,
      tenants.check_in_date,

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

    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const formattedData = result.map((item) => ({
          tenantId: item.tenant_id,

          tenantName: `${item.first_name} ${item.last_name}`,

          room: item.room_name,

          bed: item.bed_label,

          checkInDate: item.check_in_date.toISOString().split("T")[0],
        }));

        resolve(formattedData);
      }
    });
  });
};

const getBranchAnalytics = () => {
  return new Promise((resolve, reject) => {
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

      LEFT JOIN payments
      ON payments.branch_id = branches.branch_id

      WHERE branches.deleted_at IS NULL

      GROUP BY branches.branch_id

      ORDER BY branches.created_at DESC
    `;

    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const formattedData = result.map((item) => ({
          branchId: item.branch_id,

          branchName: item.branch_name,

          totalRooms: Number(item.totalRooms),

          totalTenants: Number(item.totalTenants),

          occupiedBeds: Number(item.occupiedBeds),

          totalRevenue: Number(item.totalRevenue),
        }));

        resolve(formattedData);
      }
    });
  });
};

export default {
  getDashboardStats,
  getMonthlyRevenue,
  getOccupancyStats,
  getRecentPayments,
  getRecentTenants,
  getBranchAnalytics,
};
