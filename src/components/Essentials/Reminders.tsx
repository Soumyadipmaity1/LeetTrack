"use client";
import { Calendar } from "@/components/ui/calendar";
import { AlertTriangle, CalendarDays, CheckCircle, Clock } from "lucide-react";
import * as React from "react";

type ReminderStats = {
  "Total Reminders": number;
  "Upcoming Reminders": number;
  "Completed Questions": number;
  "Missed Reminders": number;
};

const iconMap: Record<
  keyof ReminderStats,
  { icon: React.ReactNode; color: string }
> = {
  "Total Reminders": {
    icon: <CalendarDays className="text-blue-500 mt-1.5" size={12} />,
    color: "text-blue-500",
  },
  "Upcoming Reminders": {
    icon: <Clock className="text-orange-500 mt-1.5" size={12} />,
    color: "text-orange-500",
  },
  "Completed Questions": {
    icon: <CheckCircle className="text-green-500 mt-1.5" size={12} />,
    color: "text-green-500",
  },
  "Missed Reminders": {
    icon: <AlertTriangle className="text-red-500 mt-1.5" size={12} />,
    color: "text-red-500",
  },
};

const Reminders = () => {
  const data: ReminderStats = {
    "Total Reminders": 1,
    "Upcoming Reminders": 2,
    "Completed Questions": 3,
    "Missed Reminders": 4,
  };
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div>
      <div className="gap-3 flex">
        {/* Stat Cards */}
        {Object.entries(data).map(([label, value]) => {
          const { icon } = iconMap[label as keyof ReminderStats];

          return (
            <div key={label} className="border flex w-60 h-24 p-4">
              <div>
                <h3 className="text-sm text-gray-600 whitespace-nowrap">
                  {label}
                </h3>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
              </div>
              <div className="ml-6">{icon}</div>
            </div>
          );
        })}

        <div className="w-fit min-w-[250px]">
          <Calendar
            className="rounded-md border shadow-sm"
            mode="single"
            selected={date}
            onSelect={setDate}
          />
        </div>
      </div>
    </div>
  );
};

export default Reminders;
