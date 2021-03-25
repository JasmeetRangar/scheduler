import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  /**
   * 
   * @param {new mode} mode 
   * @param {Boolean} replace 
   */
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

  //Goes 1 step back in history
  const back = () => {
    if (history.length > 1) {
      history.pop();
      setHistory([...history]);
      setMode(history[history.length-1]);
    }
  }
  
  return { mode, transition, back }
}