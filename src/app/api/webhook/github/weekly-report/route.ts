import { db } from "@/lib/db";
import { sendWeeklyReportEmail } from "@lib/email/email";

async function getAllUsersWithWeeklyReportEnabled() {
  return await db.user.findMany({
    where: {
      sendWeeklyReport: true,
    },
    select: {
      externalUserId: true,
      email: true,
    },
  });
}

export async function POST(req: Request) {
  try {
    // Verify the request is from GitHub Actions (optional security measure)
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.GITHUB_WEBHOOK_SECRET}`) {
      return new Response("Unauthorized", { status: 401 });
    }

    const users = await getAllUsersWithWeeklyReportEnabled();

    if (users.length === 0) {
      return new Response("No users with weekly report enabled", {
        status: 200,
      });
    }

    let sentCount = 0;
    let errorCount = 0;

    // Send weekly report to all users who have it enabled
    for (const user of users) {
      try {
        await sendWeeklyReportEmail(user.externalUserId);
        sentCount++;
      } catch (error) {
        console.error(`Failed to send weekly report to ${user.email}:`, error);
        errorCount++;
      }
    }

    const message = `Processed ${users.length} users. Sent: ${sentCount}, Errors: ${errorCount}`;
    console.log(message);

    return new Response(message, { status: 200 });
  } catch (error) {
    console.error("Error sending weekly reports:", error);
    return new Response("Error sending weekly reports", { status: 500 });
  }
}
