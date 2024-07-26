import logo from "@assets/icon128.png";
import "@assets/index.css";
import React, { ReactNode } from "react";

// start icons
function HaltIcon() {
  return (
    <svg
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShipItIcon() {
  return (
    <svg
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StartIcon() {
  return (
    <svg
      className="size-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg
      className="size-6"
      fill="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function FastforwardIcon() {
  return (
    <svg
      className="size-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
    </svg>
  );
}

// mini
function TimerIcon() {
  return (
    <svg
      className="size-4"
      fill="currentColor"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      className="size-4"
      fill="currentColor"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      className="size-4"
      fill="currentColor"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="size-4"
      fill="currentColor"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
    </svg>
  );
}
// end icons

// start components
function SetTimerInput({
  label,
  onChange,
  onPersist,
  value,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  onPersist: (n: number) => void;
}) {
  return (
    <div className="flex flex-row justify-evenly items-center p-1">
      <div className="flex flex-row items-center w-6/12">
        <label className="mr-1 w-6/12 font-bold text-end text-sm">
          {label}
        </label>
        <TimerIcon />
      </div>
      <div className="flex flex-row items-center w-6/12">
        <input
          className="pr-2 pl-2 border rounded-sm w-12 font-medium text-end text-gray-900 text-sm outline outline-1"
          max="60"
          min="1"
          name={label}
          onBlur={(e) => {
            const value = parseFloat(e.currentTarget.value);
            if (value > 0 && value < 60) {
              onPersist(parseFloat(e.currentTarget.value));
            }
          }}
          onChange={(e) => {
            const value = parseFloat(e.currentTarget.value);
            if (value > 0 && value < 60) {
              onChange(value);
            }
          }}
          type="number"
          value={value}
        />
        <div className="flex ml-1 row">
          <button
            className="m-0 hover:text-blue-400"
            onClick={() => {
              const next = value - 1;
              if (next > 0 && next < 60) {
                onPersist(next);
              }
            }}
          >
            <MinusIcon />
          </button>
          <button
            className="m-0 hover:text-blue-400"
            onClick={() => {
              const next = value + 1;
              if (next > 0 && next < 60) {
                onPersist(next);
              }
            }}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
      <div className="ml-1 w-2/12 text-xs">{"(mins)"}</div>
    </div>
  );
}

function ControlButton({
  children,
  ...props
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => Promise<void>;
}) {
  return (
    <button
      className="flex justify-center items-center bg-blue-950 hover:bg-blue-400 disabled:bg-gray-500 dark:bg-amber-50 p-1 rounded-md text-amber-50 text-lg dark:text-blue-950"
      {...props}
    >
      {children}
    </button>
  );
}

// main component
function Popup() {
  // lifecycle state
  const [init, setInit] = React.useState(true);

  // settings state
  const [workMins, setWorkMins] = React.useState<number>(25);
  const [restMins, setRestMins] = React.useState<number>(5);
  const [themeDark, setThemeDark] = React.useState(false);

  // timer state
  const [period, setPeriod] = React.useState("work");
  const [remainder, setRemainder] = React.useState<number>();
  const [running, setRunning] = React.useState(false);

  // interval id ref to clear whenever alarms are changed make sure countdown
  // behaves correctly
  const intervalId = React.useRef<number>();

  function clearOldInterval() {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = undefined;
    }
  }
  // fn updates component state on storage state change so the UI is always in sync
  // with data stored via Chrome.storage.local
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
      // init event sent to backend for logging if needed
      chrome.runtime.sendMessage({ action: "init" });
      // set timer state and settings state from storage
      chrome.storage.local
        .get(["work", "period", "rest", "running", "themeDark"])
        .then((results) => {
          if (results.period) setPeriod(results.period ?? "work");
          if (results.work) setWorkMins(results.work);
          if (results.rest) setRestMins(results.rest);
          if (results.running) setRunning(results.running);
          if (results.themeDark) setThemeDark(results.themeDark);
        });
      // update state and settings when storage values are updated
      chrome.storage.local.onChanged.addListener((changed) => {
        if (changed) {
          updateStateOnStorageChange(changed["period"], setPeriod);
          updateStateOnStorageChange(changed["work"], setWorkMins);
          updateStateOnStorageChange(changed["rest"], setRestMins);
          updateStateOnStorageChange(changed["running"], setRunning);
          updateStateOnStorageChange(changed["themeDark"], setThemeDark);
        }
      });
      setInit(false);
    }

    if (running) {
      // drives the display countdown in the UI, persisting alarms are managed by the service-worker
      chrome.storage.local.get(["scheduledAlarm"]).then((result) => {
        const id = setInterval(() => {
          const remainder = result.scheduledAlarm - Date.now();
          if (remainder >= 0) {
            setRemainder(remainder);
          } else {
            setRemainder(0);
            clearInterval(id);
          }
        }, 500);
        intervalId.current = id;
        return () => {
          clearOldInterval();
          clearInterval(id);
        };
      });
    }
  }, [running, period, init]);

  // format display countdown as "mm:ss" or "--:--" when no remainder is set
  const seconds = remainder
    ? (Math.floor((remainder / 1000) % 60) + "").padStart(2, "0")
    : "--";
  const minutes = remainder
    ? (Math.floor(remainder / 1000 / 60) + "").padStart(2, "0")
    : "--";

  return (
    <div
      className={`${themeDark ? "dark " : ""}container w-60 p-4 m-0 bg-amber-50 dark:bg-blue-950 text-slate-600 dark:text-slate-300`}
    >
      <div className="flex justify-between mb-2">
        <div className="flex flex-row justify-start items-center text-blue-950 dark:text-blue-100">
          <img className="mr-1 rounded-xl w-4 h-4" src={logo} />
          <h1 className="text-sm uppercase">pomadorable</h1>
        </div>
        <div className="flex items-center">
          <button
            onClick={async () => {
              window.close();
            }}
          >
            <MinusIcon />
          </button>
          <button
            onClick={async () => {
              await chrome.runtime.sendMessage({ action: "alarm-clear" });
              await chrome.runtime.sendMessage({ action: "badge-clear" });
              window.close();
            }}
          >
            <CloseIcon />
          </button>
        </div>
      </div>
      <div
        className={`bg-white p-2 rounded-md ${period === "work" ? "text-pink-800" : "text-blue-950"} outline outline-1 outline-black`}
      >
        <div className="flex flex-col items-center mt-4 p-2">
          <div
            className={
              "flex flex-row items-center " +
              (running
                ? "animate-bounce animate-infinite animate-duration-[1000ms] animate-ease-linear"
                : "")
            }
          >
            <h2 className="mr-1 font-semibold text-2xl uppercase">{period}</h2>
            {period === "work" ? <ShipItIcon /> : <HaltIcon />}
          </div>
          <div className="p-4 pt-0 font-bold text-3xl">
            {minutes + ":" + seconds}
          </div>
        </div>
      </div>
      <div className="gap-1 grid grid-cols-3 mt-4 mb-4">
        <ControlButton
          onClick={async () => {
            clearOldInterval();
            await chrome.runtime.sendMessage({ action: "alarm-clear" });
            await chrome.runtime.sendMessage({ action: "alarm-reset" });
          }}
        >
          <ResetIcon />
        </ControlButton>
        <ControlButton
          disabled={running}
          onClick={async () => {
            if (!running) {
              await chrome.runtime.sendMessage({ action: "alarm-start" });
            }
          }}
        >
          <StartIcon />
        </ControlButton>
        <ControlButton
          onClick={async () => {
            clearOldInterval();
            await chrome.runtime.sendMessage({ action: "alarm-clear" });
            await chrome.runtime.sendMessage({ action: "skip" });
          }}
        >
          <FastforwardIcon />
        </ControlButton>
      </div>
      <div className="mt-2">
        <SetTimerInput
          label="work"
          onChange={setWorkMins}
          onPersist={async (mins) => {
            await chrome.runtime.sendMessage({
              action: "duration-set-work",
              data: mins,
            });
            if (period === "work") clearOldInterval();
          }}
          value={workMins}
        />
        <SetTimerInput
          label="rest"
          onChange={setRestMins}
          onPersist={async (mins) => {
            await chrome.runtime.sendMessage({
              action: "duration-set-rest",
              data: mins,
            });
            if (period === "rest") clearOldInterval();
          }}
          value={restMins}
        />
      </div>
      <div className="flex flex-row justify-center items-center pt-4 w-12/12">
        <button
          onClick={async () => {
            await chrome.runtime.sendMessage({ action: "toggle-theme" });
            setThemeDark(!themeDark);
          }}
        >
          {themeDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </div>
  );
}

export default Popup;
