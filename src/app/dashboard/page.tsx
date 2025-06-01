"use client";

import RemainderModal from "@components/Essentials/RemainderModal";
import RemainderTable from "@components/Essentials/RemainderTable";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="p-5">
      <div className="flex items-center justify-between mt-8">
        <h1 className="text-3xl font-bold">LeetCode Reminder Dashboard</h1>
        <Button className="cursor-pointer p-2" onClick={() => setIsOpen(true)}>
          <Plus /> Add Reminder
        </Button>
      </div>
      <RemainderTable />
      <RemainderModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </main>
  );
};

export default Page;
