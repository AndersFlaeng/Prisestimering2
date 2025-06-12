import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ProjectData } from "../project-wizard";

interface TechStackProps {
  data: ProjectData;
  updateData: (updates: Partial<ProjectData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const techOptions = {
  frontend: [
    { value: "angular", label: "Angular", icon: "https://cdn.simpleicons.org/angular/ef3e36" },
    { value: "react", label: "React", icon: "https://cdn.simpleicons.org/react/61dafb" },
    { value: "javascript", label: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/f7df1e" },
    { value: "vue", label: "Vue.js", icon: "https://cdn.simpleicons.org/vuedotjs/42b883" },
    { value: "typescript", label: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178c6" },
    { value: "svelte", label: "Svelte", icon: "https://cdn.simpleicons.org/svelte/ff3e00" },
    { value: "css", label: "CSS", icon: "https://cdn.simpleicons.org/css/0000ff"},
    { value: "html", label: "HTML", icon: "https://cdn.simpleicons.org/html5/e34f26" },
    { value: "php", label: "PHP", icon: "https://cdn.simpleicons.org/php/777bb4" },
    { value: "andet", label: "Andet" },
  ],
  backend: [
    { value: ".net", label: ".NET", icon: "https://cdn.simpleicons.org/dotnet/512bd4" },
    { value: "c#", label: "C#", icon: "https://cdn.simpleicons.org/cplusplus/00599C"},
    { value: "java", label: "Java", icon: "https://cdn.simpleicons.org/coffeescript/2F2625"},
    { value: "typescript", label: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178c6" },
    { value: "kotlin", label: "Kotlin", icon: "https://cdn.simpleicons.org/kotlin/7f52ff" },
    { value: "sql", label: "SQL", icon: "https://cdn.simpleicons.org/mysql/4479a1" },
    { value: "graphql", label: "GraphQL", icon: "https://cdn.simpleicons.org/graphql/e10098" },
    { value: "restapi", label: "REST API", icon: "https://cdn.simpleicons.org/icloud/3693F3"},
    { value: "python", label: "Python", icon: "https://cdn.simpleicons.org/python/3776ab" },
    { value: "andet", label: "Andet"},
  ],
  database: [
    { value: "sql", label: "SQL", icon: "https://cdn.simpleicons.org/mysql/4479a1" },
    { value: "mongodb", label: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47a248" },
    { value: "andet", label: "Andet" },
  ],
  deployment: [
    { value: "cloud", label: "Cloud (AWS/GCP/Azure)"},
    { value: "vps", label: "VPS/Dedicated Server" },

    { value: "shared", label: "Shared Hosting"},
    { value: "docker", label: "Docker/Kubernetes" },
    { value: "andet", label: "Andet"},
  ],
};

export default function TechStack({ data, updateData, onNext, onPrev }: TechStackProps) {
  const updateTechStack = (category: keyof typeof techOptions, value: string) => {
    updateData({
      techStack: {
        ...data.techStack,
        [category]: value,
      },
    });
  };

  return (
    <Card>
      <CardHeader className="border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-foreground">
              Teknologi Stack Valg
            </CardTitle>
            <p className="text-foreground mt-1">
              Vælg teknologierne til dit projekt. Forskellige valg påvirker udviklingstid og omkostninger.
            </p>
          </div>
          <div className="text-sm text-foreground">Trin 3 af 4</div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(techOptions).map(([category, options]) => (
            <div key={category} className="border border-slate-200 rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4 capitalize">
                {category === 'frontend' && 'Frontend Framework'}
                {category === 'backend' && 'Backend Teknologi'}
                {category === 'database' && 'Database'}
                {category === 'deployment' && 'Deployment'}
              </h3>
              
              <RadioGroup
                value={data.techStack[category as keyof typeof data.techStack]}
                onValueChange={(value) => updateTechStack(category as keyof typeof techOptions, value)}
                className="space-y-3"
              >
                {options.map(option => (
                  <div key={option.value} className="flex items-center space-x-3">
                    <RadioGroupItem value={option.value} id={`${category}-${option.value}`} />
                    <Label htmlFor={`${category}-${option.value}`} className="flex items-center space-x-3 flex-1 cursor-pointer">
                      {option.icon && (
                        <img src={option.icon} alt={option.label} className="w-5 h-5" />
                      )}
                      <span>{option.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
          <Button variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Forrige
          </Button>
          
          <Button onClick={onNext} className="brand-500 hover:brand-600">
            Fortsæt til oversigt
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
