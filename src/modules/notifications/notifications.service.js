import {
  createNotificationModel,
  getNotificationsModel,
  markAsReadModel,
  unreadCountModel,
} from "./notifications.model.js";

export const createNotificationService = async (data) => {
  return await createNotificationModel(data);
};

export const getNotificationsService = async (user_id) => {
  return await getNotificationsModel(user_id);
};

export const markAsReadService = async (notification_id) => {
  return await markAsReadModel(notification_id);
};

export const unreadCountService = async (user_id) => {
  return await unreadCountModel(user_id);
};
