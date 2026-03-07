import { useState, useEffect } from "react";

export default function DisplayTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  return (
    <div className="text-center mb-6">
      <h2 className="text-lg text-slate-600 font-medium">
        {time.toLocaleTimeString()}
      </h2>
    </div>
  );
}
