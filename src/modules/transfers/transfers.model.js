import db from "../../common/config/db.js";

/*--------------Check Tenant Ownership-----------*/

export const checkTenantOwnership = async (tenant_id) => {
  const query = `
    SELECT *
    FROM tenants
    WHERE tenant_id = ?
    LIMIT 1
  `;

  const [results] = await db.query(query, [tenant_id]);

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

export const getTransfersQuery = async () => {
  const query = `
    SELECT
      tenant_transfers.*,

      tenants.first_name,
      tenants.last_name,

      old_room.name AS old_room_name,
      new_room.name AS new_room_name

    FROM tenant_transfers

    LEFT JOIN tenants
    ON tenants.tenant_id =
    tenant_transfers.tenant_id

    LEFT JOIN rooms AS old_room
    ON old_room.room_id =
    tenant_transfers.old_room_id

    LEFT JOIN rooms AS new_room
    ON new_room.room_id =
    tenant_transfers.new_room_id

    ORDER BY tenant_transfers.transfer d DESC
  `;

  const [results] = await db.query(query);

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
