import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export const ToastMessagePlacements = ({ message, actionText , openPopup ,page }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="toast-placements">
      <span>{message}</span>

      <button
        className="toast-close"
        onClick={() => setVisible(false)}
        aria-label="Close notification"
      >
        <FaTimes />
      </button>

      <button className="toast-message-button" onClick={() => openPopup({ heading: `Book Free Demo Class`, btnText: "Book now", formType: `${page} Book Demo` })}>
        <span>{actionText}</span>
      </button>
    </div>
  );
};
