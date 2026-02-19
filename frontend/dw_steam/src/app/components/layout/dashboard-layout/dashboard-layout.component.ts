import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
    selector: 'app-dashboard-layout',
    standalone: true,
    imports: [RouterOutlet, SidebarComponent],
    template: `
    <div class="flex h-screen overflow-hidden bg-steam-bg">
      <app-sidebar></app-sidebar>
      <main class="flex-1 overflow-y-auto p-8 relative">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5 pointer-events-none"></div>
        <div class="relative z-10 max-w-7xl mx-auto">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class DashboardLayoutComponent { }
