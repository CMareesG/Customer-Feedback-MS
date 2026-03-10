import React, { useEffect, useState } from "react";
import { getNotificationByUserId,deleteNotificationById } from "../../services/notificationService";
import type { notification } from "../../types/notification";
import { X } from "lucide-react";


const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<notification[]>([]);
  useEffect(()=>{
    const getNotifications = async ():Promise<void> => {
      const notifications:notification[] = await getNotificationByUserId();
      setNotifications(notifications);
    }
    getNotifications();
  },[]);

async function handleNotificationClose(notificationId:string){
  await deleteNotificationById(notificationId);
  const updatedNotification = notifications.filter((notification)=>notification.id!=notificationId);
  setNotifications(updatedNotification);
}

  return (
    <div className="card">
      <div className="space-y-4">
        {notifications.length != 0 ? (
          notifications.map((notification: notification, index: number) => (
            <div key={index} className="feedback-row">
              <div>
                <p className="font-medium text-text-primary">
                  {notification.title}
                </p>
                <p className="text-sm text-text-muted">
                  {notification.message}
                </p>
              </div>

              <span
                className={`badge`}
                onClick={() => handleNotificationClose(notification.id)}
              >
                <X />
              </span>
            </div>
          ))
        ) : (
          <>No Notification</>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
