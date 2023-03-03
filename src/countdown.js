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
      <h1>Niðurteljing til næsta fýrara</h1>
      <p>{formatCountdown(countdown)}</p>
    </div>
  );
}

function getNextFirstFriday(date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
  const daysUntilFirstFriday = (5 - firstDayOfMonth.getUTCDay() + 7) % 7;
  const targetDate = new Date(
    Date.UTC(year, month, 1 + daysUntilFirstFriday, 16, 0, 0)
  );

  if (targetDate < date) {
    // The first Friday of this month has already passed, so we need to get the first Friday of next month
    targetDate.setUTCMonth(month + 1);
    targetDate.setUTCDate(1);
    const daysUntilNextFirstFriday = (5 - targetDate.getUTCDay() + 7) % 7;
    targetDate.setUTCDate(1 + daysUntilNextFirstFriday);
  }

  return targetDate;
}

export default Countdown;
