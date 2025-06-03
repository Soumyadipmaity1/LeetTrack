"use client";

import React, { useState } from "react";
import SearchFilter from "@/components/Essentials/SearchFilter";
import Reminders from "@components/Essentials/Reminders";
import RemainderModal from "@components/Essentials/RemainderModal";
import RemainderTable from "@components/Essentials/RemainderTable";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="p-5 min-h-screen flex flex-col items-center pt-24">
      <div className="w-full max-w-5xl">
        {/* Header and Add Reminder Button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">LeetCode Reminder Dashboard</h1>
          <Button className="cursor-pointer p-2 flex items-center gap-2" onClick={() => setIsOpen(true)}>
            <Plus /> Add Reminder
          </Button>
        </div>

        {/* Stats, Calendar, and Search/Filter */}
        <div className="mb-8">
          {/* Place your stats and calendar components here if you have them */}
        </div>

        {/* Search & Filter */}
        <div className="mb-6">
          <SearchFilter />
        </div>

        {/* Reminders Table */}
        <div className="mb-12">
          <Reminders />
          {/* If you want to use the custom RemainderTable, replace <Reminders /> with <RemainderTable /> */}
        </div>
      </div>

      {/* Modal for Adding a Reminder */}
      <RemainderModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </main>
  );
};

export default Page;
