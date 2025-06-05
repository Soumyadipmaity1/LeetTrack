"use server";

import RemainderModal from "@components/Essentials/RemainderModal";
import RemainderTable from "@components/Essentials/RemainderTable";
import Reminders from "@components/Essentials/Reminders";
import { toast } from "sonner";
import { getReminders } from "./dashboard-action";

export default async function Dashboard() {
  const receivedData = await getReminders();

  if (receivedData?.serverError) {
    return toast.error("An error occurred while fetching reminders.");
  }

  if (!receivedData?.data) {
    return <>Create a new reminder!</>;
  }

  return (
    <main className="min-h-screen flex flex-col pt-7">
      {/* Modal for Adding a Reminder */}
      <RemainderModal />

      {/* Stats, Calendar, and Search/Filter */}
      <div className="mb-4">
        {/* Place your stats and calendar components here if you have them */}
        <Reminders reminders={receivedData.data} />
      </div>

      {/* Search & Filter */}
      {/* <div className="mb-3.5">
        <SearchFilter />
      </div> */}

      {/* Reminders Table */}
      <div className="mb-5">
        {/* If you want to use the custom RemainderTable, replace <Reminders /> with */}
        <RemainderTable reminders={receivedData.data} />
      </div>
    </main>
  );
}
