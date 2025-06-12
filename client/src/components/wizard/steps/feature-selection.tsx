import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Shield, Database, Plug, Palette, Info } from "lucide-react";
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
  authentication: {
    border: "border-[#F37870]",
    text: "text-[#F37870]",
  },
  database: {
    border: "border-[#8ACA86]",
    text: "text-[#8ACA86]",
  },
  api: {
    border: "border-[#A5D0EF]",
    text: "text-[#A5D0EF]",
  },
  ui: {
    border: "border-[#C0A5CF]",
    text: "text-[#C0A5CF]",
  },
};

export default function FeatureSelection({ data, updateData, onNext, onPrev }: FeatureSelectionProps) {
  const [customName, setCustomName] = useState("");
  const [customDescription, setCustomDescription] = useState("");

  const toggleFeature = (featureId: string) => {
    const newFeatures = data.selectedFeatures.includes(featureId)
      ? data.selectedFeatures.filter((id) => id !== featureId)
      : [...data.selectedFeatures, featureId];

    updateData({ selectedFeatures: newFeatures });
  };

  const categories = Array.from(new Set(features.map((f) => f.category)));

  return (
    <>
      {/* Tilføj denne stilblok et passende sted i din app/global CSS */}
      <style>{`
        .hover-bg-custom:hover {
          background-color: hsl(217.2, 32.6%, 23%);
        }
      `}</style>

      <Card>
        <CardHeader className="border-b text-foreground">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold text-foreground">Funktionsvalg</CardTitle>
              <p className="text-text-foreground mt-1">
                Vælg de funktioner og komponenter dit projekt har brug for
              </p>
            </div>
            <div className="text-sm text-foreground">Trin 2 af 4</div>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          {/* Bemærkningsboks i toppen */}
          <div className="flex items-start space-x-3 bg-white border border-gray-300 text-black rounded-md p-4">
            <Info className="h-6 w-6 shrink-0" />
            <p className="text-sm">
              Det er muligt at vælge flere funktioner i hvert område.
              <br />
              Bliver du forvirret over funktionerne, kan du altid hoppe videre – valg er ikke bindende
              og kan tilføjes senere i eventuelle samtaler.
            </p>
          </div>

          {categories.map((category) => {
            const categoryFeatures = features.filter((f) => f.category === category);
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
            const color = categoryColors[category as keyof typeof categoryColors];

            return (
              <div key={category} className={`border rounded-lg p-6 ${color.border}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color.text}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground capitalize">
                        {category.replace(/([A-Z])/g, " $1").trim()}
                      </h3>
                      <p className="text-sm text-foreground">
                        {category === "authentication" && "Brugerstyring og sikkerhedsfunktioner"}
                        {category === "database" && "Datastyring og lagringsløsninger"}
                        {category === "api" && "Tredjepartstjenester og API'er"}
                        {category === "ui" && "Brugerinterface og oplevelsesfeatures"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryFeatures.map((feature) => (
                    <label
                      key={feature.id}
                      className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover-bg-custom cursor-pointer transition-colors"
                    >
                      <Checkbox
                        checked={data.selectedFeatures.includes(feature.id)}
                        onCheckedChange={() => toggleFeature(feature.id)}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{feature.name}</div>
                        <div className="text-sm muted-foreground">{feature.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}

          {data.customFeatures?.length > 0 && (
            <div className="border border-slate-200 rounded-lg p-6">
              <h4 className="font-semibold mb-4 text-foreground">Egne funktioner</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.customFeatures.map((feature) => (
                  <label
                    key={feature.id}
                    className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover-bg-custom cursor-pointer transition-colors"
                  >
                    <Checkbox
                      checked={data.selectedFeatures.includes(feature.id)}
                      onCheckedChange={() => toggleFeature(feature.id)}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{feature.name}</div>
                      <div className="text-sm muted-foreground">{feature.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 border border-dashed border-slate-300 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-2 text-foreground">Tilføj egen funktion</h4>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <Label htmlFor="customName"></Label>
                <Input
                  id="customName"
                  placeholder="Funktionens navn"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="customDescription"></Label>
                <Input
                  id="customDescription"
                  placeholder="Beskrivelse"
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                />
              </div>
            </div>
            <Button
              onClick={() => {
                if (!customName.trim()) return;

                const newFeature = {
                  id: uuidv4(),
                  name: customName.trim(),
                  description: customDescription.trim(),
                };

                updateData({
                  customFeatures: [...(data.customFeatures || []), newFeature],
                  selectedFeatures: [...data.selectedFeatures, newFeature.id],
                });

                setCustomName("");
                setCustomDescription("");
              }}
            >
              Tilføj funktion
            </Button>
          </div>

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
            <Button variant="outline" onClick={onPrev}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Forrige
            </Button>

            <Button onClick={onNext} className="brand-500 hover:brand-600">
              Fortsæt til Teknologi Stack
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
