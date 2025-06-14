"use client";

import CalendarActions from "@components/Essentials/CalendarAction";
import CalendarMonth from "@components/Essentials/CalendarMonth";
import MonthNavigator from "@components/Essentials/MonthNavigator";
import { Reminder } from "@prisma-client";
import { CalendarIcon, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

const formatDate = (date: Date) => date.toISOString().split('T')[0];

export default function CalendarPage({ reminders }: { reminders: Reminder[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [completedDates, setCompletedDates] = useState<Record<string, boolean>>({});

  // Toggle completion status for a specific date
  const toggleDateCompletion = (dateStr: string) => {
    setCompletedDates(prev => ({
      ...prev,
      [dateStr]: !prev[dateStr]
    }));
  };

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
    <div className="pt-0 mt-0 px-6">
      <div className="mb-6 flex items-center space-x-2">
        
        <h1 className="text-3xl font-bold">Calendar View</h1>
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

      {/* Legend for tick and cross */}
      <div className="flex items-center space-x-4 mb-4">
        <span className="flex items-center space-x-1">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm">Completed</span>
        </span>
        <span className="flex items-center space-x-1">
          <XCircle className="w-4 h-4 text-red-400" />
          <span className="text-sm">Not Completed</span>
        </span>
      </div>

      <CalendarMonth 
        currentMonth={currentDate} 
        reminders={reminders}
        completedDates={completedDates}
        onToggleCompletion={toggleDateCompletion}
      />
    </div>
  );
}
