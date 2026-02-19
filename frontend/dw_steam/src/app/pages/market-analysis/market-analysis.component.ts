import { Component } from '@angular/core';
import { BlueOceanChartComponent } from '../../components/charts/blue-ocean/blue-ocean-chart.component';
import { BattleRoyaleChartComponent } from '../../components/charts/battle-royale/battle-royale-chart.component';
import { IndieSuccessChartComponent } from '../../components/charts/indie-success/indie-success-chart.component';
import { DecadeEvolutionChartComponent } from '../../components/charts/decade-evolution/decade-evolution-chart.component';

@Component({
  selector: 'app-market-analysis',
  standalone: true,
  imports: [BlueOceanChartComponent, BattleRoyaleChartComponent, IndieSuccessChartComponent, DecadeEvolutionChartComponent],
  template: `
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-white mb-6">Market Analysis</h2>
      
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <!-- Battle Royale Lifecycle -->
        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 h-[500px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Battle Royale Lifecycle</h3>
          <p class="text-gray-400 text-sm mb-4">Tracks the rise and fall of Battle Royale genre popularity over time.</p>
          <app-battle-royale-chart class="flex-1 min-h-0"></app-battle-royale-chart>
        </div>

        <!-- Indie Success Formula -->
        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 h-[500px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Indie Success Formula</h3>
          <p class="text-gray-400 text-sm mb-4">Highlights specific game features that differ significantly between successful and failed indie games.</p>
          <app-indie-success-chart class="flex-1 min-h-0"></app-indie-success-chart>
        </div>

        <!-- Decade Evolution -->
        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 xl:col-span-2 h-[400px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Decade Evolution</h3>
          <p class="text-gray-400 text-sm mb-4">Visualizes the long-term trends in game pricing and release volume over the last 10 years.</p>
          <app-decade-evolution-chart class="flex-1 min-h-0"></app-decade-evolution-chart>
        </div>

        <!-- Blue Ocean Strategy -->
        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 xl:col-span-2 h-[500px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Blue Ocean Strategy</h3>
          <p class="text-gray-400 text-sm mb-4">Identifies high-opportunity genres with high average user ratings but low market saturation.</p>
          <app-blue-ocean-chart class="flex-1 min-h-0"></app-blue-ocean-chart>
        </div>
      </div>
    </div>
  `
})
export class MarketAnalysisComponent { }
