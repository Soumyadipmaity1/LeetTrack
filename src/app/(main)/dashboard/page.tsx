"use client";

import SearchFilter from "@/components/Essentials/SearchFilter";
import RemainderModal from "@components/Essentials/RemainderModal";
import RemainderTable from "@components/Essentials/RemainderTable";
import Reminders from "@components/Essentials/Reminders";
import { useState } from "react";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col pt-7">
      {/* Modal for Adding a Reminder */}
      <RemainderModal />

      {/* Stats, Calendar, and Search/Filter */}
      <div className="mb-4">
        {/* Place your stats and calendar components here if you have them */}
        <Reminders />
      </div>

      {/* Search & Filter */}
      <div className="mb-3.5">
        <SearchFilter />
      </div>

      {/* Reminders Table */}
      <div className="mb-5">
        {/* If you want to use the custom RemainderTable, replace <Reminders /> with */}
        <RemainderTable />
      </div>
    </main>
  );
};

export default Page;
