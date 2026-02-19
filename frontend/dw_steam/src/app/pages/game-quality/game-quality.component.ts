import { Component } from '@angular/core';
import { CostQualityChartComponent } from '../../components/charts/cost-quality/cost-quality-chart.component';
import { OverhypeChartComponent } from '../../components/charts/overhype/overhype-chart.component';
import { DevSupportChartComponent } from '../../components/charts/dev-support/dev-support-chart.component';

@Component({
  selector: 'app-game-quality',
  standalone: true,
  imports: [
    CostQualityChartComponent,
    OverhypeChartComponent,
    DevSupportChartComponent
  ],
  template: `
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-white mb-6">Game Quality & Development</h2>
      
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 h-[400px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Cost of Quality</h3>
          <p class="text-gray-400 text-sm mb-4">Investigates the correlation between a game's price tag and its user quality score.</p>
          <app-cost-quality-chart class="flex-1 min-h-0"></app-cost-quality-chart>
        </div>

        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 h-[400px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Overhype Analysis (Hall of Shame)</h3>
          <p class="text-gray-400 text-sm mb-4">Lists games that achieved high sales/ownership but suffer from low user approval ratings.</p>
          <app-overhype-chart class="flex-1 min-h-0"></app-overhype-chart>
        </div>

        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 xl:col-span-2 h-[400px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Developer Support Impact</h3>
          <p class="text-gray-400 text-sm mb-4">Shows how active developer support (updates, engagement) influences average user ratings.</p>
          <app-dev-support-chart class="flex-1 min-h-0"></app-dev-support-chart>
        </div>
      </div>
    </div>
  `
})
export class GameQualityComponent { }
