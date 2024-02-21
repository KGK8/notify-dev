import { firebaseConfig } from "../src/config/FireBaseConfig";

importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener(
  "notificationclick",
  function (event) {
    console.log(event.notification.data);
    console.log(event);
    switch (event.action) {
      case "open_url":
        clients.openWindow(event.notification.data.url);
        break;
      case "any_other_action":
        clients.openWindow("https://www.example.com");
        break;
    }
  },
  false
);
