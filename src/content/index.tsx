import "@assets/index.css";
import React from "react";
import ReactDOM from "react-dom/client";

// async function getCurrentTab() {
//   const queryOptions = { active: true, currentWindow: true };
//   const [tab] = await chrome.tabs.query(queryOptions);
//   return tab;
// }

function Toast() {
  return (
    <div
      className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800"
      id="toast-bottom-right"
      role="alert"
    >
      <div className="text-sm font-normal"> completed!</div>
    </div>
  );
}

let root = document.createElement("div");
root.id = "cs-root";
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Toast />
  </React.StrictMode>,
);
