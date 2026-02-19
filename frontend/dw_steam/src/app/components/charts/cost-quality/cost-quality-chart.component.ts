import { Component, OnInit, inject, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { StatsService } from '../../../services/stats.service';

@Component({
    selector: 'app-cost-quality-chart',
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
export class CostQualityChartComponent implements OnInit {
    private statsService = inject(StatsService);
    isLoading = signal(true);

    public chartType: ChartType = 'bar';
    public chartData: ChartData<'bar'> = {
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
                title: { display: true, text: 'Calidad Promedio / Score', color: '#9ca3af' },
                grid: { color: '#374151' },
                ticks: { color: '#9ca3af' }
            }
        },
        plugins: {
            legend: { labels: { color: '#e5e7eb' } }
        },
        layout: {
            padding: {
                bottom: 10,
                right: 20
            }
        }
    };

    ngOnInit() {
        this.statsService.getCostQuality().subscribe({
            next: (data) => {
                this.chartData = {
                    labels: data.map(d => d.segmento_precio),
                    datasets: [
                        {
                            label: 'Score Calidad',
                            data: data.map(d => d.score_calidad_promedio),
                            backgroundColor: 'rgba(59, 130, 246, 0.7)',
                            borderColor: 'transparent'
                        },
                        {
                            label: 'Votos Promedio (Scaled / 1000)',
                            data: data.map(d => d.promedio_votos_por_juego / 1000), // Scaling down to fit
                            backgroundColor: 'rgba(168, 85, 247, 0.7)',
                            borderColor: 'transparent'
                        }
                    ]
                };
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Failed to load Cost Quality stats', err);
                this.isLoading.set(false);
            }
        });
    }
}
