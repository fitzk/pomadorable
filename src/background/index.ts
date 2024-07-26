const WORK_DEFAULT = 25;
const REST_DEFAULT = 5;

// fns
async function updateBadge() {
  chrome.storage.local.get(["running", "period"]).then(async (results) => {
    if (results.running) {
      await Promise.all([
        chrome.action.setBadgeText({
          text: results.period,
        }),
        chrome.action.setBadgeTextColor({
          color: "white",
        }),
        chrome.action.setBadgeBackgroundColor({
          color: results.period === "work" ? "#9d174d" : "#155e75",
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
      color: "#00FFFFFF",
    }),
  ]);
}

async function createAlarm(when: number, period?: string) {
  try {
    await chrome.alarms.create("alarm", {
      when,
    });
    const alarm = await chrome.alarms.get("alarm");
    const options: Record<string, boolean | number | string> = {
      running: true,
      scheduledAlarm: alarm.scheduledTime,
    };
    if (period) {
      options["period"] = period;
    }
    await chrome.storage.local.set(options);
    return alarm.scheduledTime;
  } catch (e) {
    console.error("create alarm failed - ", when);
  }
}

async function clearAlarms() {
  await chrome.alarms.clearAll();
  await chrome.storage.local.set({
    running: false,
    scheduledAlarm: undefined,
  });
}

// event handlers
chrome.runtime.onStartup.addListener(async () => {
  updateBadge();

  // check storage
  const results = await chrome.storage.local.get([
    "scheduledAlarm",
    "running",
    "work",
    "rest",
  ]);

  // set defaults for work and rest durations if not already set in storage
  const defaults: Record<string, number> = {};
  if (!results.work) defaults["work"] = WORK_DEFAULT;
  if (!results.rest) defaults["rest"] = REST_DEFAULT;
  await chrome.storage.local.set(defaults);

  // nothing scheduled & running, alarms should be cleared
  if (!results.scheduledAlarm || !results.running) {
    clearAlarms();
  }

  if (results.running) {
    // if running alarm should exist
    const alarm = await chrome.alarms.get("alarm");

    // if alarm doesnt exist but schedule exists
    if (!alarm) {
      // if stored alarm is in the future, create the alarm
      if (results.scheduledAlarm) {
        const storedAlarmValid = results.scheduledAlarm > Date.now();
        if (storedAlarmValid) {
          createAlarm(results.scheduledAlarm);
        }
      } else {
        createAlarm(WORK_DEFAULT * 60 * 1000 + Date.now(), "work");
      }
    }
  }
});

chrome.storage.local.onChanged.addListener(() => {
  updateBadge();
});

// When alarm goes off, create new alarm for next period
chrome.alarms.onAlarm.addListener(async () => {
  try {
    clearAlarms();
    const results = await chrome.storage.local.get(["period", "work", "rest"]);
    const currentPeriod = results.period || "work";
    const nextPeriod = currentPeriod === "work" ? "rest" : "work";
    await chrome.storage.local.set({
      period: nextPeriod,
    });
    if (nextPeriod === "work") {
      createAlarm(results.work * 60 * 1000 + Date.now(), "work");
    }
    if (nextPeriod === "rest") {
      createAlarm(results.rest * 60 * 1000 + Date.now(), "rest");
    }

    updateBadge();
  } catch (e) {
    console.error("error in onAlarm handler", e);
  }
});

// we aren't using the responses in the UI but we are still returning them for
// ease of debugging
chrome.runtime.onMessage.addListener(async (message, _sender, sendResponse) => {
  try {
    updateBadge();
    switch (message.action) {
      case "alarm-clear": {
        clearAlarms();
        clearBadge();
        sendResponse("alarms cleared");
        break;
      }
      case "alarm-reset": {
        const results = await chrome.storage.local.get([
          "period",
          "work",
          "rest",
        ]);
        const period = results.period || "work";
        if (period === "work") {
          createAlarm(results.work * 60 * 1000 + Date.now(), "work");
        }
        if (period === "rest") {
          createAlarm(results.rest * 60 * 1000 + Date.now(), "rest");
        }
        chrome.storage.local.set({ running: false });
        sendResponse("alarm reset");
        break;
      }
      case "alarm-start": {
        const results = await chrome.storage.local.get([
          "scheduledAlarm",
          "period",
          "work",
          "rest",
        ]);
        const period = results.period || "work";
        if (results.scheduledAlarm) {
          createAlarm(results.scheduledAlarm, period);
        } else {
          if (period === "work") {
            createAlarm(results.work * 60 * 1000 + Date.now(), "work");
          }
          if (period === "rest") {
            createAlarm(results.rest * 60 * 1000 + Date.now(), "rest");
          }
        }
        sendResponse("alarm started");
        break;
      }
      case "badge-clear": {
        clearBadge();
        break;
      }
      case "duration-set-rest": {
        await chrome.storage.local.set({
          rest: message.data,
        });
        const results = await chrome.storage.local.get([
          "period",
          "running",
          "rest",
        ]);
        if (results.period === "rest" && results.running) {
          clearAlarms();
          createAlarm(results.rest * 60 * 1000 + Date.now(), "rest");
        }
        sendResponse(results.rest);
        break;
      }
      case "duration-set-work": {
        await chrome.storage.local.set({
          work: message.data,
        });
        const results = await chrome.storage.local.get([
          "period",
          "running",
          "work",
        ]);

        if (results.period === "work") {
          clearAlarms();
          createAlarm(results.work * 60 * 1000 + Date.now(), "work");
        }
        updateBadge();
        sendResponse(results.work);
        break;
      }
      case "skip": {
        // grab current period
        const results = await chrome.storage.local.get([
          "period",
          "rest",
          "work",
        ]);

        // if the period is undefined set to work
        const nextPeriod = results.period === "work" ? "rest" : "work";
        await chrome.storage.local.set({
          period: nextPeriod,
        });
        if (nextPeriod === "work") {
          createAlarm(results.work * 60 * 1000 + Date.now(), "work");
        }
        if (nextPeriod === "rest") {
          createAlarm(results.rest * 60 * 1000 + Date.now(), "rest");
        }

        updateBadge();
        sendResponse(`period ${results.period} skipped`);
        break;
      }
      case "toggle-theme": {
        const results = await chrome.storage.local.get(["themeDark"]);
        await chrome.storage.local.set({
          themeDark: results.themeDark === undefined || !results.themeDark,
        });
        sendResponse("theme updated");
        break;
      }
    }
  } catch (e) {
    console.error("error in onMessage handler", e);
  }
});
