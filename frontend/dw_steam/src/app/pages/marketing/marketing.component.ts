import { Component } from '@angular/core';
import { VisualAssetsChartComponent } from '../../components/charts/visual-assets/visual-assets-chart.component';
import { CopywritingSeoChartComponent } from '../../components/charts/copywriting-seo/copywriting-seo-chart.component';
import { MultiPlatformChartComponent } from '../../components/charts/multi-platform/multi-platform-chart.component';
import { AccessibilityChartComponent } from '../../components/charts/accessibility/accessibility-chart.component';

@Component({
  selector: 'app-marketing',
  standalone: true,
  imports: [
    VisualAssetsChartComponent,
    CopywritingSeoChartComponent,
    MultiPlatformChartComponent,
    AccessibilityChartComponent
  ],
  template: `
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-white mb-6">Marketing & Accessibility</h2>
      
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 h-[400px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Visual Assets Impact</h3>
          <p class="text-gray-400 text-sm mb-4">Analyzes how the quantity of screenshots and trailers correlates with user engagement and sales.</p>
          <app-visual-assets-chart class="flex-1 min-h-0"></app-visual-assets-chart>
        </div>

        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 h-[400px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Copywriting & SEO</h3>
          <p class="text-gray-400 text-sm mb-4">Examines the impact of store description length and keyword usage on game visibility.</p>
          <app-copywriting-seo-chart class="flex-1 min-h-0"></app-copywriting-seo-chart>
        </div>

        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 h-[400px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Multi-Platform Effect</h3>
          <p class="text-gray-400 text-sm mb-4">Compares the success rates of platform-exclusive games versus multi-platform releases.</p>
          <app-multi-platform-chart class="flex-1 min-h-0"></app-multi-platform-chart>
        </div>

        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 h-[400px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Accessibility & Hardware</h3>
          <p class="text-gray-400 text-sm mb-4">Breakdown of games supporting VR headsets and various controller types.</p>
          <app-accessibility-chart class="flex-1 min-h-0"></app-accessibility-chart>
        </div>
      </div>
    </div>
  `
})
export class MarketingComponent { }
