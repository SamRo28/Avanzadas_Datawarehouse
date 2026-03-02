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
      <h2 class="text-2xl font-bold text-white mb-6">Negocio e Ingresos</h2>
      
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 h-[400px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Elasticidad de Precio</h3>
          <p class="text-gray-400 text-sm mb-4">Muestra la relación entre los puntos de precio del juego y el número total de propietarios para encontrar el precio óptimo.</p>
          <app-price-elasticity-chart class="flex-1 min-h-0"></app-price-elasticity-chart>
        </div>

        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 h-[400px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">F2P vs Premium</h3>
          <p class="text-gray-400 text-sm mb-4">Comparación de la cuota de mercado (cantidad) y la interacción del jugador (tiempo de juego prom.) entre juegos Free-to-Play y de Pago.</p>
          <app-f2p-premium-chart class="flex-1 min-h-0"></app-f2p-premium-chart>
        </div>

        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 h-[400px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Éxito de los Editores</h3>
          <p class="text-gray-400 text-sm mb-4">Principales editores clasificados por su tasa de éxito de lanzamiento y precio promedio de los juegos.</p>
          <app-publisher-success-chart class="flex-1 min-h-0"></app-publisher-success-chart>
        </div>

        <div class="bg-steam-card p-6 rounded-xl border border-gray-800 h-[400px] flex flex-col">
          <h3 class="text-lg font-semibold text-white mb-1">Estrategia de Especialización</h3>
          <p class="text-gray-400 text-sm mb-4">Análisis de rendimiento de desarrolladores que se especializan en géneros específicos versus aquellos que generalizan.</p>
          <app-specialization-chart class="flex-1 min-h-0"></app-specialization-chart>
        </div>
      </div>
    </div>
  `
})
export class BusinessModelsComponent { }
