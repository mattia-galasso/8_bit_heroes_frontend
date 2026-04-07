import React, { useEffect } from "react";

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    // Il popup scompare automaticamente dopo 3 secondi
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
      <div
        className="toast show align-items-center text-white bg-success border-0 shadow-lg"
        role="alert"
      >
        <div className="d-flex">
          <div className="toast-body">
            <i className="bi bi-check-circle-fill me-2"></i>{" "}
            {/* Icona opzionale se usi Bootstrap Icons */}
            {message}
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
