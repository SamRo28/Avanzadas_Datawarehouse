import { Component, OnInit, inject, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { StatsService } from '../../../services/stats.service';

@Component({
    selector: 'app-dev-support-chart',
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
export class DevSupportChartComponent implements OnInit {
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
                grid: { color: '#374151' },
                ticks: { color: '#9ca3af' }
            }
        },
        plugins: {
            legend: { display: false }
        },
        layout: {
            padding: {
                bottom: 20,
                right: 20
            }
        }
    };

    ngOnInit() {
        this.statsService.getDevSupport().subscribe({
            next: (data) => {
                this.chartData = {
                    labels: data.map(d => d.nivel_soporte),
                    datasets: [{
                        label: 'Rating Promedio',
                        data: data.map(d => d.rating_promedio),
                        backgroundColor: '#10b981',
                        borderRadius: 6
                    }]
                };
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Failed to load Dev Support stats', err);
                this.isLoading.set(false);
            }
        });
    }
}
