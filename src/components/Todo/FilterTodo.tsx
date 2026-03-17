import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker, type RangeKeyDict } from "react-date-range";
import { useState } from "react";
import type { FilterProps } from "../../types";

export default function FilterTodo({
  filteredTodo,
}: {
  filteredTodo: FilterProps;
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges: RangeKeyDict) => {
    const nextStartDate = ranges.selection.startDate as Date;
    const nextEndDate = ranges.selection.endDate as Date;

    setStartDate(nextStartDate);
    setEndDate(nextEndDate);
    filteredTodo(nextStartDate, nextEndDate);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsPickerOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>

      {isPickerOpen ? (
        <div className="mt-3 overflow-auto rounded-xl border border-slate-200 bg-white p-2 shadow-md">
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            direction="horizontal"
          />
        </div>
      ) : null}
    </div>
  );
}
