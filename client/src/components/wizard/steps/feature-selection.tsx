import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Shield, Database, Plug, Palette } from "lucide-react";
import { features } from "@/lib/estimation";
import type { ProjectData } from "../project-wizard";

interface FeatureSelectionProps {
  data: ProjectData;
  updateData: (updates: Partial<ProjectData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const categoryIcons = {
  authentication: Shield,
  database: Database,
  api: Plug,
  ui: Palette,
};

const categoryColors = {
  authentication: "blue",
  database: "green", 
  api: "purple",
  ui: "pink",
};

export default function FeatureSelection({ data, updateData, onNext, onPrev }: FeatureSelectionProps) {
  const toggleFeature = (featureId: string) => {
    const newFeatures = data.selectedFeatures.includes(featureId)
      ? data.selectedFeatures.filter(id => id !== featureId)
      : [...data.selectedFeatures, featureId];
    
    updateData({ selectedFeatures: newFeatures });
  };

  const categories = Array.from(new Set(features.map(f => f.category)));

  return (
    <Card>
      <CardHeader className="border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              Feature Selection
            </CardTitle>
            <p className="text-slate-600 mt-1">
              Choose the features and components your project needs
            </p>
          </div>
          <div className="text-sm text-slate-500">Step 2 of 5</div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="space-y-8">
          {categories.map(category => {
            const categoryFeatures = features.filter(f => f.category === category);
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
            const color = categoryColors[category as keyof typeof categoryColors];
            
            const minCost = Math.min(...categoryFeatures.map(f => f.baseHours * data.hourlyRate));
            const maxCost = Math.max(...categoryFeatures.map(f => f.baseHours * data.hourlyRate));

            return (
              <div key={category} className="border border-slate-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`text-${color}-600 h-5 w-5`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {category === 'authentication' && 'User management and security features'}
                        {category === 'database' && 'Data management and storage solutions'}
                        {category === 'api' && 'Third-party services and APIs'}
                        {category === 'ui' && 'User interface and experience features'}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate-500">
                    ${minCost.toLocaleString()} - ${maxCost.toLocaleString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryFeatures.map(feature => (
                    <label 
                      key={feature.id}
                      className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <Checkbox
                        checked={data.selectedFeatures.includes(feature.id)}
                        onCheckedChange={() => toggleFeature(feature.id)}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">{feature.name}</div>
                        <div className="text-sm text-slate-600">{feature.description}</div>
                        <div className="text-xs text-brand-600 font-medium mt-1">
                          ~{feature.baseHours} hours
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
          <Button variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button onClick={onNext} className="brand-500 hover:brand-600">
            Continue to Tech Stack
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
