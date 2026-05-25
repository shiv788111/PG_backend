import {
  createAmenity,
  getAmenities,
  getAmenityById,
  updateAmenity,
  deleteAmenity,
  assignRoomAmenity,
  getRoomAmenities,
} from "./amenities.model.js";

export const createAmenityService = async (data) => {
  return await createAmenity(data);
};

export const getAmenitiesService = async () => {
  return await getAmenities();
};

export const getAmenityByIdService = async (id) => {
  return await getAmenityById(id);
};

export const updateAmenityService = async (id, data) => {
  return await updateAmenity(id, data);
};

export const deleteAmenityService = async (id) => {
  return await deleteAmenity(id);
};

export const assignRoomAmenityService = async (data) => {
  return await assignRoomAmenity(data);
};

export const getRoomAmenitiesService = async (room_id) => {
  return await getRoomAmenities(room_id);
};
