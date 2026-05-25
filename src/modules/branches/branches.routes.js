import express from "express";

import {
  createBranch,
  getBranches,
  getSingleBranch,
  updateBranch,
  deleteBranch,
  getBranchesByPropertyId,
} from "./branches.controller.js";

const router = express.Router();

/*--------------Create Branch-----------*/
router.post("/create", createBranch);

/*--------------Get Branches-----------*/
router.get("/", getBranches);

/*--------------Get Single Branch-----------*/
router.get("/:id", getSingleBranch);

/*--------------Update Branch-----------*/
router.put("/update/:id", updateBranch);

/*--------------Delete Branch-----------*/
router.delete("/delete/:id", deleteBranch);


/*---------Get Branches By Property id-----*/

router.get("/property/:property_id", getBranchesByPropertyId);


export default router;
