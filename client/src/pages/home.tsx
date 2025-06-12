import ProjectWizard from "@/components/wizard/project-wizard";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
<div className="w-16 h-16 flex items-center justify-center overflow-hidden">
  <img 
    src="https://framerusercontent.com/assets/yUkK5egE7b94WICNQRrxrBteBA.webp" 
    alt="Better Developers Logo" 
    className="h-16 w-16 object-contain" 
  />
</div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Better Developers
              </h1>
            </div>
            <div className="flex items-center space-x-4">
<button
  style={{ backgroundColor: '#F7A55A' }}
  className="text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
>
  <i className="fas fa-save mr-2"></i>Til hjemmesiden
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
