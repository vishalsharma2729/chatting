import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
  id: serial().primaryKey(),
  name: text().notNull(),
  text: text().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
