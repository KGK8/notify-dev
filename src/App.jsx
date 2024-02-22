import React, { useState } from "react";

const App = () => {
  const [isGranted, setIsGranted] = useState(false);

  const handlePermissionRequest = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      setIsGranted(true);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setIsGranted(true);
        }
      });
    }
  };

  const sendNotification = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      new Notification("Hello 👋", { body: "Sample Notification" });
    } else {
      alert("You have not granted permission for notifications");
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
