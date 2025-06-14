import { sendDailyDigestEmail } from "@lib/email/email";

export async function POST(req: Request) {
  try {
    // Verify the request is from GitHub Actions (optional security measure)
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.GITHUB_WEBHOOK_SECRET}`) {
      return new Response("Unauthorized", { status: 401 });
    }
    await sendDailyDigestEmail();
    return new Response("Sent Daily Digest", { status: 200 });
  } catch (error) {
    console.error("Error sending daily digests:", error);
    return new Response("Error sending daily digests", { status: 500 });
  }
}
