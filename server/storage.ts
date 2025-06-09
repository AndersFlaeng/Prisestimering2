import { estimates, type Estimate, type InsertEstimate } from "@shared/schema";

export interface IStorage {
  getEstimate(id: number): Promise<Estimate | undefined>;
  createEstimate(estimate: InsertEstimate): Promise<Estimate>;
  getAllEstimates(): Promise<Estimate[]>;
}

export class MemStorage implements IStorage {
  private estimates: Map<number, Estimate>;
  private currentId: number;

  constructor() {
    this.estimates = new Map();
    this.currentId = 1;
  }

  async getEstimate(id: number): Promise<Estimate | undefined> {
    return this.estimates.get(id);
  }

  async createEstimate(insertEstimate: InsertEstimate): Promise<Estimate> {
    const id = this.currentId++;
    const estimate: Estimate = {
      ...insertEstimate,
      id,
      createdAt: new Date(),
    };
    this.estimates.set(id, estimate);
    return estimate;
  }

  async getAllEstimates(): Promise<Estimate[]> {
    return Array.from(this.estimates.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
