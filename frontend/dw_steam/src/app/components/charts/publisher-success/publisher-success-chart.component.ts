import { Component, OnInit, inject, signal } from '@angular/core';
import { StatsService } from '../../../services/stats.service';
import { PublisherSuccessStat } from '../../../models/stats.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publisher-success-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto h-full w-full">
      <table class="w-full text-sm text-left text-gray-400">
        <thead class="text-xs text-gray-300 uppercase bg-gray-800">
          <tr>
            <th class="px-6 py-3">Rank</th>
            <th class="px-6 py-3">Publisher</th>
            <th class="px-6 py-3 text-center">Games</th>
            <th class="px-6 py-3 text-right">Success Rate</th>
            <th class="px-6 py-3 text-right">Avg Price</th>
          </tr>
        </thead>
        <tbody>
          @if (isLoading()) {
            <tr><td colspan="5" class="text-center py-4">Loading...</td></tr>
          } @else {
            @for (pub of publishers; track pub.publisher; let i = $index) {
              <tr class="border-b border-gray-800 hover:bg-steam-hover transition-colors">
                <td class="px-6 py-4 font-bold text-white">#{{ i + 1 }}</td>
                <td class="px-6 py-4 font-medium text-white">{{ pub.publisher || 'Unknown' }}</td>
                <td class="px-6 py-4 text-center">{{ pub.juegos_publicados }}</td>
                <td class="px-6 py-4 text-right">
                  <span [class.text-green-400]="pub.tasa_de_exito_porcentaje > 50" [class.text-yellow-400]="pub.tasa_de_exito_porcentaje <= 50">
                    {{ pub.tasa_de_exito_porcentaje | number:'1.1-1' }}%
                  </span>
                </td>
                <td class="px-6 py-4 text-right"><span>$</span>{{ pub.precio_promedio | number:'1.2-2' }}</td>
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  `
})
export class PublisherSuccessChartComponent implements OnInit {
  private statsService = inject(StatsService);
  isLoading = signal(true);
  publishers: PublisherSuccessStat[] = [];

  ngOnInit() {
    this.statsService.getPublisherSuccess().subscribe({
      next: (data) => {
        // Sort by success rate descending
        this.publishers = data.sort((a, b) => b.tasa_de_exito_porcentaje - a.tasa_de_exito_porcentaje).slice(0, 10);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load Publisher stats', err);
        this.isLoading.set(false);
      }
    });
  }
}
