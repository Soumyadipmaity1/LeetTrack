"use client";

import { createReminder } from "@/app/(main)/dashboard/dashboard-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// https://leetcode.com/problems/(.+)
const LEETCODE_URL_MATCHER = /https:\/\/leetcode.com\/problems\/(.+)/g;

export default function AddReminderModal() {
  const [leetcodeLink, setLeetcodeLink] = useState<string>();
  const [scheduleDate, setScheduleDate] = useState<string>();
  const { execute, hasErrored, hasSucceeded, isExecuting } =
    useAction(createReminder);

  useEffect(() => {
    if (hasSucceeded) {
      toast.success("Successfully created reminder");
    }

    if (hasErrored) {
      toast.error("Error creating reminder");
    }
  }, [hasSucceeded, hasErrored]);

  return (
    <Dialog>
      <form onSubmit={(e) => e.preventDefault()}>
        <DialogTrigger asChild>
          <div className="flex items-center justify-between">
            <Button className="cursor-pointer flex items-center gap-2">
              <Plus /> Add Reminder
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Reminder</DialogTitle>
            <DialogDescription>
              Add a new reminder to your list!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="problem-link">Problem Link</Label>
              <Input
                id="problem-link"
                name="Problem Link"
                placeholder="https://leetcode.com/problems/..."
                onChange={(e) => {
                  const url = e.target.value;
                  if (!url) {
                    setLeetcodeLink(undefined);
                    return;
                  }
                  if (!url.match(LEETCODE_URL_MATCHER)) {
                    toast.error("Invalid problem link", {
                      duration: 1000,
                    });
                    return;
                  }
                  setLeetcodeLink(e.target.value);
                }}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="schedule-date">Schedule Date</Label>
              <Input
                id="schedule-date"
                name="schedule-date"
                type="date"
                onChange={(e) => setScheduleDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              disabled={!leetcodeLink || !scheduleDate}
              type="submit"
              onClick={() => {
                if (leetcodeLink && scheduleDate) {
                  execute({
                    problemLink: leetcodeLink,
                    scheduledDate: new Date(scheduleDate),
                  });
                }
              }}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
