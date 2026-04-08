import { useNotificationContext } from "../contexts/NotificationContext";

export default function Notification() {
  const { notification } = useNotificationContext();

  if (!notification) return;

  return (
    <>
      <div className={`notification notification-${notification.type}`}>
        <div className="d-flex align-items-center">
          {notification.type === "success" && <i class="bi bi-bell" />}
          {notification.type === "danger" && <i class="bi bi-info-circle" />}
          {notification.type === "warning" && <i class="bi bi-check-circle" />}
          {notification.type === "info" && (
            <i class="bi bi-exclamation-triangle" />
          )}
          {notification.type === "primary" && (
            <i class="bi bi-exclamation-circle" />
          )}
          <span>{notification.message}</span>
        </div>
      </div>
    </>
  );
}
