import React, { useState } from "react";

const App = () => {
  const [isGranted, setIsGranted] = useState(false);

  const handlePermissionRequest = () => {
    Notification.requestPermission().then((result) => {
      if (result === "denied") {
        alert("Notification permission denied");
      } else if (result === "granted") {
        setIsGranted(true);
      }
    });
  };

  const sendNotification = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      new Notification("Hello 👋", { body: "Sample Notification" });
    }
  };

  return (
    <>
      {!isGranted && (
        <button onClick={handlePermissionRequest}>
          Request Notification Permission
        </button>
      )}
      {isGranted && (
        <button onClick={sendNotification}>Send Notification</button>
      )}
    </>
  );
};

export default App;
