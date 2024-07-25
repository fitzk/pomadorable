import "@assets/index.css";
import React from "react";

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
      <div className="flex flex-row items-center">
        <input
          className="caret-pink-500 text-end w-10 rounded-sm m-1 text-sm font-medium text-gray-900 dark:text-white outline-1 outline"
          max="60"
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
  // Timer values are in (minutes)
  const [workMins, setWorkMins] = React.useState(3);
  const [restMins, setRestMins] = React.useState(2);

  const [themeDark, setThemeDark] = React.useState(false);

  const [init, setInit] = React.useState(true);
  const [period, setPeriod] = React.useState("work");
  const [remainder, setRemainder] = React.useState<number>();
  const [running, setRunning] = React.useState(false);
  const [intervalId, setIntervalId] = React.useState<number>();

  function updateStateOnStorageChange<T>(
    change: chrome.storage.StorageChange,
    callback: React.Dispatch<React.SetStateAction<T>>,
  ) {
    if (change && Object.keys(change).length > 0) {
      if (!change.oldValue || change.newValue !== change.oldValue) {
        callback(change.newValue);
      }
    }
  }

  React.useEffect(() => {
    if (init) {
      chrome.runtime.sendMessage({ action: "init" });

      chrome.storage.local.get(["work", "period", "rest", "running", "scheduledAlarm"]).then((results) => {
        setPeriod(results.period);
        setWorkMins(results.work);
        setRestMins(results.rest);
        setRunning(results.running);
      });

      chrome.storage.local.onChanged.addListener((changed) => {
        if (changed) {
          updateStateOnStorageChange(changed["period"], setPeriod);
          // if (changed["period"] && intervalId) {
          //   clearInterval(intervalId);
          // }
          updateStateOnStorageChange(changed["work"], setWorkMins);
          updateStateOnStorageChange(changed["rest"], setRestMins);
          updateStateOnStorageChange(changed["running"], setRunning);
        }
      });
      setInit(false);
    }

    chrome.storage.local.get(["scheduledAlarm"]).then((result) => {
      const _intervalId = setInterval(() => {
        let remainder = result.scheduledAlarm - Date.now();
        if (remainder >= 0) {
          setRemainder(remainder);
        } else {
          setRemainder(0);
          clearInterval(_intervalId);
        }
      }, 500);

      if (running) {
        setIntervalId(_intervalId);
      } else {
        clearInterval(_intervalId);
        clearInterval(intervalId);
        setIntervalId(undefined);
      }

      return () => {
        clearInterval(intervalId);
      };
    });
  }, [running, period]);

  const seconds = remainder ? (Math.floor((remainder / 1000) % 60) + "").padStart(2, "0") : "--";
  let minutes = remainder ? (Math.floor(remainder / 1000 / 60) + "").padStart(2, "0") : "--";

  return (
    <div
      className={`${themeDark ? "dark " : ""}container w-60 h-80 pt-4 px-4 bg-light dark:bg-slate-900 text-slate-600 dark:text-slate-300`}
    >
      <h1>Pomadoroble</h1>
      <div className="flex flex-col items-center">
        <h2 className="">{period.slice(0, 4).toLocaleUpperCase()}</h2>
        <div className="text-2xl">{minutes + ":" + seconds}</div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          disabled={running}
          onClick={async () => {
            if (!running) {
              await chrome.runtime.sendMessage({ action: "alarm-start" });
            }
          }}
        >
          start
        </button>
        <button
          onClick={async () => {
            await chrome.runtime.sendMessage({ action: "alarm-clear" });
            if (period === "work") {
              setRemainder(workMins * 60 * 1000);
            } else if (period === "rest") {
              setRemainder(restMins * 60 * 1000);
            }
          }}
        >
          reset
        </button>
      </div>
      <div className="mb-5"></div>
      <div>
        <SettingsPeriodInput
          label="Work Period"
          onBlur={async (mins) => {
            await chrome.runtime.sendMessage({ action: "work-duration-set", data: mins });
            if (period === "work") {
              await chrome.runtime.sendMessage({ action: "clear-alarm" });
              setRemainder(mins * 60 * 1000);
            }
          }}
          onChange={setWorkMins}
          value={workMins}
        />
        <SettingsPeriodInput
          label="Rest Period"
          onBlur={async (mins) => {
            await chrome.runtime.sendMessage({ action: "rest-duration-set", data: mins });
            if (period === "rest") {
              await chrome.runtime.sendMessage({ action: "clear-alarm" });
              setRemainder(mins * 60 * 1000);
            }
          }}
          onChange={setRestMins}
          value={restMins}
        />
      </div>

      <button className="outline" onClick={() => setThemeDark(!themeDark)}>
        {themeDark ? "dark" : "light"}
      </button>
    </div>
  );
}

export default Popup;
