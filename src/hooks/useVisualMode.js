import Empty from "components/Appointment/Show";
import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //take in a new mode and update the mode state with the new value
  //When replace is true then set the history to reflect that we are replacing the current mode.
  function transition(newMode, replace) {
    if (!replace) {
      setMode(newMode);
      setHistory((prev) => [...prev, newMode]);
    } else {
      setMode(newMode);
      setHistory(() => [...history.slice(0, history.length - 1), newMode]);
    }
  }

  //set the mode to the previous item in our history array
  function back() {
    if (history.length >= 1) {
      const newHistory = history.slice(0, -1);
      const prevHistory = newHistory.length - 1;
      setMode(newHistory[prevHistory] || "EMPTY");
      setHistory(() => [...newHistory]);
    }
  }

  return { mode, transition, back };
}
