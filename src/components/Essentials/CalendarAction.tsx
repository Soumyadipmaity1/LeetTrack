"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, LayoutGrid } from "lucide-react";

type CalendarActionsProps= {
  currentDate: Date;
  onMonthChange: (month: number) => void;
  goToToday: () => void;
}

export default function CalendarActions({
  currentDate,
  onMonthChange,
  goToToday,
}: CalendarActionsProps) {
  
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  return (
    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
      <div className="relative">
        <select
          value={currentDate.getMonth()}
          onChange={(e) => onMonthChange(parseInt(e.target.value))}
          className="appearance-none border rounded-md pl-8 pr-6 py-1.5 text-sm text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-black"
        >
          {monthNames.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        <LayoutGrid className="absolute left-2 top-2 h-4 w-4 text-gray-500" />
        <ChevronDown className="absolute right-2 top-2 h-4 w-4 text-gray-500" />
      </div>

      <Button variant="outline" onClick={goToToday}>
        Today
      </Button>
      <Button>Add Reminder</Button>
  </div>
 );
}