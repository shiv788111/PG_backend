import * as roomsService from "./rooms.service.js";

import { successResponse, errorResponse } from "../../common/utils/response.js";

/*------------------Create Room-------------*/

export const createRoom = async (req, res) => {
  try {
    const data = await roomsService.createRoom(req.body);

    return successResponse(res, data, "Room created successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*------------------Get Rooms-------------*/

export const getRooms = async (req, res) => {
  try {
    const data = await roomsService.getRooms();

    return successResponse(res, data, "Rooms fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*------------------Get Single Room-------------*/

export const getSingleRoom = async (req, res) => {
  try {
    const data = await roomsService.getSingleRoom(req.params.id);

    return successResponse(res, data, "Room fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*------------------Update Room-------------*/

export const updateRoom = async (req, res) => {
  try {
    const data = await roomsService.updateRoom(req.params.id, req.body);

    return successResponse(res, data, "Room updated successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*------------------Delete Room-------------*/

export const deleteRoom = async (req, res) => {
  try {
    const data = await roomsService.deleteRoom(req.params.id);

    return successResponse(res, data, "Room deleted successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/*-----------Get Data behalf of branch id---------*/
export const getRoomsByBranch = async (req, res) => {
  try {
    const data = await roomsService.getRoomsByBranch(req.params.branch_id);

    return successResponse(res, data, "Rooms fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
