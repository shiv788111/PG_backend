import {
  checkTenantOwnership,
  checkNewBedAvailable,
  createTransferQuery,
  makeOldBedVacantQuery,
  makeNewBedOccupiedQuery,
  updateTenantBedQuery,
  updateTenantStatusQuery,
  getTransfersQuery,
} from "./transfers.model.js";

/*--------------------------------------------------------------------------
| Create Transfer
|--------------------------------------------------------------------------
| Tenant ko ek bed/room se dusre bed/room me
| transfer karta hai.
|--------------------------------------------------------------------------
*/

export const createTransfer = async (payload, user) => {
  const {
    tenant_id,

    old_room_id,

    new_room_id,

    old_bed_id,

    new_bed_id,

    reason,
  } = payload;

  /*
    |--------------------------------------------------------------------------
    | Check Tenant Ownership
    |--------------------------------------------------------------------------
    | Verify karta hai ki tenant logged-in admin ka hai.
    |--------------------------------------------------------------------------
    */

  const tenant = await checkTenantOwnership(tenant_id, user.user_id);

  if (!tenant) {
    throw new Error("Tenant not found");
  }

  /*
    |--------------------------------------------------------------------------
    | Check New Bed Availability
    |--------------------------------------------------------------------------
    | Verify karta hai ki new bed vacant hai ya nahi.
    |--------------------------------------------------------------------------
    */

  const newBed = await checkNewBedAvailable(new_bed_id);

  if (!newBed) {
    throw new Error("New bed not available");
  }

  /*
    |--------------------------------------------------------------------------
    | Create Transfer History
    |--------------------------------------------------------------------------
    | Transfer history table me save hoti hai.
    |--------------------------------------------------------------------------
    */

  await createTransferQuery({
    tenant_id,

    old_room_id,

    old_bed_id,

    new_room_id,

    new_bed_id,

    transfer_date: new Date(),

    reason,

    transfer_status: "completed",

    transferred_by: user.user_id,
  });

  /*
    |--------------------------------------------------------------------------
    | Make Old Bed Vacant
    |--------------------------------------------------------------------------
    | Old bed ko vacant mark karta hai.
    |--------------------------------------------------------------------------
    */

  await makeOldBedVacantQuery(old_bed_id);

  /*
    |--------------------------------------------------------------------------
    | Make New Bed Occupied
    |--------------------------------------------------------------------------
    | New bed ko occupied mark karta hai.
    |--------------------------------------------------------------------------
    */

  await makeNewBedOccupiedQuery(new_bed_id);

  /*
    |--------------------------------------------------------------------------
    | Update Tenant Bed
    |--------------------------------------------------------------------------
    | Tenant ka current bed update hota hai.
    |--------------------------------------------------------------------------
    */

  await updateTenantBedQuery(tenant_id, new_bed_id);

  /*
    |--------------------------------------------------------------------------
    | Update Tenant Status
    |--------------------------------------------------------------------------
    | Transfer ke baad tenant active ho jayega.
    |--------------------------------------------------------------------------
    */

  await updateTenantStatusQuery(tenant_id);

  return null;
};

/*--------------------------------------------------------------------------
| Get Transfers
|--------------------------------------------------------------------------
| Saare transfer records fetch karta hai.
|--------------------------------------------------------------------------
*/

export const getTransfers = async (user) => {
  return await getTransfersQuery(user.user_id);
};
