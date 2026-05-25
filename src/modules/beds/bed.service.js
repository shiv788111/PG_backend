import {
  createBedQuery,
  getBedsQuery,
  getSingleBedQuery,
  updateBedQuery,
  deleteBedQuery,
} from "./bed.model.js";

/*--------------Create Bed-----------*/
export const createBed = async (payload) => {
  const { room_id, label, bed_type, bed_monthly_rent } = payload;

  const result = await createBedQuery({
    room_id,
    label,
    bed_type,
    bed_monthly_rent,
  });

  return {
    bed_id: result.insertId,
    room_id,
    label,
    bed_type,
    bed_monthly_rent,
  };
};

/*--------------Get Beds-----------*/
export const getBeds = async () => {
  return await getBedsQuery();
};

/*--------------Get Single Bed-----------*/
export const getSingleBed = async (bed_id) => {
  const bed = await getSingleBedQuery(bed_id);

  if (!bed) {
    throw new Error("Bed not found");
  }

  return bed;
};

/*--------------Update Bed-----------*/
export const updateBed = async (bed_id, payload) => {
  const bed = await getSingleBedQuery(bed_id);

  if (!bed) {
    throw new Error("Bed not found");
  }

  await updateBedQuery(payload, bed_id);

  return null;
};

/*--------------Delete Bed-----------*/
export const deleteBed = async (bed_id) => {
  const bed = await getSingleBedQuery(bed_id);

  if (!bed) {
    throw new Error("Bed not found");
  }

  await deleteBedQuery(bed_id);

  return null;
};
