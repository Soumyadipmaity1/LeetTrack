"use server";

import DashboardCalendarToggle from "@components/Essentials/DashboardCalendarToggle";
import { AddReminderModal } from "@components/Essentials/ReminderDialog";
import Reminders from "@components/Essentials/Reminders";
import ReminderTable from "@components/Essentials/ReminderTable";
import SearchFilter from "@components/Essentials/SearchFilter";
import WelcomeBanner from "@components/Essentials/WelcomeBanner";
import { getReminders } from "./dashboard-action";

export default async function Dashboard() {
  const receivedData = await getReminders();

  if (receivedData?.serverError) {
    return <>An error occurred while fetching reminders.</>;
  }

  return (
    <main className="flex flex-col pt-0 mt-0">
      <div className="flex items-center justify-between mb-8">
        <WelcomeBanner name="Eshita Kapat" />
        {/* Modal for Adding a Reminder */}
        <AddReminderModal />
      </div>

      {/* Stats Cards + Calendar Toggle */}
      <div className="flex flex-row items-start gap-4 mb-4">
        {/* Stats Cards (Reminders) */}
        <div className="flex flex-1 gap-4">
          <Reminders reminders={receivedData?.data || []} />
        </div>
        {/* Calendar Toggle Button and Calendar */}
        <DashboardCalendarToggle />
      </div>

      {/* Search & Filter */}
      <div className="mb-3.5">
        <SearchFilter />
      </div>

      {/* Reminders Table */}
      <div className="mb-5">
        <ReminderTable reminders={receivedData?.data || []} />
      </div>
    </main>
  );
}
