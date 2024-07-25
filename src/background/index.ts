async function updateBadge() {
  chrome.storage.local.get(["running", "period"]).then(async (result) => {
    if (result.running) {
      await Promise.all([
        chrome.action.setBadgeText({
          text: result.period,
        }),
        chrome.action.setBadgeTextColor({
          color: "white",
        }),
        chrome.action.setBadgeBackgroundColor({
          color: result.period === "work" ? "red" : "green",
        }),
      ]);
    }
  });
}

async function clearBadge() {
  await Promise.all([
    chrome.action.setBadgeText({
      text: "",
    }),
    chrome.action.setBadgeBackgroundColor({
      color: "transparent",
    }),
  ]);
}

chrome.runtime.onStartup.addListener(() => {
  updateBadge();
  chrome.storage.local.get(["scheduledAlarm", "running"]).then(async (result) => {
    if (!result.running) {
      chrome.storage.local.set({
        scheduledAlarm: undefined,
      });
      // No alarm should be running
      await chrome.alarms.clear("alarm");
    } else {
      // Alarm should be running
      const alarm = await chrome.alarms.get("alarm");
      if (!alarm) {
        await chrome.alarms.create("alarm", {
          when: result.scheduledAlarm,
        });
      }
    }
  });
});

chrome.storage.local.onChanged.addListener(() => {
  updateBadge();
});

// When alarm goes off, create new alarm for next period
chrome.alarms.onAlarm.addListener(async (_alarm) => {
  await chrome.alarms.clear("alarm");
  const result = await chrome.storage.local.get(["period", "work", "rest"]);
  let nextPeriod = result.period === "work" ? "rest" : "work";

  await chrome.alarms.create("alarm", {
    when: Date.now() + result[nextPeriod] * 60 * 1000,
  });

  const newAlarm = await chrome.alarms.get("alarm");

  await chrome.storage.local.set({
    period: nextPeriod,
    scheduledAlarm: newAlarm.scheduledTime,
  });
  updateBadge();
});

chrome.runtime.onMessage.addListener(async (message, _sender, sendResponse) => {
  updateBadge();
  switch (message.action) {
    case "alarm-clear": {
      await chrome.alarms.clearAll();
      await chrome.storage.local.set({
        running: false,
        scheduledAlarm: undefined,
      });
      clearBadge();
      sendResponse("alarm cleared");
      break;
    }
    case "alarm-start":
      const result = await chrome.storage.local.get(["work", "rest", "period"]);
      const period = result.period;

      console.log(period);
      await chrome.alarms.create("alarm", {
        when: result[period] * 60 * 1000 + Date.now(),
      });
      const alarm = await chrome.alarms.get("alarm");
      await chrome.storage.local.set({
        period,
        running: true,
        scheduledAlarm: alarm.scheduledTime,
      });
      sendResponse(alarm.scheduledTime);
      break;
    case "rest-duration-set": {
      await chrome.storage.local.set({
        rest: message.data,
        running: false,
      });
      sendResponse(message.data);
      break;
    }
    case "work-duration-set": {
      await chrome.storage.local.set({
        running: false,
        work: message.data,
      });
      sendResponse(message.data);
      break;
    }
  }
});
