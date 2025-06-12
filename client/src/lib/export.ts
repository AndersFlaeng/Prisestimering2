import type { ProjectData } from "@/components/wizard/project-wizard";
import type { Feature } from "@shared/schema";

export function exportToJSON(data: ProjectData, totalHours: number, totalCost: number) {
  const exportData = {
    projectName: data.projectName,
    projectType: data.projectType,
    selectedFeatures: data.selectedFeatures,
    techStack: data.techStack,
    complexity: data.complexity,
    hourlyRate: data.hourlyRate,
    totalHours,
    totalCost,
    estimatedWeeks: Math.ceil(totalHours / 40),
    generatedAt: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json',
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.projectName.replace(/\s+/g, '-').toLowerCase()}-estimate.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportToPDF(
  data: ProjectData, 
  totalHours: number, 
  totalCost: number, 
  selectedFeatures: Feature[]
) {
  // Create a simple HTML document for PDF generation
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Project Estimate - ${data.projectName}</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
            .header { text-align: center; border-bottom: 2px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px; }
            .section { margin-bottom: 30px; }
            .section h2 { color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .feature { border: 1px solid #e5e7eb; padding: 15px; margin-bottom: 10px; border-radius: 5px; }
            .cost-summary { background: #f8fafc; padding: 20px; border-radius: 5px; text-align: center; }
            .total { font-size: 24px; font-weight: bold; color: #3b82f6; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Project Estimate</h1>
            <h2>${data.projectName}</h2>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="cost-summary">
            <div class="total">$${totalCost.toLocaleString()}</div>
            <p>${totalHours} hours • ${Math.ceil(totalHours / 40)} weeks</p>
        </div>

        <div class="section">
            <h2>Project Overview</h2>
            <div class="grid">
                <div>
                    <strong>Project Type:</strong> ${data.projectType.replace('-', ' ')}<br>
                    <strong>Complexity:</strong> ${data.complexity}<br>
                    <strong>Hourly Rate:</strong> $${data.hourlyRate}/hour
                </div>
                <div>
                    <strong>Frontend:</strong> ${data.techStack.frontend}<br>
                    <strong>Backend:</strong> ${data.techStack.backend}<br>
                    <strong>Database:</strong> ${data.techStack.database}<br>
                    <strong>Deployment:</strong> ${data.techStack.deployment}
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Selected Features (${selectedFeatures.length})</h2>
            ${selectedFeatures.map(feature => `
                <div class="feature">
                    <strong>${feature.name}</strong> - ${feature.baseHours} hours<br>
                    <small>${feature.description}</small>
                </div>
            `).join('')}
        </div>

        <div class="section">
            <h2>Cost Breakdown</h2>
            <p><strong>Development:</strong> ${totalHours - Math.ceil(totalHours * 0.15)} hours</p>
            <p><strong>Testing & QA:</strong> ${Math.ceil(totalHours * 0.15)} hours</p>
            <p><strong>Total:</strong> ${totalHours} hours = $${totalCost.toLocaleString()}</p>
        </div>
    </body>
    </html>
  `;

  // Create a new window and print
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  }
}
