import { db } from "@/lib/db";
import { Resend } from "resend";
import {
  dailyDigestTemplate,
  reminderEmailTemplate,
  weeklyReportTemplate,
} from "./email-templates";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  try {
    const msg = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to,
      subject,
      html,
      text,
    });
    return msg;
  } catch (err) {
    console.error("Resend sendEmail error:", err);
    throw err;
  }
}

// Send individual reminder email
export async function sendReminderEmail(reminderId: string) {
  try {
    const reminder = await db.reminder.findUnique({
      where: { id: reminderId },
      include: { user: true },
    });

    if (!reminder) {
      throw new Error("Reminder not found");
    }

    // Check if user wants email reminders
    if (!reminder.user.sendEmailReminder) {
      console.log(`User ${reminder.user.email} has disabled email reminders`);
      return null;
    }

    const emailData = {
      userName: reminder.user.email.split("@")[0], // Use email prefix as name for now
      problemTitle: reminder.problemTitle,
      problemSlug: reminder.problemSlug,
      problemDifficulty: reminder.problemDifficulty as
        | "EASY"
        | "MEDIUM"
        | "HARD",
      scheduledDate: reminder.scheduledDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const template = reminderEmailTemplate(emailData);

    const result = await sendEmail({
      to: reminder.user.email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    // Update reminder status to PENDING
    await db.reminder.update({
      where: { id: reminderId },
      data: { reminderStatus: "PENDING" },
    });

    console.log(
      `Reminder email sent to ${reminder.user.email} for problem: ${reminder.problemTitle}`,
    );
    return result;
  } catch (error) {
    console.error("Error sending reminder email:", error);
    throw error;
  }
}

// Send daily digest email
export async function sendDailyDigestEmail(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { externalUserId: userId },
      include: {
        reminder: {
          where: {
            scheduledDate: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
              lt: new Date(new Date().setHours(23, 59, 59, 999)),
            },
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if user wants daily digest
    if (!user.sendDailyDigest) {
      console.log(`User ${user.email} has disabled daily digest`);
      return null;
    }

    // Get upcoming reminders for the next 7 days
    const upcomingReminders = await db.reminder.findMany({
      where: {
        userId: user.externalUserId,
        scheduledDate: {
          gt: new Date(),
          lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: { scheduledDate: "asc" },
    });

    const emailData = {
      userName: user.email.split("@")[0],
      todayReminders: user.reminder.map((r) => ({
        problemTitle: r.problemTitle,
        problemSlug: r.problemSlug,
        problemDifficulty: r.problemDifficulty as "EASY" | "MEDIUM" | "HARD",
      })),
      upcomingReminders: upcomingReminders.map((r) => ({
        problemTitle: r.problemTitle,
        problemSlug: r.problemSlug,
        problemDifficulty: r.problemDifficulty as "EASY" | "MEDIUM" | "HARD",
        scheduledDate: r.scheduledDate.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
      })),
    };

    const template = dailyDigestTemplate(emailData);

    const result = await sendEmail({
      to: user.email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    console.log(`Daily digest sent to ${user.email}`);
    return result;
  } catch (error) {
    console.error("Error sending daily digest:", error);
    throw error;
  }
}

// Send weekly report email
export async function sendWeeklyReportEmail(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { externalUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if user wants weekly report
    if (!user.sendWeeklyReport) {
      console.log(`User ${user.email} has disabled weekly report`);
      return null;
    }

    // Calculate week start and end dates
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    // Get completed reminders for this week
    const completedReminders = await db.reminder.findMany({
      where: {
        userId: user.externalUserId,
        reminderStatus: "COMPLETED",
        updatedAt: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
    });

    // Get total reminders for this week
    const totalReminders = await db.reminder.count({
      where: {
        userId: user.externalUserId,
        scheduledDate: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
    });

    // Count by difficulty
    const easyCompleted = completedReminders.filter(
      (r) => r.problemDifficulty === "EASY",
    ).length;
    const mediumCompleted = completedReminders.filter(
      (r) => r.problemDifficulty === "MEDIUM",
    ).length;
    const hardCompleted = completedReminders.filter(
      (r) => r.problemDifficulty === "HARD",
    ).length;

    const emailData = {
      userName: user.email.split("@")[0],
      completedProblems: completedReminders.length,
      totalReminders,
      easyCompleted,
      mediumCompleted,
      hardCompleted,
      weekStartDate: weekStart.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      weekEndDate: weekEnd.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };

    const template = weeklyReportTemplate(emailData);

    const result = await sendEmail({
      to: user.email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    console.log(`Weekly report sent to ${user.email}`);
    return result;
  } catch (error) {
    console.error("Error sending weekly report:", error);
    throw error;
  }
}

// Send upcoming reminder notification (for reminders due in next 24 hours)
export async function sendUpcomingReminderEmail(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { externalUserId: userId },
    });

    if (!user || !user.sendUpcomingReminder) {
      return null;
    }

    // Get reminders due in next 24 hours
    const upcomingReminders = await db.reminder.findMany({
      where: {
        userId: user.externalUserId,
        reminderStatus: "UPCOMING",
        scheduledDate: {
          gte: new Date(),
          lte: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      },
      orderBy: { scheduledDate: "asc" },
    });

    if (upcomingReminders.length === 0) {
      return null;
    }

    const emailData = {
      userName: user.email.split("@")[0],
      todayReminders: [],
      upcomingReminders: upcomingReminders.map((r) => ({
        problemTitle: r.problemTitle,
        problemSlug: r.problemSlug,
        problemDifficulty: r.problemDifficulty as "EASY" | "MEDIUM" | "HARD",
        scheduledDate: r.scheduledDate.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      })),
    };

    const template = dailyDigestTemplate(emailData);

    const result = await sendEmail({
      to: user.email,
      subject: `🔔 ${upcomingReminders.length} reminder${upcomingReminders.length > 1 ? "s" : ""} coming up!`,
      html: template.html,
      text: template.text,
    });

    console.log(`Upcoming reminder notification sent to ${user.email}`);
    return result;
  } catch (error) {
    console.error("Error sending upcoming reminder email:", error);
    throw error;
  }
}
