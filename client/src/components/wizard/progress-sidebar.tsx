import { Check } from "lucide-react";

interface ProgressSidebarProps {
  currentStep: number;
  selectedFeaturesCount: number;
  totalCost: number;
  estimatedWeeks: number;
}

const steps = [
  { name: "Projektdetaljer", description: "Grundlæggende information" },
  { name: "Funktionsvalg", description: "Vælg komponenter" },
  { name: "Teknologi Stack", description: "Vælg teknologier" },
  { name: "Kompleksitet", description: "Vurder sværhedsgrad" },
  { name: "Resultater", description: "Se estimat" },
];

export default function ProgressSidebar({ 
  currentStep, 
  selectedFeaturesCount, 
  totalCost, 
  estimatedWeeks 
}: ProgressSidebarProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sticky top-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">Projekt Estimering</h2>
        
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
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' 
                    : 'border-transparent'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isCompleted 
                    ? 'brand-500 text-white' 
                    : isCurrent 
                    ? 'brand-500 text-white' 
                    : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                }`}>
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div>
                  <p className={`font-medium ${
                    isCurrent || isCompleted ? 'text-brand-700 dark:text-brand-400' : 'text-slate-600 dark:text-slate-300'
                  }`}>
                    {step.name}
                  </p>
                  <p className={`text-xs ${
                    isCurrent || isCompleted ? 'text-brand-600 dark:text-brand-500' : 'text-slate-500 dark:text-slate-400'
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
          <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-4">Nuværende Estimat</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-300">Funktioner</span>
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{selectedFeaturesCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-300">Tidsramme</span>
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{estimatedWeeks} uger</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-600">
              <span className="font-medium text-slate-900 dark:text-slate-100">Total</span>
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
