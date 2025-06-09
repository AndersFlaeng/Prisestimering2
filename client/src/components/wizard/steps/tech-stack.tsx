import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ProjectData } from "../project-wizard";

interface TechStackProps {
  data: ProjectData;
  updateData: (updates: Partial<ProjectData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const techOptions = {
  frontend: [
    { value: "react", label: "React.js", multiplier: 1.0 },
    { value: "vue", label: "Vue.js", multiplier: 0.9 },
    { value: "angular", label: "Angular", multiplier: 1.2 },
    { value: "svelte", label: "Svelte", multiplier: 0.8 },
  ],
  backend: [
    { value: "nodejs", label: "Node.js", multiplier: 1.0 },
    { value: "python", label: "Python/Django", multiplier: 1.1 },
    { value: "php", label: "PHP/Laravel", multiplier: 0.8 },
    { value: "java", label: "Java/Spring", multiplier: 1.3 },
  ],
  database: [
    { value: "postgresql", label: "PostgreSQL", multiplier: 1.0 },
    { value: "mysql", label: "MySQL", multiplier: 0.9 },
    { value: "mongodb", label: "MongoDB", multiplier: 1.1 },
    { value: "sqlite", label: "SQLite", multiplier: 0.7 },
  ],
  deployment: [
    { value: "cloud", label: "Cloud (AWS/GCP/Azure)", multiplier: 1.0 },
    { value: "vps", label: "VPS/Dedicated Server", multiplier: 0.8 },
    { value: "shared", label: "Shared Hosting", multiplier: 0.6 },
    { value: "docker", label: "Docker/Kubernetes", multiplier: 1.2 },
  ],
};

export default function TechStack({ data, updateData, onNext, onPrev }: TechStackProps) {
  const updateTechStack = (category: keyof typeof techOptions, value: string) => {
    updateData({
      techStack: {
        ...data.techStack,
        [category]: value,
      },
    });
  };

  return (
    <Card>
      <CardHeader className="border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              Tech Stack Selection
            </CardTitle>
            <p className="text-slate-600 mt-1">
              Choose the technologies for your project. Different choices affect development time and cost.
            </p>
          </div>
          <div className="text-sm text-slate-500">Step 3 of 5</div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(techOptions).map(([category, options]) => (
            <div key={category} className="border border-slate-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-4 capitalize">
                {category === 'frontend' && 'Frontend Framework'}
                {category === 'backend' && 'Backend Technology'}
                {category === 'database' && 'Database'}
                {category === 'deployment' && 'Deployment'}
              </h3>
              
              <RadioGroup
                value={data.techStack[category as keyof typeof data.techStack]}
                onValueChange={(value) => updateTechStack(category as keyof typeof techOptions, value)}
                className="space-y-3"
              >
                {options.map(option => (
                  <div key={option.value} className="flex items-center space-x-3">
                    <RadioGroupItem value={option.value} id={`${category}-${option.value}`} />
                    <Label 
                      htmlFor={`${category}-${option.value}`} 
                      className="flex-1 cursor-pointer"
                    >
                      <div className="flex justify-between items-center">
                        <span>{option.label}</span>
                        <span className="text-xs text-brand-600 font-medium">
                          {option.multiplier}x
                        </span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600">
            <strong>Note:</strong> The multiplier indicates how the technology choice affects development time. 
            A 1.2x multiplier means it takes 20% more time compared to the baseline technology.
          </p>
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
          <Button variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button onClick={onNext} className="brand-500 hover:brand-600">
            Continue to Complexity
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
