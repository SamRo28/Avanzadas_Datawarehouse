import { Component, OnInit, inject, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { StatsService } from '../../../services/stats.service';

@Component({
    selector: 'app-copywriting-seo-chart',
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
export class CopywritingSeoChartComponent implements OnInit {
    private statsService = inject(StatsService);
    isLoading = signal(true);

    public chartType: ChartType = 'bar';
    public chartData: ChartData<'bar'> = {
        labels: [],
        datasets: []
    };

    public chartOptions: ChartConfiguration['options'] = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: { color: '#374151' },
                ticks: { color: '#9ca3af' },
                title: { display: true, text: 'Impacto en Ventas ($ Avg)', color: '#9ca3af' }
            },
            y: {
                grid: { display: false },
                ticks: { color: '#e5e7eb' }
            }
        },
        plugins: {
            legend: { display: false }
        },
        layout: {
            padding: {
                bottom: 10,
                right: 20
            }
        }
    };

    ngOnInit() {
        this.statsService.getCopywritingSEO().subscribe({
            next: (data) => {
                // Sort by impact
                data.sort((a, b) => b.impacto_en_ventas_avg - a.impacto_en_ventas_avg);

                this.chartData = {
                    labels: data.map(d => d.longitud_copywriting),
                    datasets: [{
                        label: 'Impacto Ventas',
                        data: data.map(d => d.impacto_en_ventas_avg),
                        backgroundColor: '#f472b6', // Pink
                        barThickness: 30,
                        borderRadius: 4
                    }]
                };
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Failed to load Copywriting stats', err);
                this.isLoading.set(false);
            }
        });
    }
}
