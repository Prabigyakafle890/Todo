import { useState, useEffect } from "react";

export default function DisplayTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-5 rounded-2xl border border-white/70 bg-white/65 p-3 text-center shadow-sm sm:mb-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Local Time
      </h2>
      <p className="mt-1 text-xl font-semibold text-slate-700 sm:text-2xl">
        {time.toLocaleTimeString()}
      </p>
    </div>
  );
}
