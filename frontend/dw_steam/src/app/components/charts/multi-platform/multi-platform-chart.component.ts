import { Component, OnInit, inject, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { StatsService } from '../../../services/stats.service';

@Component({
    selector: 'app-multi-platform-chart',
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
export class MultiPlatformChartComponent implements OnInit {
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
                grid: { display: false },
                ticks: { color: '#9ca3af' }
            },
            y: {
                grid: { color: '#374151' },
                ticks: { color: '#9ca3af' },
                title: { display: true, text: 'Base Usuarios Promedio', color: '#9ca3af' }
            }
        },
        plugins: {
            legend: { display: false }
        },
        layout: {
            padding: {
                bottom: 20,
                left: 10,
                right: 10
            }
        }
    };

    ngOnInit() {
        this.statsService.getMultiPlatform().subscribe({
            next: (data) => {
                this.chartData = {
                    labels: data.map(d => d.soporte_plataformas === 'win' ? 'Windows Only' : d.soporte_plataformas),
                    datasets: [{
                        label: 'Usuarios Promedio',
                        data: data.map(d => d.base_usuarios_promedio),
                        backgroundColor: ['#60a5fa', '#34d399', '#a78bfa'],
                        borderRadius: 8
                    }]
                };
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Failed to load Multi-Platform stats', err);
                this.isLoading.set(false);
            }
        });
    }
}
