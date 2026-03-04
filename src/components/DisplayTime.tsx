import { useState, useEffect } from "react";

export default function DisplayTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  return (
    <div>
      <h2>{time.toLocaleTimeString()}</h2>
    </div>
  );
}
