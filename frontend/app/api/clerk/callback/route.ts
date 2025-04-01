import { Webhook } from "svix";
import { headers } from "next/headers";
import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/prisma/prisma";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env",
    );
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

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

  const data = evt.data;
  const eventType = evt.type;

  switch (eventType) {
    case "user.created": {
      const {
        id,
        username,
        first_name,
        last_name,
        email_addresses,
        last_sign_in_at,
        image_url,
      } = data as UserJSON;

      const response = await prisma.user.create({
        data: {
          clerk_id: id,
          username,
          first_name,
          last_name,
          email: email_addresses[0].email_address,
          image: image_url,
          last_online: new Date(last_sign_in_at!).toISOString(),
        },
      });

      console.log(`User created: ${response}`);
      break;
    }
    case "user.updated":
      console.log(`User updated`);
      break;
    case "user.deleted": {
      const { id } = data as UserJSON;

      const response = await prisma.user.delete({
        where: {
          clerk_id: id,
        },
      });

      console.log(`User deleted: ${response}`);
      break;
    }
    case "session.created":
      console.log(`Session created`);
      break;
    case "session.removed":
      console.log(`Session deleted`);
      break;

    default:
      console.log(`Unhandled event type`);
  }

  return new Response("Webhook received", { status: 200 });
}
