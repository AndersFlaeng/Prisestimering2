import { Check } from "lucide-react";

interface ProgressSidebarProps {
  currentStep: number;
  selectedFeaturesCount: number;
  totalCost: number;
  estimatedWeeks: number;
}

const steps = [
  { name: "Project Details", description: "Basic information" },
  { name: "Feature Selection", description: "Choose components" },
  { name: "Tech Stack", description: "Select technologies" },
  { name: "Complexity", description: "Assess difficulty" },
  { name: "Results", description: "View estimate" },
];

export default function ProgressSidebar({ 
  currentStep, 
  selectedFeaturesCount, 
  totalCost, 
  estimatedWeeks 
}: ProgressSidebarProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Project Estimation</h2>
        
        {/* Progress Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <div 
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg border ${
                  isCurrent || isCompleted 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'border-transparent'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isCompleted 
                    ? 'brand-500 text-white' 
                    : isCurrent 
                    ? 'brand-500 text-white' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div>
                  <p className={`font-medium ${
                    isCurrent || isCompleted ? 'text-brand-700' : 'text-slate-600'
                  }`}>
                    {step.name}
                  </p>
                  <p className={`text-xs ${
                    isCurrent || isCompleted ? 'text-brand-600' : 'text-slate-500'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <h3 className="font-medium text-slate-900 mb-4">Current Estimate</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Features</span>
              <span className="text-sm font-medium">{selectedFeaturesCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Timeline</span>
              <span className="text-sm font-medium">{estimatedWeeks} weeks</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="font-medium text-slate-900">Total</span>
              <span className="text-lg font-semibold text-brand-600">
                ${totalCost.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
