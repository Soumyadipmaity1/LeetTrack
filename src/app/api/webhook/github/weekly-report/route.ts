import { sendWeeklyReportEmail } from "@lib/email/email";

export async function POST(req: Request) {
  try {
    // Verify the request is from GitHub Actions (optional security measure)
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CUSTOM_RESEND_WEBHOOK_SECRET}`) {
      return new Response("Unauthorized", { status: 401 });
    }
    await sendWeeklyReportEmail();
    return new Response("Sent Weekly Report", { status: 200 });
  } catch (error) {
    console.error("Error sending weekly reports:", error);
    return new Response("Error sending weekly reports", { status: 500 });
  }
}
