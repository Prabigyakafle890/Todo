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
        className="inline-flex h-11.5 items-center gap-2 rounded-xl border border-slate-200 bg-white/85 px-3 py-2 text-slate-700 shadow-sm transition hover:border-teal-300 hover:bg-teal-50/40"
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
        <div className="absolute right-0 z-20 mt-3 overflow-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl sm:right-auto">
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
