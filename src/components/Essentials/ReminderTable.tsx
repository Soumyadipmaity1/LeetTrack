import { Button } from "@/components/ui/button";
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
import { cn } from "@lib/utils";
import { PROBLEM_DIFFICULTY, Reminder, REMINDER_STATUS } from "@prisma-client";
import { MoreHorizontal, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export default function RemainderTable({
  reminders,
}: {
  reminders: Reminder[];
}) {
  const getDifficultyBadge = (level: PROBLEM_DIFFICULTY) => {
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
  };

  const getStatusBadge = (status: keyof typeof REMINDER_STATUS) => {
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
  };

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
                {/* <TableHead>Time</TableHead> */}
                <TableHead>Status</TableHead>
                {/* <TableHead>Notification</TableHead> */}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-base cursor-default">
              {reminders.map((reminder, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Link
                      className="flex flex-row gap-2 font-semibold hover:underline"
                      href={`https://leetcode.com/problems/${reminder.problemName}`}
                      target="_blank"
                    >
                      {reminder.problemName}
                      <SquareArrowOutUpRight size={10} className="mt-2" />
                    </Link>
                  </TableCell>
                  <TableCell>
                    {getDifficultyBadge(reminder.problemDifficulty)}
                  </TableCell>
                  <TableCell>
                    {reminder.scheduledDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  {/* <TableCell>{reminder.time}</TableCell> */}
                  <TableCell>
                    {getStatusBadge(reminder.reminderStatus)}
                  </TableCell>
                  {/* <TableCell>{reminder.notification}</TableCell> */}
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
