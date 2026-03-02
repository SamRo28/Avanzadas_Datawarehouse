import { Component, OnInit, inject, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { StatsService } from '../../../services/stats.service';

@Component({
    selector: 'app-release-seasonality-chart',
    standalone: true,
    imports: [BaseChartDirective],
    template: `
    <div class="relative h-full w-full min-h-[300px]">
      @if (isLoading()) {
        <div class="absolute inset-0 flex items-center justify-center text-gray-400">Cargando...</div>
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
export class ReleaseSeasonalityChartComponent implements OnInit {
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
                title: { display: true, text: 'Lanzamientos', color: '#60a5fa' },
                grid: { color: '#374151' },
                ticks: { color: '#9ca3af' }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: { display: true, text: 'Rating Promedio', color: '#34d399' },
                grid: { drawOnChartArea: false },
                ticks: { color: '#9ca3af' }
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
        this.statsService.getReleaseSeasonality().subscribe({
            next: (data) => {
                // Ensure data is sorted by month
                data.sort((a, b) => a.mes - b.mes);

                const monthNames = {
                    1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun',
                    7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic'
                };

                this.chartData = {
                    labels: data.map(d => monthNames[d.mes as keyof typeof monthNames]),
                    datasets: [
                        {
                            type: 'bar',
                            label: 'Lanzamientos',
                            data: data.map(d => d.lanzamientos),
                            backgroundColor: 'rgba(96, 165, 250, 0.6)',
                            yAxisID: 'y'
                        },
                        {
                            type: 'line',
                            label: 'Rating Promedio',
                            data: data.map(d => d.rating_promedio),
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
                console.error('Failed to load Release Seasonality stats', err);
                this.isLoading.set(false);
            }
        });
    }
}
