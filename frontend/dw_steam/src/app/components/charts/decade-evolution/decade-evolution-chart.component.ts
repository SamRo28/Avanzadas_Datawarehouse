import { Component, OnInit, inject, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { StatsService } from '../../../services/stats.service';

@Component({
    selector: 'app-decade-evolution-chart',
    standalone: true,
    imports: [BaseChartDirective],
    template: `
    <div class="relative h-full w-full min-h-[300px]">
      @if (isLoading()) {
        <div class="absolute inset-0 flex items-center justify-center text-gray-400">Loading...</div>
      }
      
      @if (chartData.datasets.length > 0) {
        <canvas baseChart
          [data]="chartData"
          [options]="chartOptions"
          [type]="chartType">
        </canvas>
      }
    </div>
  `
})
export class DecadeEvolutionChartComponent implements OnInit {
    private statsService = inject(StatsService);
    isLoading = signal(true);

    public chartType: ChartType = 'line';
    public chartData: ChartData<'line'> = {
        labels: [],
        datasets: []
    };

    public chartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                grid: { color: '#374151' },
                ticks: { color: '#9ca3af' }
            },
            y: {
                title: { display: true, text: 'Precio Promedio ($)', color: '#9ca3af' },
                grid: { color: '#374151' },
                ticks: { color: '#9ca3af' }
            }
        },
        plugins: {
            legend: { labels: { color: '#e5e7eb' } }
        },
        layout: {
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 20
            }
        }
    };

    ngOnInit() {
        this.statsService.getDecadeEvolution().subscribe({
            next: (data) => {
                // We have a list of objects with Anio, Categoria (Indie vs Mainstream), and metrics.
                // We need to group by Year and separate datasets by Category.

                // Get unique years
                const years = [...new Set(data.map(d => d.Anio_Lanzamiento))].sort();

                const indieData = years.map(year => {
                    const item = data.find(d => d.Anio_Lanzamiento === year && d.Categoria_Mercado === 'Indie');
                    return item ? item.Precio_Promedio : null;
                });

                const mainstreamData = years.map(year => {
                    const item = data.find(d => d.Anio_Lanzamiento === year && d.Categoria_Mercado === 'Mainstream');
                    return item ? item.Precio_Promedio : null;
                });

                this.chartData = {
                    labels: years.map(y => y.toString()),
                    datasets: [
                        {
                            label: 'Indie Price',
                            data: indieData as number[],
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.5)',
                            tension: 0.3
                        },
                        {
                            label: 'Mainstream Price',
                            data: mainstreamData as number[],
                            borderColor: '#ef4444',
                            backgroundColor: 'rgba(239, 68, 68, 0.5)',
                            tension: 0.3
                        }
                    ]
                };
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Failed to load Decade Evolution stats', err);
                this.isLoading.set(false);
            }
        });
    }
}
