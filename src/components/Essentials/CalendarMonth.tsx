"use client";

import { Reminder } from "@prisma-client";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import Link from "next/link";
import React from "react";

type CalendarProps = {
  currentMonth: Date;
  reminders: Reminder[];
  completedDates: Record<string, boolean>;
  onToggleCompletion: (dateStr: string) => void;
};


export default function CalendarMonth({
  currentMonth,
  reminders,
}: CalendarProps) {
  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));
  const today = new Date();
  const days: React.JSX.Element[] = [];

  let day = startDate;

  while (day <= endDate) {
    const dayReminders = reminders.filter((r) =>
      isSameDay(new Date(r.scheduledDate), day)
    );
    const isToday = isSameDay(day, today);

    // Tick/cross logic
    let statusIcon = null;
    if (dayReminders.length > 0) {
      const allCompleted = dayReminders.every(
        (r) => r.reminderStatus === "COMPLETED"
      );
      statusIcon = (
        <span className={`ml-2 text-lg`}>
          {allCompleted ? "✔️" : "✗"}
        </span>
      );
    } else {
      // If you want to show a cross for days with no reminders, uncomment below:
      // statusIcon = <span className="ml-2 text-lg text-gray-300">✗</span>;
      statusIcon = null;
    }

    days.push(
      <div
        key={day.toDateString()}
        className={`border min-h-[100px] text-sm relative rounded-xl p-3 shadow-sm hover:bg-gray-50 ${
          isSameMonth(day, currentMonth)
            ? "bg-white"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        <div className="flex justify-between items-start mb-1">
          <div
            className={`text-base font-semibold px-2 rounded ${
              isToday ? "bg-indigo-100 text-indigo-700" : ""
            }`}
          >
            {day.getDate()}
          </div>
          {statusIcon}
        </div>

        <div className="flex flex-col">
          {dayReminders.map((reminder, idx) => (
            <Link
              href={`https://leetcode.com/problems/${reminder.problemSlug}`}
              target="_blank"
              key={idx}
              className={`text-xs truncate cursor-pointer ${
                reminder.reminderStatus === "PENDING"
                  ? "text-red-600"
                  : reminder.reminderStatus === "COMPLETED"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
              prefetch
            >
              • {reminder.problemTitle}
            </Link>
          ))}
        </div>
      </div>
    );

    day = addDays(day, 1);
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 text-center bg-gray-100 text-xs sm:text-sm font-medium p-2 rounded-t-xl">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-px">
        {days}
      </div>
    </div>
  );
}
