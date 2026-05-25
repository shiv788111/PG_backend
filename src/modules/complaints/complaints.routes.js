import express from "express";

import {
  createComplaint,
  getComplaints,
  resolveComplaint,
} from "./complaints.controller.js";



const router = express.Router();

/*--------------Create Complaint-----------*/

router.post("/create", createComplaint);

/*--------------Get Complaints-----------*/

router.get("/", getComplaints);

/*--------------Resolve Complaint-----------*/

router.put("/resolve/:id", resolveComplaint);

export default router;
