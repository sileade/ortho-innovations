import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Patient profile procedures
  patient: router({
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      return db.getPatientByUserId(ctx.user.id);
    }),
    
    updateProfile: protectedProcedure
      .input(z.object({
        phone: z.string().optional(),
        address: z.string().optional(),
        emergencyContactName: z.string().optional(),
        emergencyContactPhone: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return db.updatePatientProfile(ctx.user.id, input);
      }),
  }),

  // Prosthesis procedures
  prosthesis: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return db.getPatientProsthesis(ctx.user.id);
    }),
    
    getDocuments: protectedProcedure.query(async ({ ctx }) => {
      // Return mock documents for now
      return [
        { id: 1, name: "Implant Certificate", date: "Oct 15, 2024", type: "PDF" },
        { id: 2, name: "Warranty Registration", date: "Oct 16, 2024", type: "PDF" },
        { id: 3, name: "Surgical Report", date: "Oct 15, 2024", type: "PDF" },
        { id: 4, name: "Post-Op Instructions", date: "Oct 15, 2024", type: "PDF" },
      ];
    }),
  }),

  // Rehabilitation procedures
  rehabilitation: router({
    getPlan: protectedProcedure.query(async ({ ctx }) => {
      return db.getPatientRehabPlan(ctx.user.id);
    }),
    
    getPhases: protectedProcedure
      .input(z.object({ planId: z.number() }))
      .query(async ({ input }) => {
        return db.getRehabPhases(input.planId);
      }),
    
    getTodaysTasks: protectedProcedure.query(async ({ ctx }) => {
      return db.getTodaysTasks(ctx.user.id);
    }),
    
    completeTask: protectedProcedure
      .input(z.object({ taskId: z.number() }))
      .mutation(async ({ input }) => {
        return db.completeTask(input.taskId);
      }),
  }),

  // Knowledge base procedures
  knowledge: router({
    getArticles: publicProcedure
      .input(z.object({
        category: z.string().optional(),
        search: z.string().optional(),
        featured: z.boolean().optional(),
      }).optional())
      .query(async ({ input }) => {
        return db.getArticles(input);
      }),
    
    getArticle: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getArticleById(input.id);
      }),
    
    incrementViews: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return db.incrementArticleViews(input.id);
      }),
  }),

  // Service requests procedures
  service: router({
    getRequests: protectedProcedure.query(async ({ ctx }) => {
      return db.getServiceRequests(ctx.user.id);
    }),
    
    createRequest: protectedProcedure
      .input(z.object({
        type: z.enum(["adjustment", "checkup", "repair", "consultation"]),
        description: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        return db.createServiceRequest(ctx.user.id, input);
      }),
  }),

  // Appointments procedures
  appointments: router({
    getUpcoming: protectedProcedure.query(async ({ ctx }) => {
      return db.getUpcomingAppointments(ctx.user.id);
    }),
    
    getAll: protectedProcedure.query(async ({ ctx }) => {
      return db.getAllAppointments(ctx.user.id);
    }),
  }),

  // Notifications procedures
  notifications: router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
      return db.getNotifications(ctx.user.id);
    }),
    
    markAsRead: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return db.markNotificationAsRead(input.id);
      }),
    
    markAllAsRead: protectedProcedure.mutation(async ({ ctx }) => {
      return db.markAllNotificationsAsRead(ctx.user.id);
    }),
  }),

  // Achievements procedures
  achievements: router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
      return db.getAchievements(ctx.user.id);
    }),
  }),

  // Dashboard summary
  dashboard: router({
    getSummary: protectedProcedure.query(async ({ ctx }) => {
      const [patient, prosthesis, plan, todaysTasks, appointments] = await Promise.all([
        db.getPatientByUserId(ctx.user.id),
        db.getPatientProsthesis(ctx.user.id),
        db.getPatientRehabPlan(ctx.user.id),
        db.getTodaysTasks(ctx.user.id),
        db.getUpcomingAppointments(ctx.user.id),
      ]);
      
      const completedToday = todaysTasks.filter(t => t.completed).length;
      const totalToday = todaysTasks.length;
      
      return {
        patient,
        prosthesis,
        plan,
        todaysTasks,
        nextAppointment: appointments[0] || null,
        dailyProgress: totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0,
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;
