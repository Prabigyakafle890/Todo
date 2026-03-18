import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker, type RangeKeyDict } from "react-date-range";
import { useState } from "react";
import { Input } from "../ui";
import type { FilterProps } from "../../types";

export default function FilterTodo({
  filteredTodo,
  onTitleSearchChange,
  clearDeadlineFilter,
}: {
  filteredTodo: FilterProps;
  onTitleSearchChange: (value: string) => void;
  clearDeadlineFilter: () => void;
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<"deadline" | "title">(
    "deadline",
  );
  const [titleQuery, setTitleQuery] = useState("");

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

  const handleModeChange = (mode: "deadline" | "title") => {
    setSearchMode(mode);

    if (mode === "title") {
      clearDeadlineFilter();
      return;
    }

    setTitleQuery("");
    onTitleSearchChange("");
    filteredTodo(startDate, endDate);
  };

  const handleTitleChange = (value: string) => {
    setTitleQuery(value);
    onTitleSearchChange(value);
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
        <div className="absolute right-0 z-20 mt-3 w-90 max-w-[90vw] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:right-auto">
          <div className="mb-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleModeChange("deadline")}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${searchMode === "deadline" ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              Search by deadline
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("title")}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${searchMode === "title" ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              Search by title
            </button>
          </div>

          {searchMode === "deadline" ? (
            <div className="overflow-auto rounded-xl border border-slate-100">
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                direction="horizontal"
              />
            </div>
          ) : (
            <div>
              <label
                htmlFor="title-search"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
              >
                Title query
              </label>
              <Input
                id="title-search"
                value={titleQuery}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Type title to search"
                aria-label="Search todos by title"
              />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
