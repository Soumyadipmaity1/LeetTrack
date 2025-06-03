"use client";

import { Button } from "@components/ui/button";
import { Calendar } from "@components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { useState } from "react";

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReminderModal({ isOpen, onClose }: ReminderModalProps) {
  const [formData, setFormData] = useState({
    url: "",
    notification: "",
    tags: "",
    scheduleDate: "",
  });
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reminder:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-transparent to-black/50 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-md shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-7 right-3 text-xl font-bold text-gray-600 hover:text-black cursor-pointer border border-gray-600 rounded-sm"
        >
          <X height={20} width={20} />
        </button>

        <h2 className="text-xl font-semibold mb-0.5">Add Reminder</h2>
        <p className="text-sm text-gray-500 mb-4">
          Add a new LeetCode problem to your schedule
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-base font-medium mb-1">
              Problem URL
            </label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://leetcode.com/problems/..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none "
              required
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-1">
              Notification
            </label>
            <input
              type="text"
              name="notification"
              value={formData.notification}
              onChange={handleChange}
              placeholder="e.g. Morning"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-1">Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. DP, Array"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-1">
              Schedule Date
            </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    formData.scheduleDate
                      ? "text-black"
                      : "text-muted-foreground"
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.scheduleDate
                    ? format(new Date(formData.scheduleDate), "PPP")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    formData.scheduleDate
                      ? new Date(formData.scheduleDate)
                      : undefined
                  }
                  onSelect={(date) => {
                    setFormData({
                      ...formData,
                      scheduleDate: date?.toISOString().split("T")[0] || "",
                    });
                    setOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="hover:text-gray-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Add Reminder
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
