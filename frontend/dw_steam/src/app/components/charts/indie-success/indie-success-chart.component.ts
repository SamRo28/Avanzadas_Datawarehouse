import { Component, OnInit, inject, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { StatsService } from '../../../services/stats.service';

@Component({
  selector: 'app-indie-success-chart',
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
export class IndieSuccessChartComponent implements OnInit {
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
        ticks: { color: '#9ca3af', callback: (val) => val + '%' },
        max: 100
      },
      y: {
        grid: { display: false },
        ticks: { color: '#e5e7eb', font: { weight: 'bold' } }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.x}%`
        }
      }
    },
    layout: {
      padding: {
        right: 30,
        bottom: 10
      }
    }
  };

  ngOnInit() {
    this.statsService.getIndieSuccess().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const stats = data[0];

          const parse = (val: string) => parseFloat(val.replace('%', ''));

          this.chartData = {
            labels: ['Pixel Graphics', 'Roguelike', '2D', 'Strategy', 'Horror'],
            datasets: [{
              label: 'Presence in Top Indies',
              data: [
                parse(stats.tiene_pixel_graphics),
                parse(stats.tiene_roguelike),
                parse(stats.tiene_2d),
                parse(stats.tiene_strategy),
                parse(stats.tiene_horror)
              ],
              backgroundColor: [
                '#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'
              ],
              borderColor: 'transparent',
              barThickness: 20
            }]
          };
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load Indie Success stats', err);
        this.isLoading.set(false);
      }
    });
  }
}
