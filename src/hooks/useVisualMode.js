import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (mode, replace = false) => {
    setMode(mode);
    if (replace) {
      const tempHistory = [ ...history ]
      tempHistory.pop();
      setHistory([...tempHistory, mode]);
    } else {
      setHistory([...history, mode]);
    }
  }

  
  const back = () => {
    if (history.length > 1) {
      history.pop();
      setHistory([...history]);
      setMode(history[history.length-1]);
    }
  }
  
  return { mode, transition, back }
}