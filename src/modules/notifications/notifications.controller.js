import {
  createNotificationService,
  getNotificationsService,
  markAsReadService,
  unreadCountService,
} from "./notifications.service.js";

// CREATE
export const createNotification = async (req, res) => {
  try {
    const result = await createNotificationService(req.body);

    return res.status(201).json({
      success: true,
      message: "Notification created",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
export const getNotifications = async (req, res) => {
  try {
    const { user_id } = req.params;

    const result = await getNotificationsService(user_id);

    return res.status(200).json({
      success: true,
      message: "Notifications fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// MARK READ
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    await markAsReadService(id);

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UNREAD COUNT
export const unreadCount = async (req, res) => {
  try {
    const { user_id } = req.params;

    const result = await unreadCountService(user_id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
