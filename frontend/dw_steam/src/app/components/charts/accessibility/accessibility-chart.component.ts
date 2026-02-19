import { Component, OnInit, inject, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { StatsService } from '../../../services/stats.service';

@Component({
    selector: 'app-accessibility-chart',
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
export class AccessibilityChartComponent implements OnInit {
    private statsService = inject(StatsService);
    isLoading = signal(true);

    public chartType: ChartType = 'pie';
    public chartData: ChartData<'pie'> = {
        labels: [],
        datasets: []
    };

    public chartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#e5e7eb',
                    padding: 20,
                    usePointStyle: true
                }
            }
        },
        layout: {
            padding: 10
        }
    };

    ngOnInit() {
        this.statsService.getAccessibilityHardware().subscribe({
            next: (data) => {
                this.chartData = {
                    labels: data.map(d => d.tipo_requisitos_estimado),
                    datasets: [{
                        data: data.map(d => d.cantidad_lanzamientos),
                        backgroundColor: [
                            '#60a5fa', // Blue
                            '#f472b6', // Pink
                            '#34d399', // Green
                            '#fbbf24', // Amber
                            '#a78bfa'  // Purple
                        ],
                        borderColor: '#1f2937' // Gray 800
                    }]
                };
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Failed to load Accessibility stats', err);
                this.isLoading.set(false);
            }
        });
    }
}
