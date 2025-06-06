"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@components/ui/badge";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@components/ui/context-menu";
import { cn } from "@lib/utils";
import { PROBLEM_DIFFICULTY, Reminder, REMINDER_STATUS } from "@prisma-client";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";

export default function RemainderTable({
  reminders,
}: {
  reminders: Reminder[];
}) {
  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-bold">Your Reminders</h2>
      <p className="text-sm text-muted-foreground mb-2 font-semibold">
        Manage your scheduled LeetCode problem reminders
      </p>
      <Card>
        <CardContent className="p-1">
          <Table>
            <TableHeader className="text-base">
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-base cursor-default">
              {reminders.map((reminder, index) => (
                <CustomContextMenu key={index + Math.random()}>
                  <TableRow
                    className="cursor-pointer"
                    onClick={() => {
                      window.open(
                        `https://leetcode.com/problems/${reminder.problemSlug}`,
                        "_blank"
                      );
                    }}
                  >
                    <TableRowContent reminder={reminder} />
                  </TableRow>
                </CustomContextMenu>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function TableRowContent({ reminder }: { reminder: Reminder }) {
  const getDifficultyBadge = useCallback((level: PROBLEM_DIFFICULTY) => {
    const variant = {
      EASY: "bg-green-100 text-green-600",
      MEDIUM: "bg-yellow-100 text-yellow-600",
      HARD: "bg-red-100 text-red-600",
    } as Record<PROBLEM_DIFFICULTY, string>;
    return (
      <span
        className={`px-2 py-1 rounded-md text-xs font-medium ${variant[level]}`}
      >
        {level}
      </span>
    );
  }, []);

  const getStatusBadge = useCallback((status: keyof typeof REMINDER_STATUS) => {
    const bgStyle =
      status === "COMPLETED"
        ? "bg-green-500"
        : status === "PENDING"
        ? "bg-red-500"
        : "bg-gray-600";
    return (
      <Badge variant={"secondary"} className={cn("text-white", bgStyle)}>
        {status}
      </Badge>
    );
  }, []);

  return (
    <>
      <TableCell>
        <Link
          className="flex flex-row gap-2 font-semibold hover:underline"
          href={`https://leetcode.com/problems/${reminder.problemSlug}`}
          target="_blank"
        >
          {reminder.problemTitle}
          <SquareArrowOutUpRight size={10} className="mt-2" />
        </Link>
      </TableCell>
      <TableCell>{getDifficultyBadge(reminder.problemDifficulty)}</TableCell>
      <TableCell>
        {reminder.scheduledDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </TableCell>
      <TableCell>{getStatusBadge(reminder.reminderStatus)}</TableCell>
    </>
  );
}

function CustomContextMenu({ children }: { children: React.ReactNode }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem inset>Edit</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
