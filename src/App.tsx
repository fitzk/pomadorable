import React from "react";
import "./App.css";

const INTERVAL_DEFAULT_WORK = 15;
const INTERVAL_DEFAULT_REST = 5;

const INTERVAL_TYPE_WORK = "work";
const INTERVAL_TYPE_REST = "rest";

function App() {
  const [showSettings, setShowSettings] = React.useState(false);
  const [themeDark, setThemeDark] = React.useState(false);
  const [intervalRemainderSecs, setIntervalRemainderSecs] = React.useState(INTERVAL_DEFAULT_WORK);
  const [intervalType, setIntervalType] = React.useState(INTERVAL_TYPE_WORK);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    if (running) {
      const intervalId = setInterval(() => {
        setIntervalRemainderSecs(intervalRemainderSecs - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
        if (intervalRemainderSecs === 0) {
          alert("done");
          if (intervalType === INTERVAL_TYPE_WORK) {
            setIntervalType(INTERVAL_TYPE_REST);
            setIntervalRemainderSecs(INTERVAL_DEFAULT_REST);
          } else {
            setIntervalType(INTERVAL_TYPE_WORK);
            setIntervalRemainderSecs(INTERVAL_DEFAULT_WORK);
          }
        }
      };
    }
  }, [intervalRemainderSecs, intervalType, running]);

  return (
    <div
      className={`${themeDark ? "dark " : ""}container mx-auto bg-light dark:bg-slate-900 text-slate-600 dark:text-slate-300`}
    >
      <h1>Yo Pomodoro</h1>
      <p>{intervalType}</p>
      <div>{intervalRemainderSecs}</div>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => setRunning(true)}>start</button>
        <button
          onClick={() => {
            setRunning(false);
            setIntervalRemainderSecs(INTERVAL_DEFAULT_WORK);
            setInterval(INTERVAL_TYPE_WORK);
          }}
        >
          reset
        </button>
      </div>
      <button onClick={() => setShowSettings(!showSettings)}>settings</button>
      {showSettings && (
        <div>
          <button onClick={() => setThemeDark(!themeDark)}>{themeDark ? "dark" : "light"}</button>
          <div className="grid grid-cols-4 gap-1">
            <label>work interval</label>
            <div>
              <input type="number"></input>
              <label>mm</label>
            </div>
            <div>
              <input type="number"></input>
              <label>ss</label>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1">
            <label>rest interval</label>
            <div>
              <input type="number"></input>
              <label>mm</label>
            </div>
            <div>
              <input type="number"></input>
              <label>ss</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
