import { db } from "@/lib/db";
import { sendDailyDigestEmail } from "@lib/email/email";

async function getAllUsersWithDailyDigestEnabled() {
  return await db.user.findMany({
    where: {
      sendDailyDigest: true,
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

    const users = await getAllUsersWithDailyDigestEnabled();

    if (users.length === 0) {
      return new Response("No users with daily digest enabled", {
        status: 200,
      });
    }

    let sentCount = 0;
    let errorCount = 0;

    // Send daily digest to all users who have it enabled
    for (const user of users) {
      try {
        await sendDailyDigestEmail(user.externalUserId);
        sentCount++;
      } catch (error) {
        console.error(`Failed to send daily digest to ${user.email}:`, error);
        errorCount++;
      }
    }

    const message = `Processed ${users.length} users. Sent: ${sentCount}, Errors: ${errorCount}`;
    console.log(message);

    return new Response(message, { status: 200 });
  } catch (error) {
    console.error("Error sending daily digests:", error);
    return new Response("Error sending daily digests", { status: 500 });
  }
}
