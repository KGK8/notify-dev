importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBgt9MNVfDyJ2KKEO4qO-xtwJVvEgvZfFk",
  authDomain: "notifytest-69308.firebaseapp.com",
  projectId: "notifytest-69308",
  storageBucket: "notifytest-69308.appspot.com",
  messagingSenderId: "255585187508",
  appId: "1:255585187508:web:dc70cb88de93b7887f49e1",
};

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
