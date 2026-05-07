import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, orders, contactRequests, InsertOrder, InsertContactRequest } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }

  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// --- Orders ---

/**
 * Get the next sequential room number (Sl 01, Sl 02, etc)
 * Returns the next available room number based on the highest paid order
 * 
 * Note: In production with high concurrency, consider:
 * 1. Using a dedicated sequence table with AUTO_INCREMENT
 * 2. Implementing database-level locking (SELECT ... FOR UPDATE)
 * 3. Using Stripe metadata to store assigned room numbers
 */
export async function getNextRoomNumber(): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    // Get the highest room number currently in use among paid orders
    const result = await db
      .select({ maxRoom: sql<number>`MAX(roomNumber)` })
      .from(orders)
      .where(eq(orders.status, "paid"));
    
    const maxRoom = result[0]?.maxRoom || 0;
    const nextRoom = maxRoom + 1;
    
    console.log(`[Database] Next room number: ${nextRoom} (max: ${maxRoom})`);
    return nextRoom;
  } catch (error) {
    console.error("[Database] Error getting next room number:", error);
    throw error;
  }
}

export async function createOrder(data: InsertOrder) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(orders).values(data).$returningId();
  return result;
}

export async function getOrderByStripeSession(sessionId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.stripeSessionId, sessionId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getOrderById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateOrderStatus(
  stripeSessionId: string,
  status: "paid" | "cancelled" | "refunded",
  extra?: { stripePaymentIntentId?: string; paymentMethod?: string; paidAt?: Date }
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(orders)
    .set({
      status,
      ...(extra?.stripePaymentIntentId ? { stripePaymentIntentId: extra.stripePaymentIntentId } : {}),
      ...(extra?.paymentMethod ? { paymentMethod: extra.paymentMethod } : {}),
      ...(extra?.paidAt ? { paidAt: extra.paidAt } : {}),
    })
    .where(eq(orders.stripeSessionId, stripeSessionId));
}

// --- Contact Requests ---

export async function createContactRequest(data: InsertContactRequest) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(contactRequests).values(data).$returningId();
  return result;
}
