import {
  getTenantById,
  createComplaintQuery,
  getComplaintById,
  getComplaintsQuery,
  resolveComplaintQuery,
  checkComplaintOwnership,
} from "./complaints.model.js";

import { createNotificationService } from "../notifications/notifications.service.js";

/*===========================================================================
| CREATE COMPLAINT
| Complaint create karta hai aur created complaint ka complete data return karta hai
===========================================================================*/
export const createComplaint = async (payload) => {
  const { tenant_id, title, description, category } = payload;

  /*--------------------------------------------------
  | Check Tenant Exists
  --------------------------------------------------*/
  const tenant = await getTenantById(tenant_id);

  if (!tenant) {
    throw new Error("Tenant not found");
  }

  if (!tenant.room_id) {
    throw new Error("Tenant is not assigned to any room");
  }

  /*--------------------------------------------------
  | Create Complaint
  --------------------------------------------------*/
  const result = await createComplaintQuery({
    tenant_id,
    branch_id: tenant.branch_id,
    room_id: tenant.room_id,
    title,
    description,
    category,
  });

  /*--------------------------------------------------
  | Fetch Created Complaint
  --------------------------------------------------*/
  const complaint = await getComplaintById(result.insertId);

  return complaint;
};

/*===========================================================================
| GET COMPLAINTS
| Admin/User ki saari complaints laata hai
===========================================================================*/

export const getComplaints = async () => {
  return await getComplaintsQuery();
};

/*--------------Resolve Complaint-----------*/

/*--------------Resolve Complaint-----------*/

export const resolveComplaint = async (complaint_id) => {
  const complaint = await getComplaintById(complaint_id);

  if (!complaint) {
    throw new Error("Complaint not found");
  }

  const result = await resolveComplaintQuery(complaint_id);

  if (result.affectedRows === 0) {
    throw new Error("Complaint not resolved");
  }

  return {
    complaint_id,
    status: "resolved",
  };
};
