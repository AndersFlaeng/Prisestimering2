import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Zap, Settings, Layers } from "lucide-react";
import type { ProjectData } from "../project-wizard";

interface ComplexityProps {
  data: ProjectData;
  updateData: (updates: Partial<ProjectData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const complexityOptions = [
  {
    value: "simple",
    label: "Simple",
    icon: Zap,
    multiplier: 0.8,
    description: "Basic functionality, minimal customization, standard implementation",
    features: [
      "Standard UI components",
      "Basic database operations",
      "Simple user flows",
      "Minimal third-party integrations"
    ]
  },
  {
    value: "medium",
    label: "Medium",
    icon: Settings,
    multiplier: 1.0,
    description: "Moderate complexity, some custom features, standard + custom implementation",
    features: [
      "Custom UI components",
      "Complex business logic",
      "Multiple user roles",
      "Several API integrations"
    ]
  },
  {
    value: "complex",
    label: "Complex",
    icon: Layers,
    multiplier: 1.4,
    description: "High complexity, extensive customization, advanced implementation",
    features: [
      "Highly custom UI/UX",
      "Advanced algorithms",
      "Complex workflows",
      "Extensive integrations"
    ]
  }
];

export default function Complexity({ data, updateData, onNext, onPrev }: ComplexityProps) {
  return (
    <Card>
      <CardHeader className="border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              Project Complexity
            </CardTitle>
            <p className="text-slate-600 mt-1">
              Assess the overall complexity and customization level of your project
            </p>
          </div>
          <div className="text-sm text-slate-500">Step 4 of 5</div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <RadioGroup
          value={data.complexity}
          onValueChange={(value: "simple" | "medium" | "complex") => 
            updateData({ complexity: value })
          }
          className="space-y-6"
        >
          {complexityOptions.map(option => {
            const IconComponent = option.icon;
            return (
              <div 
                key={option.value}
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                  data.complexity === option.value 
                    ? 'border-brand-500 bg-blue-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Label htmlFor={option.value} className="cursor-pointer">
                  <div className="flex items-start space-x-4">
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          data.complexity === option.value 
                            ? 'brand-500' 
                            : 'bg-slate-100'
                        }`}>
                          <IconComponent className={`h-5 w-5 ${
                            data.complexity === option.value 
                              ? 'text-white' 
                              : 'text-slate-600'
                          }`} />
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-slate-900">{option.label}</h3>
                          <span className="text-sm text-brand-600 font-medium">
                            {option.multiplier}x multiplier
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 mb-4">{option.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {option.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-brand-500 rounded-full"></div>
                            <span className="text-sm text-slate-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Label>
              </div>
            );
          })}
        </RadioGroup>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
          <Button variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button onClick={onNext} className="brand-500 hover:brand-600">
            View Results
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
