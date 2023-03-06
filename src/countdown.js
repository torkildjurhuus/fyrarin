import React, { useState, useEffect } from "react";

function Countdown() {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const now = new Date();
      const month = now.getMonth();
      const year = now.getFullYear();
      const firstFriday = new Date(year, month, 1);
      while (firstFriday.getDay() !== 5) {
        firstFriday.setDate(firstFriday.getDate() + 1);
      }
      if (now > firstFriday) {
        // If first Friday of current month has already passed,
        // set first Friday to next month
        firstFriday.setMonth(firstFriday.getMonth() + 1);
        while (firstFriday.getDay() !== 5) {
          firstFriday.setDate(firstFriday.getDate() + 1);
        }
      }
      const diff = firstFriday - now;
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
      <h1>Countdown to First Friday of the Month</h1>
      <p>{formatCountdown(countdown)}</p>
    </div>
  );
}

export default Countdown;
