import db from "../../common/config/db.js";

// CREATE NOTIFICATION
export const createNotificationModel = async (data) => {
  const query = `
      INSERT INTO notifications
      (
        user_id,
        type,
        title,
        message,
        reference_id
      )
      VALUES (?, ?, ?, ?, ?)
    `;

  const values = [
    data.user_id,
    data.type,
    data.title,
    data.message,
    data.reference_id || null,
  ];

  const [result] = await db.query(query, values);

  return result;
};

// GET ALL NOTIFICATIONS
export const getNotificationsModel = async (user_id) => {
  const query = `
      SELECT
        notification_id,
        type,
        title,
        message,
        reference_id,
        is_read,
        created_at
      FROM notifications
      WHERE user_id = ?
      AND deleted_at IS NULL
      ORDER BY notification_id DESC
    `;

  const [result] = await db.query(query, [user_id]);

  return result;
};

// MARK AS READ
export const markAsReadModel = async (notification_id) => {
  const query = `
      UPDATE notifications
      SET is_read = TRUE
      WHERE notification_id = ?
    `;

  const [result] = await db.query(query, [notification_id]);

  return result;
};

// UNREAD COUNT
export const unreadCountModel = async (user_id) => {
  const query = `
      SELECT COUNT(*) AS total
      FROM notifications
      WHERE user_id = ?
      AND is_read = FALSE
      AND deleted_at IS NULL
    `;

  const [result] = await db.query(query, [user_id]);

  return result[0];
};
