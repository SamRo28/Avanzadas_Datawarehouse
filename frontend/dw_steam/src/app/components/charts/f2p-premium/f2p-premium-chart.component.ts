import { Component, OnInit, inject, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { StatsService } from '../../../services/stats.service';

@Component({
    selector: 'app-f2p-premium-chart',
    standalone: true,
    imports: [BaseChartDirective],
    template: `
    <div class="grid grid-cols-2 gap-4 h-full">
      <div class="relative min-h-[250px]">
        <h4 class="text-center text-gray-400 text-sm mb-2">Market Share (Titles)</h4>
        @if (!isLoading()) {
          <canvas baseChart [data]="pieData" [options]="pieOptions" [type]="'doughnut'"></canvas>
        }
      </div>
      <div class="relative min-h-[250px]">
        <h4 class="text-center text-gray-400 text-sm mb-2">Avg Playtime (min)</h4>
        @if (!isLoading()) {
          <canvas baseChart [data]="barData" [options]="barOptions" [type]="'bar'"></canvas>
        }
      </div>
    </div>
  `
})
export class F2PPremiumChartComponent implements OnInit {
    private statsService = inject(StatsService);
    isLoading = signal(true);

    public pieData: ChartData<'doughnut'> = { labels: [], datasets: [] };
    public barData: ChartData<'bar'> = { labels: [], datasets: [] };

    public pieOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { color: '#9ca3af' } } },
        layout: { padding: 10 }
    };

    public barOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
            y: { grid: { color: '#374151' }, ticks: { color: '#9ca3af' } }
        },
        plugins: { legend: { display: false } },
        layout: { padding: 10 }
    };

    ngOnInit() {
        this.statsService.getF2PvsPremium().subscribe({
            next: (data) => {
                const labels = data.map(d => d.modelo_negocio);

                this.pieData = {
                    labels,
                    datasets: [{
                        data: data.map(d => d.cantidad_titulos),
                        backgroundColor: ['#60a5fa', '#f87171'],
                        borderColor: 'transparent'
                    }]
                };

                this.barData = {
                    labels,
                    datasets: [{
                        data: data.map(d => d.tiempo_juego_promedio_minutos),
                        backgroundColor: ['#60a5fa', '#f87171'],
                        barThickness: 40
                    }]
                };

                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Failed to load F2P vs Premium stats', err);
                this.isLoading.set(false);
            }
        });
    }
}
