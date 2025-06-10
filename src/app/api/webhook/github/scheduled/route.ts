import { sendReminderEmails } from "@lib/email/email";

export async function POST(req: Request) {
  try {
    // Verify the request is from GitHub Actions (optional security measure)
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.GITHUB_WEBHOOK_SECRET}`) {
      return new Response("Unauthorized", { status: 401 });
    }
    await sendReminderEmails();
    return new Response("Sent Scheduled Reminders", { status: 200 });
  } catch (error) {
    console.error("Error processing reminders:", error);
    return new Response("Error processing reminders", { status: 500 });
  }
}
