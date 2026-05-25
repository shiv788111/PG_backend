import express from "express";

import {
  createNotification,
  getNotifications,
  markAsRead,
  unreadCount,
} from "./notifications.controller.js";

const router = express.Router();

// CREATE
router.post("/", createNotification);

// GET ALL
router.get("/:user_id", getNotifications);

// MARK READ
router.put("/read/:id", markAsRead);

// UNREAD COUNT
router.get("/unread/count/:user_id", unreadCount);

export default router;
