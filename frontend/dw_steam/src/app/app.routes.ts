import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './components/layout/dashboard-layout/dashboard-layout.component';
import { MarketAnalysisComponent } from './pages/market-analysis/market-analysis.component';
import { BusinessModelsComponent } from './pages/business-models/business-models.component';
import { GameQualityComponent } from './pages/game-quality/game-quality.component';
import { MarketingComponent } from './pages/marketing/marketing.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            { path: '', redirectTo: 'market-analysis', pathMatch: 'full' },
            { path: 'market-analysis', component: MarketAnalysisComponent },
            { path: 'business-models', component: BusinessModelsComponent },
            { path: 'game-quality', component: GameQualityComponent },
            { path: 'marketing', component: MarketingComponent },
        ]
    },
    { path: '**', redirectTo: '' }
];
