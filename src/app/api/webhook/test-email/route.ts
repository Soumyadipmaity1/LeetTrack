import { db } from "@/lib/db";
import {
  sendDailyDigestEmail,
  sendReminderEmail,
  sendUpcomingReminderEmail,
  sendWeeklyReportEmail,
} from "@lib/email/email";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { type, userId, reminderId } = await req.json();

    switch (type) {
      case "reminder":
        if (!reminderId) {
          return new Response("reminderId is required for reminder emails", {
            status: 400,
          });
        }
        const result = await sendReminderEmail(reminderId);
        return new Response(JSON.stringify({ success: true, result }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });

      case "daily-digest":
        if (!userId) {
          return new Response("userId is required for daily digest", {
            status: 400,
          });
        }
        const digestResult = await sendDailyDigestEmail(userId);
        return new Response(
          JSON.stringify({ success: true, result: digestResult }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );

      case "weekly-report":
        if (!userId) {
          return new Response("userId is required for weekly report", {
            status: 400,
          });
        }
        const reportResult = await sendWeeklyReportEmail(userId);
        return new Response(
          JSON.stringify({ success: true, result: reportResult }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );

      case "upcoming-reminder":
        if (!userId) {
          return new Response("userId is required for upcoming reminder", {
            status: 400,
          });
        }
        const upcomingResult = await sendUpcomingReminderEmail(userId);
        return new Response(
          JSON.stringify({ success: true, result: upcomingResult }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );

      default:
        return new Response(
          "Invalid email type. Use: reminder, daily-digest, weekly-report, or upcoming-reminder",
          {
            status: 400,
          },
        );
    }
  } catch (error) {
    console.error("Test email error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

// GET endpoint to list available test data
export async function GET() {
  try {
    const users = await db.user.findMany({
      select: {
        externalUserId: true,
        email: true,
      },
      take: 5,
    });

    const reminders = await db.reminder.findMany({
      select: {
        id: true,
        problemTitle: true,
        scheduledDate: true,
        user: {
          select: {
            email: true,
          },
        },
      },
      take: 5,
    });

    return new Response(
      JSON.stringify({
        message: "Available test data",
        users: users.map((u) => ({ userId: u.externalUserId, email: u.email })),
        reminders: reminders.map((r) => ({
          reminderId: r.id,
          problemTitle: r.problemTitle,
          userEmail: r.user.email,
          scheduledDate: r.scheduledDate,
        })),
        testExamples: {
          reminder: {
            method: "POST",
            body: { type: "reminder", reminderId: "reminder_id_here" },
          },
          dailyDigest: {
            method: "POST",
            body: { type: "daily-digest", userId: "user_id_here" },
          },
          weeklyReport: {
            method: "POST",
            body: { type: "weekly-report", userId: "user_id_here" },
          },
          upcomingReminder: {
            method: "POST",
            body: { type: "upcoming-reminder", userId: "user_id_here" },
          },
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error fetching test data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch test data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
