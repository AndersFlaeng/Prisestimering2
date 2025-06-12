import { pgTable, text, serial, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const estimates = pgTable("estimates", {
  id: serial("id").primaryKey(),
  projectName: text("project_name").notNull(),
  projectType: text("project_type").notNull(),
  selectedFeatures: jsonb("selected_features").notNull(),
  techStack: jsonb("tech_stack").notNull(),
  complexity: text("complexity").notNull(),
  hourlyRate: integer("hourly_rate").notNull(),
  totalHours: integer("total_hours").notNull(),
  totalCost: integer("total_cost").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEstimateSchema = createInsertSchema(estimates).omit({
  id: true,
  createdAt: true,
});

export type InsertEstimate = z.infer<typeof insertEstimateSchema>;
export type Estimate = typeof estimates.$inferSelect;

// Feature definitions
export const featureSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  baseHours: z.number(),
  complexityMultiplier: z.record(z.number()),
});

export const techStackSchema = z.object({
  frontend: z.string(),
  backend: z.string(),
  database: z.string(),
  deployment: z.string(),
});

export type Feature = z.infer<typeof featureSchema>;
export type TechStack = z.infer<typeof techStackSchema>;
