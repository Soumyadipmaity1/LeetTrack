"use client";

import { useState } from "react";
import CalendarMonth from "@components/Essentials/CalendarMonth";
import MonthNavigator from "@components/Essentials/MonthNavigator";
import CalendarActions from "@components/Essentials/CalendarAction";
import { CalendarIcon } from "lucide-react";

export default function CalendarPage() {

  const [currentDate, setCurrentDate] = useState(new Date());
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const onMonthChange = (month: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
  };

  return (
    <div className="pt-20 px-6">
      
      <div className="mb-2 flex items-center space-x-2">
        <CalendarIcon className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">Calendar View</h1>
      </div>

      <div className="flex flex-wrap justify-between items-start mb-4">
        <MonthNavigator
          currentDate={currentDate}
          goToPreviousMonth={goToPreviousMonth}
          goToNextMonth={goToNextMonth}
        />
        <CalendarActions
          currentDate={currentDate}
          onMonthChange={onMonthChange}
          goToToday={goToToday}
        />
      </div>
      <CalendarMonth currentMonth={currentDate} reminders={[]} />
</div>
);
}