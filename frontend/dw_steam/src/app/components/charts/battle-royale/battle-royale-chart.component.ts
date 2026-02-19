import { Component, OnInit, inject, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { StatsService } from '../../../services/stats.service';

@Component({
    selector: 'app-battle-royale-chart',
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
export class BattleRoyaleChartComponent implements OnInit {
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
                title: { display: true, text: 'Tiempo Juego Promedio (min)', color: '#a78bfa' },
                grid: { drawOnChartArea: false },
                ticks: { color: '#9ca3af' }
            }
        },
        layout: {
            padding: {
                bottom: 20,
                right: 20
            }
        }
    };

    ngOnInit() {
        this.statsService.getBattleRoyaleLifecycle().subscribe({
            next: (data) => {
                // Sort by year just in case
                data.sort((a, b) => a.anio - b.anio);

                this.chartData = {
                    labels: data.map(d => d.anio.toString()),
                    datasets: [
                        {
                            data: data.map(d => d.lanzamientos),
                            label: 'Lanzamientos',
                            borderColor: '#60a5fa',
                            backgroundColor: 'rgba(96, 165, 250, 0.2)',
                            yAxisID: 'y',
                            tension: 0.4
                        },
                        {
                            data: data.map(d => d.tiempo_juego_promedio_minutos),
                            label: 'Tiempo Juego Avg',
                            borderColor: '#a78bfa',
                            backgroundColor: 'rgba(167, 139, 250, 0.2)',
                            yAxisID: 'y1',
                            tension: 0.4
                        }
                    ]
                };
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Failed to load Battle Royale stats', err);
                this.isLoading.set(false);
            }
        });
    }
}
