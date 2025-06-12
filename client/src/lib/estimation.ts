import type { Feature, TechStack } from "@shared/schema";

export const features: Feature[] = [
  // Authentication Features
  {
    id: "basic-auth",
    name: "Login og Tilmelding",
    description: "Email-login og tilmelding",
    category: "authentication",
    baseHours: 12,
    complexityMultiplier: { simple: 0.8, medium: 1.0, complex: 1.2 },
  },
  {
    id: "oauth",
    name: "Login via Google m.fl.",
    description: "Login med Google, GitHub osv.",
    category: "authentication",
    baseHours: 8,
    complexityMultiplier: { simple: 0.8, medium: 1.0, complex: 1.3 },
  },
  {
    id: "two-factor",
    name: "To-Faktor Godkendelse",
    description: "Ekstra sikkerhed med 2FA",
    category: "authentication",
    baseHours: 16,
    complexityMultiplier: { simple: 1.0, medium: 1.2, complex: 1.5 },
  },
  {
    id: "rbac",
    name: "Brugerroller",
    description: "Adgangsstyring baseret på roller",
    category: "authentication",
    baseHours: 24,
    complexityMultiplier: { simple: 1.0, medium: 1.3, complex: 1.8 },
  },

  // Database Features
  {
    id: "crud",
    name: "CRUD",
    description: "Opret, læs, opdater, slet data",
    category: "database",
    baseHours: 16,
    complexityMultiplier: { simple: 0.7, medium: 1.0, complex: 1.4 },
  },
  {
    id: "search-filter",
    name: "Søgning og filtrering",
    description: "Find og sorter data",
    category: "database",
    baseHours: 12,
    complexityMultiplier: { simple: 0.8, medium: 1.0, complex: 1.5 },
  },
  {
    id: "file-upload",
    name: "Filupload",
    description: "Upload og gem filer",
    category: "database",
    baseHours: 14,
    complexityMultiplier: { simple: 0.8, medium: 1.0, complex: 1.3 },
  },
  {
    id: "analytics",
    name: "Dataanalyse",
    description: "Rapporter og indsigt",
    category: "database",
    baseHours: 32,
    complexityMultiplier: { simple: 1.0, medium: 1.3, complex: 2.0 },
  },

  // API Integration Features
  {
    id: "payment",
    name: "Betalingsintegration",
    description: "Stripe, PayPal m.fl.",
    category: "api",
    baseHours: 20,
    complexityMultiplier: { simple: 1.0, medium: 1.2, complex: 1.6 },
  },
  {
    id: "email-service",
    name: "Email-udsendelse",
    description: "SendGrid, Mailgun osv.",
    category: "api",
    baseHours: 10,
    complexityMultiplier: { simple: 0.8, medium: 1.0, complex: 1.3 },
  },
  {
    id: "social-media",
    name: "Sociale medier",
    description: "Twitter, Instagram osv.",
    category: "api",
    baseHours: 16,
    complexityMultiplier: { simple: 1.0, medium: 1.2, complex: 1.7 },
  },
  {
    id: "ai-ml",
    name: "AI / Maskinlæring",
    description: "OpenAI, AWS AI osv.",
    category: "api",
    baseHours: 30,
    complexityMultiplier: { simple: 1.0, medium: 1.5, complex: 2.2 },
  },

  // UI/UX Features
  {
    id: "responsive",
    name: "Responsivt design",
    description: "Fungerer på mobil og desktop",
    category: "ui",
    baseHours: 32,
    complexityMultiplier: { simple: 0.8, medium: 1.0, complex: 1.4 },
  },
  {
    id: "dark-mode",
    name: "Mørkt tema",
    description: "Skift mellem lyst og mørkt",
    category: "ui",
    baseHours: 12,
    complexityMultiplier: { simple: 0.7, medium: 1.0, complex: 1.3 },
  },
  {
    id: "charts",
    name: "Interaktive diagrammer",
    description: "Data vist som grafer",
    category: "ui",
    baseHours: 24,
    complexityMultiplier: { simple: 1.0, medium: 1.3, complex: 1.8 },
  },
  {
    id: "real-time",
    name: "Realtidsopdateringer",
    description: "Live opdateringer med WebSocket",
    category: "ui",
    baseHours: 18,
    complexityMultiplier: { simple: 1.0, medium: 1.4, complex: 2.0 },
  },
];


