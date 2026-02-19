import { Component, OnInit, inject, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { StatsService } from '../../../services/stats.service';
import { BlueOceanStat } from '../../../models/stats.models';

@Component({
  selector: 'app-blue-ocean-chart',
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
export class BlueOceanChartComponent implements OnInit {
  private statsService = inject(StatsService);
  isLoading = signal(true);

  public chartType: ChartType = 'bubble';
  public chartData: ChartData<'bubble'> = {
    datasets: []
  };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'Competencia (Cantidad Juegos)', color: '#9ca3af' },
        grid: { color: '#374151' },
        ticks: { color: '#9ca3af' }
      },
      y: {
        title: { display: true, text: 'Rating Promedio', color: '#9ca3af' },
        grid: { color: '#374151' },
        ticks: { color: '#9ca3af' },
        min: 0,
        max: 100
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const point = context.raw;
            return `${point.genre}: Rating ${point.y}, Comp ${point.x}, Price $${point.r}`;
          }
        }
      }
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 30
      }
    }
  };

  ngOnInit() {
    this.statsService.getBlueOcean().subscribe({
      next: (data) => {
        const datasets = data.map(item => ({
          label: item.combinacion_generos,
          data: [{
            x: item.cantidad_competencia,
            y: item.rating_promedio,
            r: item.precio_promedio,
            genre: item.combinacion_generos
          }],
          backgroundColor: this.getRandomColor(),
          borderColor: 'transparent'
        }));

        this.chartData = { datasets };
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load Blue Ocean stats', err);
        this.isLoading.set(false);
      }
    });
  }

  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color + '80'; // 50% opacity
  }
}
