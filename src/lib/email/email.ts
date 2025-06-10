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
  text: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  try {
    const msg = await resend.emails.send({
      from: process.env.FROM_EMAIL as string,
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
export async function sendReminderEmails() {
  try {
    const users = await db.user.findMany({
      where: {
        sendEmailReminder: true,
      },
      include: {
        reminder: {
          where: {
            reminderStatus: "UPCOMING",
            scheduledDate: {
              // Get Reminders Due Today
              equals: new Date(),
            },
          },
        },
      },
    });
    const sentEmails = Promise.allSettled(
      users.map((user) => {
        const template = reminderEmailTemplate({
          userName: user.email.split("@")[0],
          reminders: user.reminder,
        });
        return sendEmail({
          to: user.email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        });
      }),
    );
    sentEmails.catch((error) => {
      console.error("Error sending reminder email:", error);
      throw error;
    });
  } catch (error) {
    console.error("Error sending reminder email:", error);
    throw error;
  }
}

// Send daily digest email
export async function sendDailyDigestEmail() {
  try {
    const users = await db.user.findMany({
      where: {
        sendDailyDigest: true,
      },
      include: {
        reminder: {
          where: {
            // Get upcoming reminders for the next 7 days
            scheduledDate: {
              gt: new Date(),
              lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
            reminderStatus: "UPCOMING",
          },
        },
      },
    });
    const sentEmails = Promise.allSettled(
      users.map((user) => {
        const emailData = {
          userName: user.email.split("@")[0],
          todayReminders: user.reminder.map((r) => ({
            problemTitle: r.problemTitle,
            problemSlug: r.problemSlug,
            problemDifficulty: r.problemDifficulty as
              | "EASY"
              | "MEDIUM"
              | "HARD",
          })),
          upcomingReminders: user.reminder
            .filter((r) => r.reminderStatus === "UPCOMING")
            .map((r) => ({
              problemTitle: r.problemTitle,
              problemSlug: r.problemSlug,
              problemDifficulty: r.problemDifficulty,
              scheduledDate: r.scheduledDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              }),
            })),
        };
        const template = dailyDigestTemplate(emailData);
        return sendEmail({
          to: user.email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        });
      }),
    );
    sentEmails.catch((error) => {
      console.error("Error sending daily digest:", error);
      throw error;
    });
  } catch (error) {
    console.error("Error sending daily digest:", error);
    throw error;
  }
}

// Send weekly report email
export async function sendWeeklyReportEmail() {
  // Calculate week start and end dates
  const now = new Date();
  const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
  weekStart.setHours(0, 0, 0, 0);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  try {
    const users = await db.user.findMany({
      where: { sendWeeklyReport: true },
      include: {
        reminder: {
          where: {
            reminderStatus: "COMPLETED",
            scheduledDate: {
              // get all completed reminders for the week
              gte: weekStart,
              lte: weekEnd,
            },
          },
        },
      },
    });

    if (!users) {
      throw new Error("User not found");
    }

    const sentEmails = Promise.allSettled(
      users.map(async (user) => {
        // Get completed reminders for this week
        const { reminder: completedReminders } = user;
        var [easyCompleted, mediumCompleted, hardCompleted] = [0, 0, 0];
        completedReminders.forEach((r) => {
          if (r.problemDifficulty === "EASY") {
            easyCompleted++;
          } else if (r.problemDifficulty === "MEDIUM") {
            mediumCompleted++;
          } else if (r.problemDifficulty === "HARD") {
            hardCompleted++;
          }
        });
        const emailData = {
          userName: user.email.split("@")[0],
          completedProblems: completedReminders.length,
          totalReminders: user.reminder.length,
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
        return await sendEmail({
          to: user.email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        });
      }),
    );
    sentEmails.catch((error) => {
      console.error("Error sending weekly report:", error);
      throw error;
    });
  } catch (error) {
    console.error("Error sending weekly report:", error);
    throw error;
  }
}
