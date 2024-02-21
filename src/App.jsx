import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { requestForDeviceToken } from "./config/FireBaseConfig";
const App = () => {
  const [deviceToken, setDeviceToken] = useState("");

  useEffect(() => {
    async function getDeviceToken() {
      let tokens = await requestForDeviceToken();
      setDeviceToken(tokens); 
      //write a service call to store device token in DB
    }
    getDeviceToken();
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
