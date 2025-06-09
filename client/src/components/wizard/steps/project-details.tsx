import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import type { ProjectData } from "../project-wizard";

interface ProjectDetailsProps {
  data: ProjectData;
  updateData: (updates: Partial<ProjectData>) => void;
  onNext: () => void;
}

export default function ProjectDetails({ data, updateData, onNext }: ProjectDetailsProps) {
  const canProceed = data.projectName.trim() && data.projectType;

  return (
    <Card>
      <CardHeader className="border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              Projektdetaljer
            </CardTitle>
            <p className="text-slate-600 mt-1">
              Lad os starte med de grundlæggende oplysninger om dit projekt
            </p>
          </div>
          <div className="text-sm text-slate-500">Trin 1 af 5</div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="projectName">Projektnavn *</Label>
            <Input
              id="projectName"
              placeholder="Indtast dit projektnavn"
              value={data.projectName}
              onChange={(e) => updateData({ projectName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectType">Projekttype *</Label>
            <Select 
              value={data.projectType} 
              onValueChange={(value) => updateData({ projectType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Vælg projekttype" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-app">Web Applikation</SelectItem>
                <SelectItem value="mobile-app">Mobil Applikation</SelectItem>
                <SelectItem value="api">API/Backend Service</SelectItem>
                <SelectItem value="ecommerce">E-commerce Platform</SelectItem>
                <SelectItem value="cms">Content Management System</SelectItem>
                <SelectItem value="saas">SaaS Platform</SelectItem>
                <SelectItem value="other">Andet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hourlyRate">Timeløn (DKK)</Label>
            <Input
              id="hourlyRate"
              type="number"
              placeholder="500"
              value={data.hourlyRate}
              onChange={(e) => updateData({ hourlyRate: Number(e.target.value) || 500 })}
            />
            <p className="text-sm text-slate-500">
              Dette bruges til at beregne den samlede projektomkostning
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-8 pt-6 border-t border-slate-200">
          <Button 
            onClick={onNext} 
            disabled={!canProceed}
            className="brand-500 hover:brand-600"
          >
            Fortsæt til Funktioner
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
