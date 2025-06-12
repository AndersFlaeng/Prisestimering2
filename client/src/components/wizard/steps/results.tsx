import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, FileText, Database, Calendar, Coins } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { features } from "@/lib/estimation";
import type { ProjectData } from "../project-wizard";

const techOptions = {
  frontend: [
    { value: "angular", label: "Angular", icon: "https://cdn.simpleicons.org/angular/ef3e36" },
    { value: "react", label: "React", icon: "https://cdn.simpleicons.org/react/61dafb" },
    { value: "javascript", label: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/f7df1e" },
    { value: "vue", label: "Vue.js", icon: "https://cdn.simpleicons.org/vuedotjs/42b883" },
    { value: "typescript", label: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178c6" },
    { value: "svelte", label: "Svelte", icon: "https://cdn.simpleicons.org/svelte/ff3e00" },
    { value: "css", label: "CSS", icon: "https://cdn.simpleicons.org/css/0000ff" },
    { value: "html", label: "HTML", icon: "https://cdn.simpleicons.org/html5/e34f26" },
    { value: "php", label: "PHP", icon: "https://cdn.simpleicons.org/php/777bb4" },
    { value: "andet", label: "Andet" },
  ],
  backend: [
    { value: ".net", label: ".NET", icon: "https://cdn.simpleicons.org/dotnet/512bd4" },
    { value: "c#", label: "C#", icon: "https://cdn.simpleicons.org/cplusplus/00599C" },
    { value: "java", label: "Java", icon: "https://cdn.simpleicons.org/coffeescript/2F2625" },
    { value: "typescript", label: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178c6" },
    { value: "kotlin", label: "Kotlin", icon: "https://cdn.simpleicons.org/kotlin/7f52ff" },
    { value: "sql", label: "SQL", icon: "https://cdn.simpleicons.org/mysql/4479a1" },
    { value: "graphql", label: "GraphQL", icon: "https://cdn.simpleicons.org/graphql/e10098" },
    { value: "restapi", label: "REST API", icon: "https://cdn.simpleicons.org/icloud/3693F3" },
    { value: "python", label: "Python", icon: "https://cdn.simpleicons.org/python/3776ab" },
    { value: "andet", label: "Andet" },
  ],
  database: [
    { value: "sql", label: "SQL", icon: "https://cdn.simpleicons.org/mysql/4479a1" },
    { value: "mongodb", label: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47a248" },
    { value: "andet", label: "Andet" },
  ],
  deployment: [
    { value: "docker", label: "Docker" },
    { value: "aws", label: "AWS" },
    { value: "azure", label: "Azure"},
    { value: "vercel", label: "Vercel"},
  ],
};

function getTechIcon(category: keyof typeof techOptions, value: string): string | null {
  const found = techOptions[category].find((opt) => opt.value === value.toLowerCase());
  return found ? found.icon : null;
}

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
        teamSize: data.teamSize,
        projectDescription: data.projectDescription,
        industry: data.industry,
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

  const estimatedWeeks = Math.ceil((totalHours || 0) / 40);
  const safeTotalCost = typeof totalCost === "number" ? totalCost : 0;
  const safeTotalHours = typeof totalHours === "number" ? totalHours : 0;

  return (
    <Card>
      <CardHeader className="border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-white">
              Projekt Estimat
            </CardTitle>
            <p className="text-white mt-1">
              Din komplette projekt estimering opdeling
            </p>
          </div>
          <div className="text-sm text-foreground">Trin 4 af 4</div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Coins
                className="h-8 w-8 mx-auto mb-2"
                style={{ color: "#F37870" }}
              />
              <div className="text-2xl font-bold text-white">
                {safeTotalCost.toLocaleString()} kr
              </div>
              <div className="text-sm text-white/70">Total Omkostning</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Calendar
                className="h-8 w-8 mx-auto mb-2"
                style={{ color: "#8ACA86" }}
              />
              <div className="text-2xl font-bold text-white">
                {estimatedWeeks} uger
              </div>
              <div className="text-sm text-white/70">Tidsramme</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <FileText
                className="h-8 w-8 mx-auto mb-2"
                style={{ color: "#A5D0EF" }}
              />
              <div className="text-2xl font-bold text-white">
                {data.selectedFeatures.length || 0}
              </div>
              <div className="text-sm text-white/70">Funktioner</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Database
                className="h-8 w-8 mx-auto mb-2"
                style={{ color: "#C0A5CF" }}
              />
              <div className="text-2xl font-bold text-white">
                {safeTotalHours}t
              </div>
              <div className="text-sm text-white/70">Total Timer</div>
            </CardContent>
          </Card>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Projekt Oversigt</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-white/70">Projektnavn:</span>
                <p className="text-white">{data.projectName}</p>
              </div>
               <div>
                <span className="text-sm font-medium text-white/70">Projektbeskrivelse:</span>
                <p className="text-white whitespace-pre-line">{data.projectDescription || "Ikke angivet"}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-white/70">Industri:</span>
                <p className="text-white">{data.industry || "Ikke angivet"}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-white/70">Projekttype:</span>
                <p className="text-white capitalize">{data.projectType.replace('-', ' ')}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-white/70">Medarbejdere / Team Size:</span>
                <p className="text-white">{data.teamSize || 'Ikke angivet'}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Teknologi Stack</h3>
            <div className="space-y-3">
              {(Object.keys(data.techStack) as (keyof typeof techOptions)[]).map((category) => {
                const value = data.techStack[category];
                const icon = getTechIcon(category, value);
                const label =
                  techOptions[category].find((opt) => opt.value === value.toLowerCase())?.label || value;

                let displayCategory = "";
                switch (category) {
                  case "frontend":
                    displayCategory = "Frontend";
                    break;
                  case "backend":
                    displayCategory = "Backend";
                    break;
                  case "database":
                    displayCategory = "Database";
                    break;
                  case "deployment":
                    displayCategory = "Deployment";
                    break;
                }

                return (
                  <div key={category} className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-white/70 w-28">{displayCategory}:</span>
                    {icon && (
                      <img
                        src={icon}
                        alt={label}
                        className="w-6 h-6 object-contain rounded-sm"
                      />
                    )}
                    <span className="text-white capitalize">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Features */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Valgte Funktioner</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedFeatureObjects.map((feature) => (
              <div key={feature.id} className="border border-white rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-white">{feature.name}</h4>
                    <p className="text-sm text-white/70">{feature.description}</p>
                  </div>
                  <span className="text-sm font-medium text-white">
                    {feature.baseHours}t
                  </span>
                </div>
              </div>
            ))}

            {data.customFeatures?.map((feature, index) => (
              <div key={`custom-${index}`} className="border border-white rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-white">{feature.name}</h4>
                    <p className="text-sm text-white/70">
                      {feature.description || "Ingen beskrivelse angivet"}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-white">
                    {feature.baseHours}t
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bemærk boks */}
<div className="mt-6 p-4 bg-white rounded-md shadow-md text-gray-900">
  <h4 className="font-semibold mb-2">Bemærk</h4>
  <p className="text-sm">
     Husk at disse estimater er vejledende og kan variere afhængig af projektets kompleksitet og andre faktorer.<br />
    Dine valg her er ikke bindende, men fungerer kun som en hjælp for både jer og os.
  </p>
</div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-white/30">
          <Button
            variant="outline"
            onClick={onPrev}
            className="text-white border-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4 text-white" />
            Forrige
          </Button>

          <Button
            onClick={() => saveEstimate.mutate()}
            disabled={saveEstimate.isLoading}
            className="text-white bg-[#F7A55A] hover:bg-[#d68a3a]"
          >
            {saveEstimate.isLoading ? (
              "Indsender..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Indsend Projekt
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
