// chrome.storage.local.set({ interval_remainder_secs: 10 }).then(() => {
//   console.log("set remainder");
// });

// chrome.storage.local.get(["interval_remainder_secs"]).then((result) => {
//   console.log("Timer remainder is " + JSON.stringify(result));
// });

// // Example of a simple user data object
// const user = {
//   username: "demo-user",
// };

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   // 2. A page requested user data, respond with a copy of `user`
//   if (message === "get-user-data") {
//     console.log(sender);
//     sendResponse(user);
//   }
// });

// const result = chrome.storage.local.get(["interval_remainder_secs"]).then((value) => value);

// chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
//   // 2. A page requested user data, respond with a copy of `user`
//   if (message === "get-timer") {
//     console.log(sender);
//     sendResponse(result);
//   }
// });

// chrome.storage.local.get(["remainder", "alarm"]).then((result) => {
//   chrome.storage.local.set({ alarm: true });
//   chrome.alarms.create("alarm", { when: Date.now() + result.remainder * 1000 }).then();
// });

// chrome.storage.local.onChanged.addListener((changes) => {
//   if (!changes.running) {
//     chrome.alarms.clearAll();
//   }
// });

// async function checkAlarmState() {
//   const { alarm, remainder } = await chrome.storage.local.get(["alarm", "remainder"]);

//   if (alarm) {
//     await chrome.alarms.get("alarm");
//   } else {
//     chrome.alarms.create("alarm", { when: Date.now() + remainder * 1000 }).then();
//   }
// }

// checkAlarmState();

// chrome.storage.local.get(["rest-period", "work-period", "remainder", "period", "alarm", "running"]).then((result) => {
//   console.log("storage from sw", result);
// });

chrome.alarms.onAlarm.addListener(async (alarm) => {
  console.log("current alarm: ", alarm);
  if (alarm.name === "work-alarm") {
    chrome.alarms.clear("work-alarm");
    const result = await chrome.storage.local.get(["rest-period", "period"]);
    console.log("next alarm: ", Date.now() + result["rest-period"] * 1000);
    chrome.action.setBadgeText({
      text: "rest",
    });
    chrome.action.setBadgeBackgroundColor({
      color: "green",
    });

    chrome.alarms.create("rest-alarm", { when: Date.now() + result["rest-period"] * 1000 }, () => {
      console.log("rest-alarm created");
    });
  } else if (alarm.name === "rest-alarm") {
    chrome.alarms.clear("rest-alarm");
    const result = await chrome.storage.local.get(["work-period", "period"]);
    console.log("next alarm: ", Date.now() + result["work-period"] * 1000);
    chrome.action.setBadgeText({
      text: "work",
    });
    chrome.action.setBadgeBackgroundColor({
      color: "red",
    });

    chrome.alarms.create("work-alarm", { when: Date.now() + result["work-period"] * 1000 }, () => {
      console.log("work-alarm created");
    });
  }
});
