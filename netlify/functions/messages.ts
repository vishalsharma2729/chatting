import type { Config } from "@netlify/functions";
import { asc, desc, gt } from "drizzle-orm";
import { db } from "../../db/index.js";
import { messages } from "../../db/schema.js";

export default async (req: Request) => {
  if (req.method === "GET") {
    const since = Number(new URL(req.url).searchParams.get("since") || 0);

    // First load: return the latest 50 messages; afterwards only newer ones
    if (!since) {
      const latest = await db.select().from(messages).orderBy(desc(messages.id)).limit(50);
      return Response.json(latest.reverse());
    }

    const newer = await db
      .select()
      .from(messages)
      .where(gt(messages.id, since))
      .orderBy(asc(messages.id))
      .limit(100);
    return Response.json(newer);
  }

  if (req.method === "POST") {
    const body = await req.json().catch(() => ({}));
    const name = String(body.name || "").trim().slice(0, 50);
    const text = String(body.text || "").trim().slice(0, 1000);
    if (!name || !text) {
      return Response.json({ error: "name and text are required" }, { status: 400 });
    }

    const [message] = await db.insert(messages).values({ name, text }).returning();
    return Response.json(message, { status: 201 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/messages",
};
