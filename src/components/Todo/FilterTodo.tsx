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

  return <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />;
}
