
"use client";

import SearchFilter from "@/components/Essentials/SearchFilter";
import RemainderModal from "@components/Essentials/RemainderModal";
import RemainderTable from "@components/Essentials/RemainderTable";
import Reminders from "@components/Essentials/Reminders";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

const Page = () => {
const [isOpen, setIsOpen] = useState(false);

return (
<main className="min-h-screen flex flex-col pt-7">

{/* Header and Add Reminder Button */}
<div className="flex items-center justify-between mb-6 ">
<h1 className="text-3xl font-bold">LeetTrack Reminder Dashboard</h1>
<Button
className="cursor-pointer p-2 flex items-center gap-2"
onClick={() => setIsOpen(true)}
>
<Plus /> Add Reminder
</Button>
</div>

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


{/* Modal for Adding a Reminder */}
<RemainderModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
</main>
);
};

export default Page;