import React from "react";

interface CountdownTimerProps {
  minutes: number; // Total time in minutes
  onComplete?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ minutes, onComplete }) => {
  const [secondsLeft, setSecondsLeft] = React.useState(minutes * 60);

  React.useEffect(() => {
    if (secondsLeft <= 0) {
      if (onComplete) onComplete();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, onComplete]);

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
    <div className="text-xl font-mono text-red-600">
      ⏳ Time Left: {formatTime(secondsLeft)}
    </div>
  );
};

export default CountdownTimer;
