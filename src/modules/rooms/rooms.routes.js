import express from "express";

import {
  createRoom,
  getRooms,
  getSingleRoom,
  updateRoom,
  deleteRoom,
  getRoomsByBranch,
} from "./rooms.controller.js";

const router = express.Router();

/*------------------Create Room-------------*/
router.post("/create", createRoom);

/*------------------Get Rooms-------------*/
router.get("/", getRooms);

/*------------------Get Single Room-------------*/
router.get("/:id", getSingleRoom);

/*------------------Update Room-------------*/
router.put("/update/:id", updateRoom);

/*------------------Delete Room-------------*/
router.delete("/delete/:id", deleteRoom);

/*-----------Get Data Behalf of branch id------------*/
router.get("/branch/:branch_id", getRoomsByBranch);

export default router;
