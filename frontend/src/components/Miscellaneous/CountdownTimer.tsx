import React from "react";

interface CountdownTimerProps {
  minutes: number;
  onComplete?: () => void;
  testId: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  minutes,
  onComplete,
  testId,
}) => {
  const [secondsLeft, setSecondsLeft] = React.useState<number>(0);

  React.useEffect(() => {
    const storageKey = `test_start_time_${testId}`;
    let startTime = localStorage.getItem(storageKey);
    let parsedStartTime: number;

    if (!startTime) {
      parsedStartTime = Date.now();
      localStorage.setItem(storageKey, parsedStartTime.toString());
    } else {
      parsedStartTime = parseInt(startTime);
    }

    const endTime = parsedStartTime + minutes * 60 * 1000;
    const now = Date.now();

    if (now >= endTime) {
      // Time already up when loading
      localStorage.removeItem(storageKey);
      if (onComplete) onComplete();
      return;
    }

    const updateTimer = () => {
      const currentTime = Date.now();
      const remaining = Math.max(Math.floor((endTime - currentTime) / 1000), 0);
      setSecondsLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        localStorage.removeItem(storageKey);
        if (onComplete) onComplete();
      }
    };

    updateTimer(); // Set initial state
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [minutes, onComplete, testId]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const pad = (num: number) => num.toString().padStart(2, "0");

    return hrs > 0
      ? `${pad(hrs)}:${pad(mins)}:${pad(secs)}`
      : `${pad(mins)}:${pad(secs)}`;
  };

  return (
    <div
      title="Time Left"
      className="bg-white/10 backdrop-blur-md border border-red-500 text-red-500 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 w-fit"
    >
      <span className="text-lg tablet:text-xl font-semibold">⏳</span>
      <span className="font-mono text-xl tablet:text-2xl tracking-wider">
        {formatTime(secondsLeft)}
      </span>
    </div>
  );
};

export default CountdownTimer;
