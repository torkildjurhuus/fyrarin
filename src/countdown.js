import React, { useState, useEffect } from "react";
function Countdown() {
  const [countdown, setCountdown] = useState(0);
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const now = new Date();
      const targetTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 16, 0, 0));
      const diff = targetTime - now;
      setCountdown(diff);
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, []);
  const formatCountdown = (ms) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };
  return (
    <div>
      <h1>Countdown to 16:00 UTC</h1>
      <p>{formatCountdown(countdown)}</p>
    </div>
  );
}
export default Countdown;