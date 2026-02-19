import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    BlueOceanStat,
    BattleRoyaleLifecycle,
    IndieSuccessStat,
    PriceElasticityStat,
    CostQualityStat,
    F2PvsPremiumStat,
    VisualAssetsImpactStat,
    CopywritingSEOStat,
    MultiPlatformStat,
    OverhypeAnalysisStat,
    AccessibilityHardwareStat,
    DevSupportStat,
    PublisherSuccessStat,
    SpecializationStat,
    DecadeEvolutionStat
} from '../models/stats.models';

@Injectable({
    providedIn: 'root'
})
export class StatsService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8000/statistics';

    getBlueOcean(): Observable<BlueOceanStat[]> {
        return this.http.get<BlueOceanStat[]>(`${this.apiUrl}/blue-ocean`);
    }

    getBattleRoyaleLifecycle(): Observable<BattleRoyaleLifecycle[]> {
        return this.http.get<BattleRoyaleLifecycle[]>(`${this.apiUrl}/battle-royale-lifecycle`);
    }

    getIndieSuccess(): Observable<IndieSuccessStat[]> {
        return this.http.get<IndieSuccessStat[]>(`${this.apiUrl}/indie-success`);
    }

    getPriceElasticity(): Observable<PriceElasticityStat[]> {
        return this.http.get<PriceElasticityStat[]>(`${this.apiUrl}/price-elasticity`);
    }

    getCostQuality(): Observable<CostQualityStat[]> {
        return this.http.get<CostQualityStat[]>(`${this.apiUrl}/cost-quality`);
    }

    getF2PvsPremium(): Observable<F2PvsPremiumStat[]> {
        return this.http.get<F2PvsPremiumStat[]>(`${this.apiUrl}/f2p-vs-premium`);
    }

    getVisualAssetsImpact(): Observable<VisualAssetsImpactStat[]> {
        return this.http.get<VisualAssetsImpactStat[]>(`${this.apiUrl}/visual-assets-impact`);
    }

    getCopywritingSEO(): Observable<CopywritingSEOStat[]> {
        return this.http.get<CopywritingSEOStat[]>(`${this.apiUrl}/copywriting-seo`);
    }

    getMultiPlatform(): Observable<MultiPlatformStat[]> {
        return this.http.get<MultiPlatformStat[]>(`${this.apiUrl}/multi-platform`);
    }

    getOverhypeAnalysis(): Observable<OverhypeAnalysisStat[]> {
        return this.http.get<OverhypeAnalysisStat[]>(`${this.apiUrl}/overhype-analysis`);
    }

    getAccessibilityHardware(): Observable<AccessibilityHardwareStat[]> {
        return this.http.get<AccessibilityHardwareStat[]>(`${this.apiUrl}/accessibility-hardware`);
    }

    getDevSupport(): Observable<DevSupportStat[]> {
        return this.http.get<DevSupportStat[]>(`${this.apiUrl}/dev-support`);
    }

    getPublisherSuccess(): Observable<PublisherSuccessStat[]> {
        return this.http.get<PublisherSuccessStat[]>(`${this.apiUrl}/publisher-success`);
    }

    getSpecialization(): Observable<SpecializationStat[]> {
        return this.http.get<SpecializationStat[]>(`${this.apiUrl}/specialization-generalist`);
    }

    getDecadeEvolution(): Observable<DecadeEvolutionStat[]> {
        return this.http.get<DecadeEvolutionStat[]>(`${this.apiUrl}/decade-evolution`);
    }
}
