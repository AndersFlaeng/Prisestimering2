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
              Project Details
            </CardTitle>
            <p className="text-slate-600 mt-1">
              Let's start with the basic information about your project
            </p>
          </div>
          <div className="text-sm text-slate-500">Step 1 of 5</div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name *</Label>
            <Input
              id="projectName"
              placeholder="Enter your project name"
              value={data.projectName}
              onChange={(e) => updateData({ projectName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectType">Project Type *</Label>
            <Select 
              value={data.projectType} 
              onValueChange={(value) => updateData({ projectType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-app">Web Application</SelectItem>
                <SelectItem value="mobile-app">Mobile Application</SelectItem>
                <SelectItem value="api">API/Backend Service</SelectItem>
                <SelectItem value="ecommerce">E-commerce Platform</SelectItem>
                <SelectItem value="cms">Content Management System</SelectItem>
                <SelectItem value="saas">SaaS Platform</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
            <Input
              id="hourlyRate"
              type="number"
              placeholder="75"
              value={data.hourlyRate}
              onChange={(e) => updateData({ hourlyRate: Number(e.target.value) || 75 })}
            />
            <p className="text-sm text-slate-500">
              This will be used to calculate the total project cost
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-8 pt-6 border-t border-slate-200">
          <Button 
            onClick={onNext} 
            disabled={!canProceed}
            className="brand-500 hover:brand-600"
          >
            Continue to Features
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
