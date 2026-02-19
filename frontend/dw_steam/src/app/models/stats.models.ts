export interface BlueOceanStat {
    combinacion_generos: string;
    cantidad_competencia: number;
    rating_promedio: number;
    precio_promedio: number;
}

export interface BattleRoyaleLifecycle {
    anio: number;
    lanzamientos: number;
    tiempo_juego_promedio_minutos: number;
    total_votos_positivos: number;
}

export interface IndieSuccessStat {
    total_indies_exitosos: number;
    tiene_pixel_graphics: string;
    tiene_roguelike: string;
    tiene_2d: string;
    tiene_strategy: string;
    tiene_horror: string;
}

export interface PriceElasticityStat {
    rango_propietarios: string;
    cantidad_juegos_estrategia: number;
    precio_ideal_promedio: number;
}

export interface CostQualityStat {
    segmento_precio: string;
    total_juegos: number;
    score_calidad_promedio: number;
    promedio_votos_por_juego: number;
}

export interface F2PvsPremiumStat {
    modelo_negocio: string;
    cantidad_titulos: number;
    tiempo_juego_promedio_minutos: number;
    tiempo_juego_mediana_minutos: number;
    volumen_interaccion_total: number;
}

export interface VisualAssetsImpactStat {
    estrategia_video: string;
    estrategia_imagen: string;
    cantidad_juegos: number;
    usuarios_promedio_estimados: number;
}

export interface CopywritingSEOStat {
    longitud_copywriting: string;
    total_publicaciones: number;
    impacto_en_ventas_avg: number;
}

export interface MultiPlatformStat {
    soporte_plataformas: string;
    lanzamientos: number;
    precio_promedio: number;
    base_usuarios_promedio: number;
}

export interface OverhypeAnalysisStat {
    name: string;
    rango_propietarios: string;
    positive_ratings: number;
    negative_ratings: number;
    tasa_aprobacion: number;
}

export interface AccessibilityHardwareStat {
    tipo_requisitos_estimado: string;
    cantidad_lanzamientos: number;
    usuarios_promedio: number;
}

export interface DevSupportStat {
    nivel_soporte: string;
    total_juegos: number;
    rating_promedio: number;
}

export interface PublisherSuccessStat {
    publisher: string;
    juegos_publicados: number;
    precio_promedio: number;
    total_votos_positivos: number;
    tasa_de_exito_porcentaje: number;
}

export interface SpecializationStat {
    estrategia_estudio: string;
    cantidad_estudios: number;
    calidad_promedio_global: number;
}

export interface DecadeEvolutionStat {
    Anio_Lanzamiento: number;
    Categoria_Mercado: string;
    Total_Lanzamientos: number;
    Penetración_Mac: string;
    Precio_Promedio: number;
    Playtime_Promedio_Min: number;
    Score_Aprobacion_Global: number;
}
