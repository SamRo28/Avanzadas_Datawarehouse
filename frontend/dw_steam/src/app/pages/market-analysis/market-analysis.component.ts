import { Component } from '@angular/core';
import { BattleRoyaleChartComponent } from '../../components/charts/battle-royale/battle-royale-chart.component';
import { IndieSuccessChartComponent } from '../../components/charts/indie-success/indie-success-chart.component';
import { DecadeEvolutionChartComponent } from '../../components/charts/decade-evolution/decade-evolution-chart.component';
import { ReleaseSeasonalityChartComponent } from '../../components/charts/release-seasonality/release-seasonality-chart.component';

@Component({
  selector: 'app-market-analysis',
  standalone: true,
  imports: [BattleRoyaleChartComponent, IndieSuccessChartComponent, DecadeEvolutionChartComponent, ReleaseSeasonalityChartComponent],
  template: `
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-white mb-6">Análisis de Mercado</h2>
      
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <!-- Battle Royale Lifecycle -->
        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 h-[500px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Ciclo de Vida de Battle Royale</h3>
          <p class="text-gray-400 text-sm mb-4">Rastrea el ascenso y caída de la popularidad del género Battle Royale a lo largo del tiempo.</p>
          <app-battle-royale-chart class="flex-1 min-h-0"></app-battle-royale-chart>
        </div>

        <!-- Indie Success Formula -->
        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 h-[500px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Fórmula de Éxito Indie</h3>
          <p class="text-gray-400 text-sm mb-4">Destaca características específicas de los juegos que difieren significativamente entre los juegos indie exitosos y los que fracasan.</p>
          <app-indie-success-chart class="flex-1 min-h-0"></app-indie-success-chart>
        </div>

        <!-- Decade Evolution -->
        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 xl:col-span-2 h-[400px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Evolución en la Década</h3>
          <p class="text-gray-400 text-sm mb-4">Visualiza las tendencias a largo plazo en los precios de los juegos y el volumen de lanzamientos en los últimos 10 años.</p>
          <app-decade-evolution-chart class="flex-1 min-h-0"></app-decade-evolution-chart>
        </div>

        <!-- Release Seasonality -->
        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 xl:col-span-2 h-[500px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Estacionalidad de Lanzamientos</h3>
          <p class="text-gray-400 text-sm mb-4">Analiza qué meses del año son los mejores para lanzar un juego basándose en la cantidad histórica de lanzamientos y las valoraciones positivas.</p>
          <app-release-seasonality-chart class="flex-1 min-h-0"></app-release-seasonality-chart>
        </div>
      </div>
    </div>
  `
})
export class MarketAnalysisComponent { }
