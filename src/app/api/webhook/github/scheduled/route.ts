
import { db } from "@/lib/db";
import { sendReminderEmail } from "@/lib/email";

async function getUpcomingReminders() {
  // Fetch reminders that are due now (within the current hour)
  const now = new Date();
  const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

  const reminders = await db.reminder.findMany({
    where: {
      scheduledDate: {
        gte: now,
        lte: oneHourFromNow,
      },
      reminderStatus: "UPCOMING",
    },
    orderBy: {
      scheduledDate: "asc",
    },
    include: {
      user: true,
    },
  });

  return reminders;
}

export async function POST(req: Request) {
  try {
    // Verify the request is from GitHub Actions (optional security measure)
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.GITHUB_WEBHOOK_SECRET}`) {
      return new Response("Unauthorized", { status: 401 });
    }

    const reminders = await getUpcomingReminders();

    if (reminders.length === 0) {
      return new Response("No upcoming reminders found", { status: 200 });
    }

    let sentCount = 0;
    let errorCount = 0;

    // Send emails for all due reminders
    for (const reminder of reminders) {
      try {
        await sendReminderEmail(reminder.id);
        sentCount++;
      } catch (error) {
        console.error(`Failed to send reminder ${reminder.id}:`, error);
        errorCount++;
      }
    }

    const message = `Processed ${reminders.length} reminders. Sent: ${sentCount}, Errors: ${errorCount}`;
    console.log(message);

    return new Response(message, { status: 200 });
  } catch (error) {
    console.error("Error processing reminders:", error);
    return new Response("Error processing reminders", { status: 500 });
  }
}

