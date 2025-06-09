import { Calculator } from "lucide-react";
import ProjectWizard from "@/components/wizard/project-wizard";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 brand-500 rounded-lg flex items-center justify-center">
                <Calculator className="text-white h-4 w-4" />
              </div>
              <h1 className="text-xl font-semibold text-slate-900">DevEstimate Pro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">
                <i className="fas fa-history mr-2"></i>Historik
              </button>
              <button className="brand-500 hover:brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <i className="fas fa-save mr-2"></i>Gem Skabelon
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <ProjectWizard />
    </div>
  );
}
