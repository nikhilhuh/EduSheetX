import React from "react";

interface CountdownTimerProps {
  secondsLeft: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ secondsLeft }) => {
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
