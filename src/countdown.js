import React, { useState, useEffect } from "react";

function Countdown() {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const now = new Date();
      const targetDate = getNextFirstFriday(now);
      const diff = targetDate - now;
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
      <h1>Countdown to First Friday of Each Month at 16:00 UTC</h1>
      <p>{formatCountdown(countdown)}</p>
    </div>
  );
}

function getNextFirstFriday(date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
  let daysUntilFirstFriday = (5 - firstDayOfMonth.getUTCDay() + 7) % 7;

  // If the first Friday of the month has already passed, we need to get the first Friday of next month
  if (date.getUTCDate() > daysUntilFirstFriday + 1) {
    daysUntilFirstFriday += 7;
  }

  const targetDate = new Date(
    Date.UTC(year, month, daysUntilFirstFriday + 1, 16, 0, 0)
  );

  return targetDate;
}

export default Countdown;
