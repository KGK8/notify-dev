import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const App = () => {
  const [isTokenFound, setTokenFound] = useState(false);
  const [deviceToken, setDeviceToken] = useState("");
  const firebaseConfig = {
    apiKey: "AIzaSyAP8SK6v-U69DkpbBBGam9MfHz655Btnhc",
    authDomain: "push-notifications-7d36c.firebaseapp.com",
    projectId: "push-notifications-7d36c",
    storageBucket: "push-notifications-7d36c.appspot.com",
    messagingSenderId: "657938320810",
    appId: "1:657938320810:web:da23fe894563b20580afd3",
    measurementId: "G-YY591VT263",
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const messaging = getMessaging(firebaseApp);

  function sendPushNotification(userId, title, body) {}

  const requestForToken = (setTokenFound) => {
    return getToken(messaging, {
      vapidKey:
        "BBZGmuRQtODMcI8PZiTszQFuTZmb2bJqr53TW6bTDZPUUuK4QyoMCfe0LEN19wCkYikNJnilmzHOALtd3RkOeAs",
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log("current token for client: ", currentToken);
          setTokenFound(true);
          setDeviceToken(currentToken);
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
          setTokenFound(false);
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });
  };
  useEffect(() => {
    sendPushNotification(userId, title, body);
    requestForToken(setTokenFound);
  }, []);

  return (
    <>
      <h1>{deviceToken}</h1>
    </>
  );
};

export default App;
