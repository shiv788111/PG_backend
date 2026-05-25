import db from "../../common/config/db.js";

/*--------------Check Tenant Ownership-----------*/

export const checkTenantOwnership = async (tenant_id, user_id) => {
  const query = `
      SELECT tenants.*
      FROM tenants

      JOIN beds
      ON beds.bed_id =
      tenants.bed_id

      JOIN rooms
      ON rooms.room_id =
      beds.room_id

      JOIN branches
      ON branches.branch_id =
      rooms.branch_id

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

/*--------------Create Payment-----------*/

export const createPaymentQuery = async (data) => {
  const query = `
      INSERT INTO payments
      (
        tenant_id,
        branch_id,
        amount,
        payment_mode,
        payment_date,
        billing_month,
        status,
        transaction_ref,
        notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const [result] = await db.query(query, [
    data.tenant_id,
    data.branch_id,
    data.amount,
    data.payment_mode,
    data.payment_date,
    data.billing_month,
    data.status,
    data.transaction_ref,
    data.notes,
  ]);

  return result;
};

/*--------------Get Payments-----------*/

export const getPaymentsQuery = async (user_id) => {
  const query = `
      SELECT payments.*
      FROM payments

      JOIN tenants
      ON tenants.tenant_id =
      payments.tenant_id

      JOIN beds
      ON beds.bed_id =
      tenants.bed_id

      JOIN rooms
      ON rooms.room_id =
      beds.room_id

      JOIN branches
      ON branches.branch_id =
      rooms.branch_id

      JOIN properties
      ON properties.property_id =
      branches.property_id

      WHERE properties.user_id = ?

      AND payments.deleted_at IS NULL

      ORDER BY payment_id DESC
    `;

  const [results] = await db.query(query, [user_id]);

  return results;
};
