import { useState } from "react";
import ProgressSidebar from "./progress-sidebar";
import ProjectDetails from "./steps/project-details";
import FeatureSelection from "./steps/feature-selection";
import TechStack from "./steps/tech-stack";
import Complexity from "./steps/complexity";
import Results from "./steps/results";
import CostBreakdown from "../cost-breakdown";
import { calculateTotalCost, calculateTotalHours } from "@/lib/estimation";
import type { Feature, TechStack as TechStackType } from "@shared/schema";

export interface ProjectData {
  projectName: string;
  projectType: string;
  selectedFeatures: string[];
  techStack: TechStackType;
  complexity: "simple" | "medium" | "complex";
  hourlyRate: number;
}

const initialData: ProjectData = {
  projectName: "",
  projectType: "",
  selectedFeatures: [],
  techStack: {
    frontend: "react",
    backend: "nodejs",
    database: "postgresql",
    deployment: "cloud",
  },
  complexity: "medium",
  hourlyRate: 500,
};

export default function ProjectWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [projectData, setProjectData] = useState<ProjectData>(initialData);

  const totalHours = calculateTotalHours(projectData.selectedFeatures, projectData.complexity, projectData.techStack);
  const totalCost = calculateTotalCost(totalHours, projectData.hourlyRate);

  const updateProjectData = (updates: Partial<ProjectData>) => {
    setProjectData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    <ProjectDetails 
      data={projectData} 
      updateData={updateProjectData} 
      onNext={nextStep} 
    />,
    <FeatureSelection 
      data={projectData} 
      updateData={updateProjectData} 
      onNext={nextStep} 
      onPrev={prevStep} 
    />,
    <TechStack 
      data={projectData} 
      updateData={updateProjectData} 
      onNext={nextStep} 
      onPrev={prevStep} 
    />,
    <Complexity 
      data={projectData} 
      updateData={updateProjectData} 
      onNext={nextStep} 
      onPrev={prevStep} 
    />,
    <Results 
      data={projectData} 
      totalHours={totalHours}
      totalCost={totalCost}
      onPrev={prevStep} 
    />,
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <ProgressSidebar 
          currentStep={currentStep}
          selectedFeaturesCount={projectData.selectedFeatures.length}
          totalCost={totalCost}
          estimatedWeeks={Math.ceil(totalHours / 40)}
        />
        
        <div className="lg:col-span-3">
          {steps[currentStep]}
        </div>
      </div>

      <CostBreakdown 
        selectedFeatures={projectData.selectedFeatures}
        techStack={projectData.techStack}
        complexity={projectData.complexity}
        hourlyRate={projectData.hourlyRate}
      />
    </div>
  );
}
