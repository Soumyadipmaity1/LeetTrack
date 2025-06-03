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
import { MoreHorizontal, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

type Reminder = {
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  date: string;
  time: string;
  status: string;
  notification: string;
};

export default function RemainderTable() {
  const reminders: Reminder[] = [
    {
      question: "Two Sum",
      difficulty: "Easy",
      date: "28/12/2024",
      time: "09:00",
      status: "Pending",
      notification: "Email",
    },
    {
      question: "Add Two Numbers",
      difficulty: "Medium",
      date: "29/12/2024",
      time: "10:30",
      status: "Completed",
      notification: "Both",
    },
    {
      question: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      date: "30/12/2024",
      time: "14:00",
      status: "Pending",
      notification: "Push",
    },
  ];

  const getDifficultyBadge = (level: "Easy" | "Medium" | "Hard") => {
    const variant = {
      Easy: "bg-green-100 text-green-600",
      Medium: "bg-yellow-100 text-yellow-600",
      Hard: "bg-red-100 text-red-600",
    }[level];
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium ${variant}`}>
        {level}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const color =
      status === "Completed"
        ? "bg-gray-200 text-gray-800"
        : "bg-black text-white";
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="mt-5">
      <h2 className="text-2xl font-bold mb-0.5">Your Reminders</h2>
      <p className="text-muted-foreground font-semibold text-md mb-4.5">
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
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notification</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-base">
              {reminders.map((reminder, index) => (
                <TableRow key={index}>
                  <TableCell className="flex flex-row gap-2 mt-2 font-semibold">
                    {reminder.question}
                    <Link href="#">
                      <SquareArrowOutUpRight size={10} className="mt-1.5" />
                    </Link>
                  </TableCell>
                  <TableCell>
                    {getDifficultyBadge(reminder.difficulty)}
                  </TableCell>
                  <TableCell>{reminder.date}</TableCell>
                  <TableCell>{reminder.time}</TableCell>
                  <TableCell>{getStatusBadge(reminder.status)}</TableCell>
                  <TableCell>{reminder.notification}</TableCell>
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
