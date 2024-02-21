import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: "AIzaSyBgt9MNVfDyJ2KKEO4qO-xtwJVvEgvZfFk",
  authDomain: "notifytest-69308.firebaseapp.com",
  projectId: "notifytest-69308",
  storageBucket: "notifytest-69308.appspot.com",
  messagingSenderId: "255585187508",
  appId: "1:255585187508:web:dc70cb88de93b7887f49e1",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const requestForDeviceToken = async () => {
  let returnToken;
  await getToken(messaging, {
    vapidKey:
      "BGe4RIZkNFsbdpnj_Eaj6XCGC4AF89eJEZJ1sWEPLyPjnnUdh_GzcRA5XBnp1NBJvlTINpTa9Ov4uZcbDVN9Rgc",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        returnToken = currentToken;
      } else {
        alert(
          "No registration token available. Request permission to generate one."
        );
        returnToken =
          "No registration token available. Request permission to generate one.";
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      returnToken = "An error occurred while retrieving token.";
    });

  return returnToken;
};
