import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

const notificationInitialState = {
  visible: false,
  message: "",
  type: "primary",
};

const acceptedTypes = ["info", "warning", "success", "danger", "primary"];

const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState();

  const showNotification = (message, type = "primary") => {
    if (!message) {
      message = "Errore Sconosciuto";
      type = "danger";
    } else if (!acceptedTypes.includes(type)) {
      type = "primary";
    }

    setNotification({
      visible: true,
      message,
      type,
    });
  };

  const hideNotification = () => {
    setNotification(notificationInitialState);
  };

  const dataValue = {
    notification,
    setNotification,
  };
  return (
    <NotificationContext.Provider value={dataValue}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotificationContext = () => {
  return useContext(NotificationContext);
};

export { NotificationContextProvider, useNotificationContext };
