import { type WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@lib/db";
import { headers } from "next/headers";
import { Webhook } from "svix";

function getEmail(emails: any[]) {
  const data = emails[emails.length - 1];
  if (data) {
    return data.email_address ?? "Unknown";
  }
  return "Unknown";
}

function getPhoneNumber(phone: any[]) {
  const data = phone[phone.length - 1];
  if (data) {
    return data.phone_number ?? "Unknown";
  }
  return "Unknown";
}

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const body = JSON.stringify(await req.json());

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    await db.user.create({
      data: {
        externalUserId: evt.data.id,
        profileImage: evt.data.image_url,
        username:
          evt.data.username ??
          evt.data.first_name ??
          evt.data.last_name ??
          "Unknown",
        email: getEmail(evt.data.email_addresses),
        phoneNumber: getPhoneNumber(evt.data.phone_numbers),
        createdAt: new Date(evt.data.created_at),
      },
    });
  }

  if (eventType === "user.deleted") {
    const { id: userId } = evt.data;
    await db.user.delete({
      where: {
        externalUserId: userId,
      },
    });
  }

  if (eventType === "user.updated") {
    await db.user.update({
      where: {
        externalUserId: evt.data.id,
      },
      data: {
        profileImage: evt.data.image_url,
        username:
          evt.data.username ??
          evt.data.first_name ??
          evt.data.last_name ??
          "Unknown",
        email: getEmail(evt.data.email_addresses),
        phoneNumber: getPhoneNumber(evt.data.phone_numbers),
      },
    });
  }

  return new Response("Webhook received", { status: 200 });
}
