"use client";

import { createReminder } from "@/app/(main)/dashboard/dashboard-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// https:\/\/leetcode\.com\/problems\/([^\/]+)
const LEETCODE_URL_MATCHER = /https:\/\/leetcode\.com\/problems\/([^\/]+)/g;

export default function AddReminderModal() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [questionTitle, setQuestionTitle] = useState<string>();
  const [scheduleDate, setScheduleDate] = useState<string>();
  const { execute, hasErrored, hasSucceeded, isExecuting } =
    useAction(createReminder);

  useEffect(() => {
    if (hasSucceeded) {
      toast.success("Successfully created reminder");
      setIsDialogOpen(false);
    }

    if (hasErrored) {
      toast.error("Error creating reminder");
    }
  }, [hasSucceeded, hasErrored]);

  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center justify-between">
          <Button
            className="cursor-pointer flex items-center gap-2"
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            <Plus /> Add Reminder
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
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
                  setQuestionTitle(undefined);
                  return;
                }
                if (!url.match(LEETCODE_URL_MATCHER)) {
                  toast.error("Invalid problem link", {
                    duration: 1000,
                  });
                  return;
                }
                setQuestionTitle(LEETCODE_URL_MATCHER.exec(url)?.[1]);
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
          <Button
            variant="outline"
            disabled={isExecuting}
            onClick={() => {
              setIsDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={!questionTitle || !scheduleDate || isExecuting}
            type="submit"
            onClick={() => {
              if (questionTitle && scheduleDate) {
                execute({
                  questionTitle: questionTitle,
                  scheduledDate: new Date(scheduleDate),
                });
              }
            }}
          >
            {!isExecuting ? "Add" : <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
