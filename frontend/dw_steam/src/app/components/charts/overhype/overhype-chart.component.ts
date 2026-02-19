import { Component, OnInit, inject, signal } from '@angular/core';
import { StatsService } from '../../../services/stats.service';
import { OverhypeAnalysisStat } from '../../../models/stats.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overhype-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto h-full w-full">
      <table class="w-full text-sm text-left text-gray-400">
        <thead class="text-xs text-gray-300 uppercase bg-gray-800">
          <tr>
            <th class="px-6 py-3">Game</th>
            <th class="px-6 py-3">Owners</th>
            <th class="px-6 py-3 text-center">Positive</th>
            <th class="px-6 py-3 text-center">Negative</th>
            <th class="px-6 py-3 text-right">Approval</th>
          </tr>
        </thead>
        <tbody>
          @if (isLoading()) {
            <tr><td colspan="5" class="text-center py-4">Loading...</td></tr>
          } @else {
            @for (game of games; track game.name) {
              <tr class="border-b border-gray-800 hover:bg-steam-hover transition-colors">
                <td class="px-6 py-4 font-medium text-white truncate max-w-[200px]" title="{{game.name}}">{{ game.name }}</td>
                <td class="px-6 py-4">{{ game.rango_propietarios }}</td>
                <td class="px-6 py-4 text-center text-green-400">{{ game.positive_ratings | number }}</td>
                <td class="px-6 py-4 text-center text-red-400">{{ game.negative_ratings | number }}</td>
                <td class="px-6 py-4 text-right">
                  <div class="w-full bg-gray-700 rounded-full h-2.5 mb-1">
                    <div class="bg-red-600 h-2.5 rounded-full" [style.width.%]="game.tasa_aprobacion * 100"></div>
                  </div>
                  <span class="text-xs font-bold">{{ game.tasa_aprobacion | percent:'1.1-1' }}</span>
                </td>
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  `
})
export class OverhypeChartComponent implements OnInit {
  private statsService = inject(StatsService);
  isLoading = signal(true);
  games: OverhypeAnalysisStat[] = [];

  ngOnInit() {
    this.statsService.getOverhypeAnalysis().subscribe({
      next: (data) => {
        // Sort by lowest approval rate
        this.games = data.sort((a, b) => a.tasa_aprobacion - b.tasa_aprobacion).slice(0, 10);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load Overhype stats', err);
        this.isLoading.set(false);
      }
    });
  }
}
