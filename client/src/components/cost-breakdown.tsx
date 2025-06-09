import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Download } from "lucide-react";
import { calculateCostBreakdown } from "@/lib/estimation";
import type { TechStack } from "@shared/schema";

interface CostBreakdownProps {
  selectedFeatures: string[];
  techStack: TechStack;
  complexity: "simple" | "medium" | "complex";
  hourlyRate: number;
}

export default function CostBreakdown({ 
  selectedFeatures, 
  techStack, 
  complexity, 
  hourlyRate 
}: CostBreakdownProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const breakdown = calculateCostBreakdown(selectedFeatures, complexity, techStack, hourlyRate);

  return (
    <div className="fixed bottom-6 right-6 w-80 hidden lg:block">
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium text-slate-900">
              Cost Breakdown
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Authentication</span>
              <span className="font-medium">
                ${breakdown.authentication.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Database</span>
              <span className="font-medium">
                ${breakdown.database.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">API Integration</span>
              <span className="font-medium">
                ${breakdown.api.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">UI/UX</span>
              <span className="font-medium">
                ${breakdown.ui.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Testing & QA</span>
              <span className="font-medium">
                ${breakdown.testing.toLocaleString()}
              </span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-brand-600">
                ${breakdown.total.toLocaleString()}
              </span>
            </div>
          </div>
          
          <Button 
            size="sm" 
            className="w-full mt-4 brand-500 hover:brand-600"
            onClick={() => {
              const data = {
                breakdown,
                timestamp: new Date().toISOString(),
              };
              const blob = new Blob([JSON.stringify(data, null, 2)], {
                type: 'application/json',
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'cost-breakdown.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Breakdown
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
