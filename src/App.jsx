import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const App = () => {
  const [isTokenFound, setTokenFound] = useState(false);
  const [deviceToken, setDeviceToken] =  useState("");
  const firebaseConfig = {
  apiKey: "AIzaSyBgt9MNVfDyJ2KKEO4qO-xtwJVvEgvZfFk",
  authDomain: "notifytest-69308.firebaseapp.com",
  projectId: "notifytest-69308",
  storageBucket: "notifytest-69308.appspot.com",
  messagingSenderId: "255585187508",
  appId: "1:255585187508:web:dc70cb88de93b7887f49e1"
};

  const firebaseApp = initializeApp(firebaseConfig);
  const messaging = getMessaging(firebaseApp);

  const requestForToken = (setTokenFound) => {
    return getToken(messaging, {
      vapidKey:
        "BGe4RIZkNFsbdpnj_Eaj6XCGC4AF89eJEZJ1sWEPLyPjnnUdh_GzcRA5XBnp1NBJvlTINpTa9Ov4uZcbDVN9Rgc",
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log("current token for client: ", currentToken);
          setTokenFound(true);
          setDeviceToken(currentToken);
        } else {
          alert(
            "No registration token available. Request permission to generate one."
          );
          setTokenFound(false);
        }
      })
      .catch((err) => {
        // setDeviceToken(err);
        console.log("An error occurred while retrieving token. ", err);
      });
  };
  useEffect(() => {
    requestForToken(setTokenFound);
  }, []);

  const copyToken = () => {
    navigator.clipboard.writeText(deviceToken);
    toast.success("Device Token Copied Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <h3>Device Token:</h3>
      <h4 style={{ fontWeight: "400" }}>{deviceToken ?? ""}</h4>
      <button onClick={() => copyToken()} style={{ fontSize: "12px" }}>
        Click To Copy The Token
      </button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
