import { Component } from '@angular/core';
import { PriceElasticityChartComponent } from '../../components/charts/price-elasticity/price-elasticity-chart.component';
import { F2PPremiumChartComponent } from '../../components/charts/f2p-premium/f2p-premium-chart.component';
import { PublisherSuccessChartComponent } from '../../components/charts/publisher-success/publisher-success-chart.component';
import { SpecializationChartComponent } from '../../components/charts/specialization/specialization-chart.component';

@Component({
  selector: 'app-business-models',
  standalone: true,
  imports: [
    PriceElasticityChartComponent,
    F2PPremiumChartComponent,
    PublisherSuccessChartComponent,
    SpecializationChartComponent
  ],
  template: `
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-white mb-6">Business & Revenue</h2>
      
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 h-[400px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Price Elasticity</h3>
          <p class="text-gray-400 text-sm mb-4">Shows the relationship between game price points and total ownership numbers to find optimal pricing.</p>
          <app-price-elasticity-chart class="flex-1 min-h-0"></app-price-elasticity-chart>
        </div>

        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 h-[400px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">F2P vs Premium</h3>
          <p class="text-gray-400 text-sm mb-4">Comparison of market share (quantity) and player engagement (avg. playtime) between Free-to-Play and Paid games.</p>
          <app-f2p-premium-chart class="flex-1 min-h-0"></app-f2p-premium-chart>
        </div>

        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 h-[400px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Publisher Success</h3>
          <p class="text-gray-400 text-sm mb-4">Top publishers ranked by their launch success rate and average game pricing.</p>
          <app-publisher-success-chart class="flex-1 min-h-0"></app-publisher-success-chart>
        </div>

        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 h-[400px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Specialization Strategy</h3>
          <p class="text-gray-400 text-sm mb-4">Performance analysis of developers who specialize in specific genres versus those who generalize.</p>
          <app-specialization-chart class="flex-1 min-h-0"></app-specialization-chart>
        </div>
      </div>
    </div>
  `
})
export class BusinessModelsComponent { }
