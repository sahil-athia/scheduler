import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory((prev) => [...prev]);
      return setMode(newMode);

    } else {
      setHistory((prev) => [...prev, newMode]);
      return setMode(newMode);
    }
  };

  const back = () => {
    if (history.length <= 1) {
      return setMode(history[0]);
    } else {
      setHistory((prev) => {
        // async call
        const newHistory = [...prev.slice(0, prev.length - 1)];
        setMode(newHistory[newHistory.length - 1]);
        return newHistory; // this is setting history
      })
    }
  };
  
  return { mode , transition, back };
};
