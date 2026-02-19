import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, LayoutDashboard, BarChart3, DollarSign, Gamepad2, Megaphone } from 'lucide-angular';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, LucideAngularModule],
    template: `
    <aside class="w-64 bg-steam-card h-full flex flex-col border-r border-gray-800">
      <div class="p-6 flex items-center gap-3">
        <div class="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
          <lucide-icon [img]="Gamepad2" class="w-6 h-6 text-white"></lucide-icon>
        </div>
        <h1 class="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Steam DW
        </h1>
      </div>

      <nav class="flex-1 px-4 space-y-2 overflow-y-auto">
        <div class="mb-4">
          <p class="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Market Analysis</p>
          <a routerLink="/market-analysis" routerLinkActive="bg-steam-hover text-white" class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-steam-hover transition-colors group">
            <lucide-icon [img]="BarChart3" class="w-5 h-5 group-hover:text-blue-400"></lucide-icon>
            <span class="text-sm font-medium">Trends & Cycles</span>
          </a>
        </div>

        <div class="mb-4">
          <p class="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Business & Revenue</p>
          <a routerLink="/business-models" routerLinkActive="bg-steam-hover text-white" class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-steam-hover transition-colors group">
            <lucide-icon [img]="DollarSign" class="w-5 h-5 group-hover:text-green-400"></lucide-icon>
            <span class="text-sm font-medium">Monetization</span>
          </a>
        </div>

        <div class="mb-4">
          <p class="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Game Development</p>
          <a routerLink="/game-quality" routerLinkActive="bg-steam-hover text-white" class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-steam-hover transition-colors group">
            <lucide-icon [img]="Gamepad2" class="w-5 h-5 group-hover:text-purple-400"></lucide-icon>
            <span class="text-sm font-medium">Quality & Dev</span>
          </a>
        </div>

        <div class="mb-4">
          <p class="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Marketing</p>
          <a routerLink="/marketing" routerLinkActive="bg-steam-hover text-white" class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-steam-hover transition-colors group">
            <lucide-icon [img]="Megaphone" class="w-5 h-5 group-hover:text-yellow-400"></lucide-icon>
            <span class="text-sm font-medium">Marketing & Assets</span>
          </a>
        </div>
      </nav>

      <div class="p-4 border-t border-gray-800">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-200">
            AD
          </div>
          <div>
            <p class="text-sm font-medium text-white">Admin User</p>
            <p class="text-xs text-gray-500">Data Analyst</p>
          </div>
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent {
    readonly LayoutDashboard = LayoutDashboard;
    readonly BarChart3 = BarChart3;
    readonly DollarSign = DollarSign;
    readonly Gamepad2 = Gamepad2;
    readonly Megaphone = Megaphone;
}
