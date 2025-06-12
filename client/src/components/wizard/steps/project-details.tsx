import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Tilføjet textarea komponent
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
            <CardTitle className="text-2xl font-semibold text-foreground">
              Projektdetaljer
            </CardTitle>
            <p className="text-text-foreground mt-1">
              Lad os starte med de grundlæggende oplysninger om dit projekt
            </p>
          </div>
          <div className="text-sm text-foreground mt-1">Trin 1 af 4</div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Projektnavn */}
          <div className="space-y-2">
            <Label htmlFor="projectName">Projektnavn/Virksomhed *</Label>
            <Input
              id="projectName"
              placeholder="Indtast dit projektnavn"
              value={data.projectName}
              onChange={(e) => updateData({ projectName: e.target.value })}
            />
          </div>

          {/* Projektbeskrivelse (stor textarea) */}
          <div className="space-y-2">
            <Label htmlFor="projectDescription">Projektbeskrivelse</Label>
            <Textarea
              id="projectDescription"
              placeholder="Beskriv dit projekt"
              value={data.projectDescription || ""}
              onChange={(e) => updateData({ projectDescription: e.target.value })}
              rows={5}
            />
          </div>

          {/* Industri som almindeligt input */}
          <div className="space-y-2">
            <Label htmlFor="industry">Industri</Label>
            <Input
              id="industry"
              placeholder="Angiv industri"
              value={data.industry || ""}
              onChange={(e) => updateData({ industry: e.target.value })}
            />
          </div>

          {/* Projekttype */}
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
                <SelectItem value="fullstack">Full Stack</SelectItem>
                <SelectItem value="andet">Andet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Team Size */}
          <div className="space-y-2">
            <Label htmlFor="teamSize">Medarbejdere</Label>
            <Input
              id="teamSize"
              placeholder="Angiv antal i teamet"
              value={data.teamSize || ""}
              onChange={(e) => updateData({ teamSize: e.target.value })}
            />
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
