import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  decimal,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Orders table: stores all client contracts/purchases
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  // Client personal data
  fullName: varchar("fullName", { length: 255 }).notNull(),
  cpfCnpj: varchar("cpfCnpj", { length: 20 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  companyName: varchar("companyName", { length: 255 }),
  // Plan info
  planId: varchar("planId", { length: 50 }).notNull(),
  planName: varchar("planName", { length: 100 }).notNull(),
  planPrice: decimal("planPrice", { precision: 10, scale: 2 }).notNull(),
  // Payment info
  status: mysqlEnum("status", ["pending", "paid", "cancelled", "refunded"])
    .default("pending")
    .notNull(),
  stripeSessionId: varchar("stripeSessionId", { length: 255 }),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  // Metadata
  mailboxNumber: varchar("mailboxNumber", { length: 20 }),
  roomNumber: int("roomNumber").default(0),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  paidAt: timestamp("paidAt"),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

// Helper to format room number as "Sl XX"
export function formatRoomNumber(roomNumber: number | null | undefined): string {
  if (!roomNumber) return "";
  return `Sl ${String(roomNumber).padStart(2, "0")}`;
}

// Contact requests: pre-sale inquiries
export const contactRequests = mysqlTable("contact_requests", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  message: text("message").notNull(),
  preferCall: int("preferCall").default(0).notNull(), // 0=false, 1=true
  status: mysqlEnum("status", ["new", "contacted", "resolved"])
    .default("new")
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactRequest = typeof contactRequests.$inferSelect;
export type InsertContactRequest = typeof contactRequests.$inferInsert;