const techStackMultipliers = {
  frontend: {
    react: 1.0,
    vue: 0.9,
    angular: 1.2,
    svelte: 0.8,
  },
  backend: {
    nodejs: 1.0,
    python: 1.1,
    php: 0.8,
    java: 1.3,
  },
  database: {
    postgresql: 1.0,
    mysql: 0.9,
    mongodb: 1.1,
    sqlite: 0.7,
  },
  deployment: {
    cloud: 1.0,
    vps: 0.8,
    shared: 0.6,
    docker: 1.2,
  },
};

export function calculateTotalHours(
  selectedFeatures: string[],
  complexity: "simple" | "medium" | "complex",
  techStack: TechStack
): number {
  const selectedFeatureObjects = features.filter(f => selectedFeatures.includes(f.id));
  
  let totalHours = 0;
  
  selectedFeatureObjects.forEach(feature => {
    const complexityHours = feature.baseHours * feature.complexityMultiplier[complexity];
    totalHours += complexityHours;
  });
  
  // Apply tech stack multipliers
  const frontendMultiplier = techStackMultipliers.frontend[techStack.frontend as keyof typeof techStackMultipliers.frontend] || 1.0;
  const backendMultiplier = techStackMultipliers.backend[techStack.backend as keyof typeof techStackMultipliers.backend] || 1.0;
  const databaseMultiplier = techStackMultipliers.database[techStack.database as keyof typeof techStackMultipliers.database] || 1.0;
  const deploymentMultiplier = techStackMultipliers.deployment[techStack.deployment as keyof typeof techStackMultipliers.deployment] || 1.0;
  
  const avgMultiplier = (frontendMultiplier + backendMultiplier + databaseMultiplier + deploymentMultiplier) / 4;
  
  // Add 15% for testing and QA
  totalHours = Math.ceil(totalHours * avgMultiplier * 1.15);
  
  return totalHours;
}

export function calculateTotalCost(totalHours: number, hourlyRate: number): number {
  return totalHours * hourlyRate;
}

export function calculateCostBreakdown(
  selectedFeatures: string[],
  complexity: "simple" | "medium" | "complex",
  techStack: TechStack,
  hourlyRate: number
) {
  const selectedFeatureObjects = features.filter(f => selectedFeatures.includes(f.id));
  
  const breakdown = {
    authentication: 0,
    database: 0,
    api: 0,
    ui: 0,
    testing: 0,
    total: 0,
  };
  
  selectedFeatureObjects.forEach(feature => {
    const hours = feature.baseHours * feature.complexityMultiplier[complexity];
    const cost = hours * hourlyRate;
    
    switch (feature.category) {
      case 'authentication':
        breakdown.authentication += cost;
        break;
      case 'database':
        breakdown.database += cost;
        break;
      case 'api':
        breakdown.api += cost;
        break;
      case 'ui':
        breakdown.ui += cost;
        break;
    }
  });
  
  // Apply tech stack multiplier to all categories
  const frontendMultiplier = techStackMultipliers.frontend[techStack.frontend as keyof typeof techStackMultipliers.frontend] || 1.0;
  const backendMultiplier = techStackMultipliers.backend[techStack.backend as keyof typeof techStackMultipliers.backend] || 1.0;
  const databaseMultiplier = techStackMultipliers.database[techStack.database as keyof typeof techStackMultipliers.database] || 1.0;
  const deploymentMultiplier = techStackMultipliers.deployment[techStack.deployment as keyof typeof techStackMultipliers.deployment] || 1.0;
  
  const avgMultiplier = (frontendMultiplier + backendMultiplier + databaseMultiplier + deploymentMultiplier) / 4;
  
  Object.keys(breakdown).forEach(key => {
    if (key !== 'total' && key !== 'testing') {
      breakdown[key as keyof typeof breakdown] = Math.ceil(breakdown[key as keyof typeof breakdown] * avgMultiplier);
    }
  });
  
  // Calculate testing as 15% of development cost
  const developmentTotal = breakdown.authentication + breakdown.database + breakdown.api + breakdown.ui;
  breakdown.testing = Math.ceil(developmentTotal * 0.15);
  breakdown.total = developmentTotal + breakdown.testing;
  
  return breakdown;
}
