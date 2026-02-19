import { Component, OnInit, inject, signal } from '@angular/core';
import { StatsService } from '../../../services/stats.service';
import { VisualAssetsImpactStat } from '../../../models/stats.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visual-assets-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full w-full flex flex-col p-2">
      @if (isLoading()) {
        <div class="flex-1 flex items-center justify-center text-gray-400">Loading...</div>
      } @else {
        <div class="grid gap-2 flex-1 w-full" [style.grid-template-columns]="'auto repeat(' + videoStrategies.length + ', 1fr)'">
          <!-- Header Row -->
          <div class="text-gray-400 text-xs font-bold p-2"></div>
          @for (video of videoStrategies; track video) {
            <div class="text-gray-400 text-xs font-bold p-2 text-center flex items-center justify-center">{{ video }}</div>
          }

          <!-- Data Rows -->
          @for (image of imageStrategies; track image) {
            <div class="text-gray-400 text-xs font-bold p-2 flex items-center justify-end">{{ image }}</div>
            @for (video of videoStrategies; track video) {
              <div class="relative group rounded cursor-pointer transition-all hover:scale-105 flex items-center justify-center"
                   [style.background-color]="getColor(getValue(image, video))">
                <div class="text-white font-bold text-center text-sm shadow-black drop-shadow-md">
                   {{ getValue(image, video) | number:'1.0-0' }}
                </div>
                <!-- Tooltip -->
                 <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs p-2 rounded whitespace-nowrap z-10 border border-gray-700 pointer-events-none">
                  Img: {{image}}<br>Vid: {{video}}<br>Users: {{getValue(image, video) | number}}
                </div>
              </div>
            }
          }
        </div>
        <div class="mt-2 flex items-center justify-center gap-2 text-xs text-gray-400">
          <span>Low Impact</span>
          <div class="w-20 h-2 bg-gradient-to-r from-blue-900 to-blue-400 rounded"></div>
          <span>High Impact</span>
        </div>
      }
    </div>
  `
})
export class VisualAssetsChartComponent implements OnInit {
  private statsService = inject(StatsService);
  isLoading = signal(true);
  data: VisualAssetsImpactStat[] = [];

  videoStrategies: string[] = [];
  imageStrategies: string[] = [];
  maxValue = 0;

  ngOnInit() {
    this.statsService.getVisualAssetsImpact().subscribe({
      next: (data) => {
        this.data = data;
        this.videoStrategies = [...new Set(data.map(d => d.estrategia_video))].sort();
        this.imageStrategies = [...new Set(data.map(d => d.estrategia_imagen))].sort();
        this.maxValue = Math.max(...data.map(d => d.usuarios_promedio_estimados));

        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load Visual Assets stats', err);
        this.isLoading.set(false);
      }
    });
  }

  getValue(image: string, video: string): number {
    return this.data.find(d => d.estrategia_imagen === image && d.estrategia_video === video)?.usuarios_promedio_estimados || 0;
  }

  getColor(value: number): string {
    const intensity = value / (this.maxValue || 1);
    // Interpolate between dark blue and bright blue/cyan
    // Min: rgb(30, 58, 138) (blue-900)
    // Max: rgb(96, 165, 250) (blue-400) or brighter

    // Let's use HSLA. Blue is ~220. Lightness from 20% to 60%.
    const lightness = 20 + (intensity * 40);
    return `hsl(217, 91%, ${lightness}%)`;
  }
}
