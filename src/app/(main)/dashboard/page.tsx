"use server";

import { AddReminderModal } from "@components/Essentials/ReminderDialog";
import Reminders from "@components/Essentials/Reminders";
import ReminderTable from "@components/Essentials/ReminderTable";
import { getReminders } from "./dashboard-action";

export default async function Dashboard() {
  const receivedData = await {data: []};

  

  return (
    <main className="min-h-screen flex flex-col pt-7">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">LeetTrack Reminder Dashboard</h1>
        {/* Modal for Adding a Reminder */}
        <AddReminderModal />
      </div>

      {/* Stats, Calendar, and Search/Filter */}
      <div className="mb-4">
        {/* Place your stats and calendar components here if you have them */}
        <Reminders reminders={receivedData?.data || []} />
      </div>

      {/* Search & Filter */}
      {/* <div className="mb-3.5">
        <SearchFilter />
      </div> */}

      {/* Reminders Table */}
      <div className="mb-5">
        {/* If you want to use the custom ReminderTable, replace <Reminders /> with */}
        <ReminderTable reminders={receivedData?.data || []} />
      </div>
    </main>
  );
}
