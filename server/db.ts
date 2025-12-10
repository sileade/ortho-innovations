import { eq, and, desc, sql, like, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  patients, 
  prostheses, 
  rehabilitationPlans, 
  rehabilitationPhases, 
  tasks, 
  articles, 
  serviceRequests, 
  appointments, 
  notifications, 
  achievements,
  Task
} from "../drizzle/schema";
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
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
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

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Patient queries
export async function getPatientByUserId(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(patients).where(eq(patients.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updatePatientProfile(userId: number, data: {
  phone?: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}) {
  const db = await getDb();
  if (!db) return null;
  
  const patient = await getPatientByUserId(userId);
  if (!patient) return null;
  
  await db.update(patients).set(data).where(eq(patients.id, patient.id));
  return getPatientByUserId(userId);
}

// Prosthesis queries
export async function getPatientProsthesis(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const patient = await getPatientByUserId(userId);
  if (!patient) return null;
  
  const result = await db.select().from(prostheses).where(eq(prostheses.patientId, patient.id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Rehabilitation queries
export async function getPatientRehabPlan(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const patient = await getPatientByUserId(userId);
  if (!patient) return null;
  
  const result = await db.select()
    .from(rehabilitationPlans)
    .where(and(
      eq(rehabilitationPlans.patientId, patient.id),
      eq(rehabilitationPlans.status, "active")
    ))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getRehabPhases(planId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select()
    .from(rehabilitationPhases)
    .where(eq(rehabilitationPhases.planId, planId))
    .orderBy(rehabilitationPhases.order);
}

export async function getTodaysTasks(userId: number): Promise<Task[]> {
  const db = await getDb();
  if (!db) return [];
  
  const patient = await getPatientByUserId(userId);
  if (!patient) return [];
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return db.select()
    .from(tasks)
    .where(and(
      eq(tasks.patientId, patient.id),
      sql`${tasks.scheduledDate} >= ${today}`,
      sql`${tasks.scheduledDate} < ${tomorrow}`
    ))
    .orderBy(tasks.scheduledDate);
}

export async function completeTask(taskId: number) {
  const db = await getDb();
  if (!db) return null;
  
  await db.update(tasks)
    .set({ completed: true, completedAt: new Date() })
    .where(eq(tasks.id, taskId));
  
  const result = await db.select().from(tasks).where(eq(tasks.id, taskId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Article queries
export async function getArticles(filters?: {
  category?: string;
  search?: string;
  featured?: boolean;
}) {
  const db = await getDb();
  if (!db) return [];
  
  let query = db.select().from(articles).where(eq(articles.published, true));
  
  const conditions = [eq(articles.published, true)];
  
  if (filters?.category && filters.category !== "all") {
    conditions.push(eq(articles.category, filters.category as "exercises" | "nutrition" | "recovery" | "faq"));
  }
  
  if (filters?.featured) {
    conditions.push(eq(articles.featured, true));
  }
  
  if (filters?.search) {
    conditions.push(
      or(
        like(articles.title, `%${filters.search}%`),
        like(articles.description, `%${filters.search}%`)
      )!
    );
  }
  
  return db.select()
    .from(articles)
    .where(and(...conditions))
    .orderBy(desc(articles.createdAt));
}

export async function getArticleById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function incrementArticleViews(id: number) {
  const db = await getDb();
  if (!db) return;
  
  await db.update(articles)
    .set({ views: sql`${articles.views} + 1` })
    .where(eq(articles.id, id));
}

// Service request queries
export async function getServiceRequests(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const patient = await getPatientByUserId(userId);
  if (!patient) return [];
  
  return db.select()
    .from(serviceRequests)
    .where(eq(serviceRequests.patientId, patient.id))
    .orderBy(desc(serviceRequests.createdAt));
}

export async function createServiceRequest(userId: number, data: {
  type: "adjustment" | "checkup" | "repair" | "consultation";
  description: string;
}) {
  const db = await getDb();
  if (!db) return null;
  
  const patient = await getPatientByUserId(userId);
  if (!patient) return null;
  
  const result = await db.insert(serviceRequests).values({
    patientId: patient.id,
    type: data.type,
    description: data.description,
    status: "pending",
  });
  
  return { id: result[0].insertId, ...data, status: "pending" };
}

// Appointment queries
export async function getUpcomingAppointments(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const patient = await getPatientByUserId(userId);
  if (!patient) return [];
  
  const now = new Date();
  
  return db.select()
    .from(appointments)
    .where(and(
      eq(appointments.patientId, patient.id),
      eq(appointments.status, "scheduled"),
      sql`${appointments.scheduledAt} >= ${now}`
    ))
    .orderBy(appointments.scheduledAt)
    .limit(5);
}

export async function getAllAppointments(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const patient = await getPatientByUserId(userId);
  if (!patient) return [];
  
  return db.select()
    .from(appointments)
    .where(eq(appointments.patientId, patient.id))
    .orderBy(desc(appointments.scheduledAt));
}

// Notification queries
export async function getNotifications(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(50);
}

export async function markNotificationAsRead(id: number) {
  const db = await getDb();
  if (!db) return;
  
  await db.update(notifications)
    .set({ read: true, readAt: new Date() })
    .where(eq(notifications.id, id));
}

export async function markAllNotificationsAsRead(userId: number) {
  const db = await getDb();
  if (!db) return;
  
  await db.update(notifications)
    .set({ read: true, readAt: new Date() })
    .where(and(
      eq(notifications.userId, userId),
      eq(notifications.read, false)
    ));
}

// Achievement queries
export async function getAchievements(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const patient = await getPatientByUserId(userId);
  if (!patient) return [];
  
  return db.select()
    .from(achievements)
    .where(eq(achievements.patientId, patient.id))
    .orderBy(desc(achievements.earnedAt));
}

// Admin functions for creating/updating appointments and tasks

export async function createAppointment(data: {
  patientId: number;
  title: string;
  description?: string;
  scheduledAt: Date;
  duration?: number;
  doctorName?: string;
  location?: string;
}) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(appointments).values({
    patientId: data.patientId,
    title: data.title,
    description: data.description,
    scheduledAt: data.scheduledAt,
    duration: data.duration || 60,
    doctorName: data.doctorName,
    location: data.location,
    status: "scheduled",
  });
  
  return { id: result[0].insertId, ...data, status: "scheduled" };
}

export async function updateAppointment(id: number, data: {
  title?: string;
  description?: string;
  scheduledAt?: Date;
  duration?: number;
  status?: "scheduled" | "completed" | "cancelled";
}) {
  const db = await getDb();
  if (!db) return null;
  
  const updateData: Record<string, unknown> = {};
  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.scheduledAt !== undefined) updateData.scheduledAt = data.scheduledAt;
  if (data.duration !== undefined) updateData.duration = data.duration;
  if (data.status !== undefined) updateData.status = data.status;
  
  if (Object.keys(updateData).length === 0) return null;
  
  await db.update(appointments)
    .set(updateData)
    .where(eq(appointments.id, id));
  
  return { id, ...data };
}

export async function createTask(data: {
  patientId: number;
  phaseId?: number;
  title: string;
  description?: string;
  type?: "exercise" | "therapy" | "activity" | "medication";
  duration?: string;
  scheduledDate?: Date;
}) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(tasks).values({
    patientId: data.patientId,
    phaseId: data.phaseId,
    title: data.title,
    description: data.description,
    type: data.type || "exercise",
    duration: data.duration,
    scheduledDate: data.scheduledDate,
    completed: false,
  });
  
  return { id: result[0].insertId, ...data, completed: false };
}
