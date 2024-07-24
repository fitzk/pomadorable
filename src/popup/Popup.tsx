import "@assets/index.css";
import React from "react";

const PERIOD_NAME_WORK = "work-period";
const PERIOD_DEFAULT_WORK = 60;
const PERIOD_NAME_REST = "rest-period";
const PERIOD_DEFAULT_REST = 60;

function SettingsPeriodInput({
  label,
  onBlur,
  onChange,
  value,
}: {
  label: string;
  value: number;
  onBlur: (n: number) => void;
  onChange: (n: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-1">
      <label>{label}</label>
      <div className="flex">
        <input
          className="outline w-10"
          min="1"
          onBlur={(e) => onBlur(parseFloat(e.currentTarget.value))}
          onChange={(e) => onChange(parseFloat(e.currentTarget.value))}
          type="number"
          value={value}
        />
        <label>min</label>
      </div>
    </div>
  );
}

function Popup() {
  const [showSettings, setShowSettings] = React.useState(false);

  // Timer values are in (minutes)
  const [workMins, setWorkMins] = React.useState(PERIOD_DEFAULT_WORK / 60);
  const [restMins, setRestMins] = React.useState(PERIOD_DEFAULT_REST / 60);

  const [themeDark, setThemeDark] = React.useState(false);

  const [remainderSecs, setRemainderSecs] = React.useState(PERIOD_DEFAULT_WORK);
  const [period, setPeriod] = React.useState(PERIOD_NAME_WORK);
  const [running, setRunning] = React.useState(false);
  const [init, setInit] = React.useState(true);

  function logChromeStorage() {
    chrome.storage.local.get(["rest-period", "work-period", "remainder", "period"]).then((value) => {
      console.log("saved storage: ", JSON.stringify(value));
    });
  }

  function setFromStorage() {
    chrome.storage.local.get(["rest-period", "work-period", "remainder", "period", "running"]).then((value) => {
      if (value["work-period"]) {
        setRemainderSecs(value["work-period"]);
        setWorkMins(value["work-period"] / 60);
      }
      if (value["rest-period"]) {
        setRestMins(value["rest-period"] / 60);
      }
      if (value["remainder"]) {
        setRemainderSecs(value["remainder"]);
      }
      if (value["period"]) {
        setPeriod(value["period"]);
      }
      if (value["running"]) {
        setRunning(value["running"]);
        // let workDurSecs = workMins * 60;
      }
    });
  }

  React.useEffect(() => {
    if (init) {
      setFromStorage();
      setInit(false);
    }

    if (running) {
      const intervalId = setInterval(() => {
        setRemainderSecs(remainderSecs - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
        if (remainderSecs === 0) {
          if (period === PERIOD_NAME_WORK) {
            setPeriod(PERIOD_NAME_REST);
            setRemainderSecs(restMins * 60);
            chrome.storage.local.set({ period: PERIOD_NAME_REST, remainder: restMins * 60 });
          } else {
            setPeriod(PERIOD_NAME_WORK);
            setRemainderSecs(workMins * 60);
            chrome.storage.local.set({ period: PERIOD_NAME_WORK, remainder: workMins * 60 });
          }
        }
        chrome.storage.local.set({ period, remainder: remainderSecs });
      };
    }
  }, [remainderSecs, period, running, workMins, restMins]);

  return (
    <div
      className={`${themeDark ? "dark " : ""}container w-60 h-80 pt-4 px-4 bg-light dark:bg-slate-900 text-slate-600 dark:text-slate-300`}
    >
      <h1>Pomadoroble</h1>
      <p>{period.slice(0, 4).toLocaleUpperCase()}</p>
      <div>{remainderSecs}</div>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => {
            setRunning(true);
            chrome.storage.local.set({ running: true });
            chrome.alarms.create("work-alarm", { when: Date.now() }, () => {
              console.log("rest-alarm created in popup");
              chrome.action.setBadgeText({ text: "work start" });
            });
          }}
        >
          start
        </button>
        <button
          onClick={() => {
            chrome.storage.local.get(["work-period"]).then((value) => {
              setRunning(false);
              setRemainderSecs(value["work-period"]);
              setPeriod("work-period");
              chrome.storage.local.set({
                period,
                remainder: value["work-period"],
                running: false,
              });
              chrome.alarms.clearAll();
            });
          }}
        >
          reset
        </button>
      </div>
      <div className="mb-5"></div>
      <>
        <button onClick={() => setShowSettings(!showSettings)}>settings</button>
        {showSettings && (
          <div>
            <SettingsPeriodInput
              label="Work Period"
              onBlur={async (mins) => {
                setWorkMins(mins);
                setRemainderSecs(mins * 60);
                await chrome.storage.local.set({ "work-period": mins * 60 });
                logChromeStorage();
              }}
              onChange={setWorkMins}
              value={workMins}
            />
            <SettingsPeriodInput
              label="Rest Period"
              onBlur={async (mins) => {
                setWorkMins(mins);
                setRemainderSecs(mins * 60);
                await chrome.storage.local.set({ "rest-period": mins * 60 });
                logChromeStorage();
              }}
              onChange={setRestMins}
              value={restMins}
            />
          </div>
        )}
      </>
      <button className="outline" onClick={() => setThemeDark(!themeDark)}>
        {themeDark ? "dark" : "light"}
      </button>
    </div>
  );
}

export default Popup;
