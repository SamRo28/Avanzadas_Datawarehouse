import { Component, OnInit, inject, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { StatsService } from '../../../services/stats.service';

@Component({
    selector: 'app-specialization-chart',
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
export class SpecializationChartComponent implements OnInit {
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
                title: { display: true, text: 'Calidad Promedio Global', color: '#9ca3af' }
            },
            y: {
                grid: { display: false },
                ticks: { color: '#e5e7eb' }
            }
        },
        plugins: { legend: { display: false } },
        layout: {
            padding: {
                right: 20,
                bottom: 10
            }
        }
    };

    ngOnInit() {
        this.statsService.getSpecialization().subscribe({
            next: (data) => {
                this.chartData = {
                    labels: data.map(d => d.estrategia_estudio),
                    datasets: [{
                        label: 'Calidad Promedio',
                        data: data.map(d => d.calidad_promedio_global),
                        backgroundColor: ['#60a5fa', '#a78bfa'],
                        barThickness: 40
                    }]
                };
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Failed to load Specialization stats', err);
                this.isLoading.set(false);
            }
        });
    }
}
