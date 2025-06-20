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
  const [secondsLeft, setSecondsLeft] = React.useState<number>(minutes * 60);

  React.useEffect(() => {
    const storageKey = `test_start_time_${testId}`;
    let parsedStartTime: number;

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      parsedStartTime = parseInt(saved);
    } else {
      parsedStartTime = Date.now();
      localStorage.setItem(storageKey, parsedStartTime.toString());
    }

    const endTime = parsedStartTime + minutes * 60 * 1000;

    const update = () => {
      const now = Date.now();
      const remaining = Math.floor((endTime - now) / 1000);
      if (remaining <= 0) {
        setSecondsLeft(0);
        clearInterval(interval);
        localStorage.removeItem(storageKey);
        if (onComplete) onComplete();
      } else {
        setSecondsLeft(remaining);
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [minutes, onComplete, testId]);

  const format = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div
      title="Time Left"
      className="bg-white/10 backdrop-blur-md border border-red-500 text-red-500 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 w-fit"
    >
      <span className="text-lg tablet:text-xl font-semibold">⏳</span>
      <span className="font-mono text-xl tablet:text-2xl tracking-wider">
        {format(secondsLeft)}
      </span>
    </div>
  );
};

export default CountdownTimer;
