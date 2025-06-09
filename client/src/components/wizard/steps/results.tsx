import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Save, FileText, Database, Calendar, DollarSign } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { exportToPDF, exportToJSON } from "@/lib/export";
import { features } from "@/lib/estimation";
import type { ProjectData } from "../project-wizard";

interface ResultsProps {
  data: ProjectData;
  totalHours: number;
  totalCost: number;
  onPrev: () => void;
}

export default function Results({ data, totalHours, totalCost, onPrev }: ResultsProps) {
  const { toast } = useToast();

  const saveEstimate = useMutation({
    mutationFn: async () => {
      const estimate = {
        projectName: data.projectName,
        projectType: data.projectType,
        selectedFeatures: data.selectedFeatures,
        techStack: data.techStack,
        complexity: data.complexity,
        hourlyRate: data.hourlyRate,
        totalHours,
        totalCost,
      };

      return apiRequest("POST", "/api/estimates", estimate);
    },
    onSuccess: () => {
      toast({
        title: "Estimate Saved",
        description: "Your project estimate has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save estimate. Please try again.",
        variant: "destructive",
      });
    },
  });

  const selectedFeatureObjects = features.filter(f => 
    data.selectedFeatures.includes(f.id)
  );

  const estimatedWeeks = Math.ceil(totalHours / 40);

  return (
    <Card>
      <CardHeader className="border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              Projekt Estimat
            </CardTitle>
            <p className="text-slate-600 mt-1">
              Din komplette projekt estimering opdeling
            </p>
          </div>
          <div className="text-sm text-slate-500">Trin 5 af 5</div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-brand-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">
                {totalCost.toLocaleString()} kr
              </div>
              <div className="text-sm text-slate-600">Total Omkostning</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">
                {estimatedWeeks} uger
              </div>
              <div className="text-sm text-slate-600">Tidsramme</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">
                {data.selectedFeatures.length}
              </div>
              <div className="text-sm text-slate-600">Funktioner</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Database className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">
                {totalHours}t
              </div>
              <div className="text-sm text-slate-600">Total Timer</div>
            </CardContent>
          </Card>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Project Overview</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-slate-600">Project Name:</span>
                <p className="text-slate-900">{data.projectName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-600">Project Type:</span>
                <p className="text-slate-900 capitalize">{data.projectType.replace('-', ' ')}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-600">Complexity:</span>
                <Badge variant="outline" className="ml-2 capitalize">
                  {data.complexity}
                </Badge>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-600">Hourly Rate:</span>
                <p className="text-slate-900">${data.hourlyRate}/hour</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Tech Stack</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-slate-600">Frontend:</span>
                <p className="text-slate-900 capitalize">{data.techStack.frontend}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-600">Backend:</span>
                <p className="text-slate-900 capitalize">{data.techStack.backend}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-600">Database:</span>
                <p className="text-slate-900 capitalize">{data.techStack.database}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-600">Deployment:</span>
                <p className="text-slate-900 capitalize">{data.techStack.deployment}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Features */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Selected Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedFeatureObjects.map(feature => (
              <div key={feature.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-slate-900">{feature.name}</h4>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                  <span className="text-sm font-medium text-brand-600">
                    {feature.baseHours}h
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-slate-200">
          <Button variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => exportToJSON(data, totalHours, totalCost)}
            >
              <Download className="mr-2 h-4 w-4" />
              Export JSON
            </Button>
            
            <Button
              variant="outline"
              onClick={() => exportToPDF(data, totalHours, totalCost, selectedFeatureObjects)}
            >
              <FileText className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            
            <Button
              onClick={() => saveEstimate.mutate()}
              disabled={saveEstimate.isPending}
              className="brand-500 hover:brand-600"
            >
              <Save className="mr-2 h-4 w-4" />
              {saveEstimate.isPending ? 'Saving...' : 'Save Estimate'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
