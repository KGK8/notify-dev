importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
  const firebaseConfig = {
  apiKey: "AIzaSyAP8SK6v-U69DkpbBBGam9MfHz655Btnhc",
  authDomain: "push-notifications-7d36c.firebaseapp.com",
  projectId: "push-notifications-7d36c",
  storageBucket: "push-notifications-7d36c.appspot.com",
  messagingSenderId: "657938320810",
  appId: "1:657938320810:web:da23fe894563b20580afd3",
  measurementId: "G-YY591VT263",
};


firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

//Code for adding event on click of notification
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
