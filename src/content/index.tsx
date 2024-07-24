import "@assets/index.css";
import React from "react";
import ReactDOM from "react-dom/client";

function SnackbarContainer() {
  const [show, setShow] = React.useState(true);
  const [message] = React.useState("yo");
  const ref = React.useRef();

  // example from docs - messaging v3
  // chrome.runtime.sendMessage("get-user-data", (response) => {
  //   // 3. Got an asynchronous response with the data from the service worker
  //   console.log("received user data in cs script", response);
  //   setMessage(response["username"]);
  //   setShow(true);
  //   ref.current = response["username"];
  // });

  React.useEffect(() => {
    if (show && message) {
      const timeout = setTimeout(() => {}, 2000);
      return () => {
        if (message === ref.current) {
          clearTimeout(timeout);
          setShow(false);
        }
      };
    }
  }, [show]);

  return show ? (
    <div
      className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-white bg-red-500 divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800"
      id="toast-bottom-right"
      role="alert"
    >
      <div className="text-sm font-normal">{message}</div>
    </div>
  ) : (
    <div>no message</div>
  );
}

let root = document.createElement("div");
root.id = "cs-root";
document.body.append(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <SnackbarContainer />
  </React.StrictMode>,
);

console.log(document.getElementById("cs-root"));
