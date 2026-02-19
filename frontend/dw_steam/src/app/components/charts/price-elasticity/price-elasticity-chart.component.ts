import { Component, OnInit, inject, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { StatsService } from '../../../services/stats.service';

@Component({
    selector: 'app-price-elasticity-chart',
    standalone: true,
    imports: [BaseChartDirective],
    template: `
    <div class="relative h-full w-full min-h-[300px]">
      @if (isLoading()) {
        <div class="absolute inset-0 flex items-center justify-center text-gray-400">Loading...</div>
      }
      
      @if (chartData.labels && chartData.labels.length > 0) {
        <canvas baseChart
          [data]="chartData"
          [options]="chartOptions"
          [type]="chartType">
        </canvas>
      }
    </div>
  `
})
export class PriceElasticityChartComponent implements OnInit {
    private statsService = inject(StatsService);
    isLoading = signal(true);

    public chartType: ChartType = 'bar';
    public chartData: ChartData<'bar' | 'line'> = {
        labels: [],
        datasets: []
    };

    public chartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: { color: '#374151' },
                ticks: { color: '#9ca3af' }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: { display: true, text: 'Cantidad Juegos', color: '#60a5fa' },
                grid: { color: '#374151' },
                ticks: { color: '#9ca3af' }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: { display: true, text: 'Precio Ideal ($)', color: '#34d399' },
                grid: { drawOnChartArea: false },
                ticks: { color: '#9ca3af', callback: (val) => '$' + val }
            }
        },
        layout: {
            padding: {
                right: 20,
                bottom: 10
            }
        }
    };

    ngOnInit() {
        this.statsService.getPriceElasticity().subscribe({
            next: (data) => {
                // Sort if needed, assuming ranges are string but maybe ordered?
                // e.g. "0-20000", "20000-50000".
                // Let's trust backend order or sort by owners count if possible.
                // Backend key is `rango_propietarios`.

                this.chartData = {
                    labels: data.map(d => d.rango_propietarios),
                    datasets: [
                        {
                            type: 'bar',
                            label: 'Cantidad Juegos',
                            data: data.map(d => d.cantidad_juegos_estrategia),
                            backgroundColor: 'rgba(96, 165, 250, 0.6)',
                            yAxisID: 'y'
                        },
                        {
                            type: 'line',
                            label: 'Precio Ideal ($)',
                            data: data.map(d => d.precio_ideal_promedio),
                            borderColor: '#34d399',
                            backgroundColor: 'rgba(52, 211, 153, 0.2)',
                            yAxisID: 'y1',
                            tension: 0.4
                        }
                    ]
                };
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Failed to load Price Elasticity stats', err);
                this.isLoading.set(false);
            }
        });
    }
}
