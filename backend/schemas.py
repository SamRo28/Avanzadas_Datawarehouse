from pydantic import BaseModel
from typing import List, Optional

# Query 1: Blue Ocean
class BlueOceanItem(BaseModel):
    combinacion_generos: str
    cantidad_competencia: int
    rating_promedio: float
    precio_promedio: float

# Query 2: Battle Royale Lifecycle
class BattleRoyaleLifecycleItem(BaseModel):
    anio: int
    lanzamientos: int
    tiempo_juego_promedio_minutos: float
    total_votos_positivos: int

# Query 3: Indie Success Formula
class IndieSuccessItem(BaseModel):
    total_indies_exitosos: int
    tiene_pixel_graphics: str
    tiene_roguelike: str
    tiene_2d: str
    tiene_strategy: str
    tiene_horror: str

# Query 4: Price Elasticity
class PriceElasticityItem(BaseModel):
    rango_propietarios: str
    cantidad_juegos_estrategia: int
    precio_ideal_promedio: float

# Query 5: Cost of Quality
class CostOfQualityItem(BaseModel):
    segmento_precio: Optional[str]
    total_juegos: int
    score_calidad_promedio: float
    promedio_votos_por_juego: float

# Query 6: F2P vs Premium
class F2PvsPremiumItem(BaseModel):
    modelo_negocio: str
    cantidad_titulos: int
    tiempo_juego_promedio_minutos: float
    tiempo_juego_mediana_minutos: float
    volumen_interaccion_total: int

# Query 7: Visual Assets Impact
class VisualAssetsImpactItem(BaseModel):
    estrategia_video: str
    estrategia_imagen: str
    cantidad_juegos: int
    usuarios_promedio_estimados: float

# Query 8: Copywriting & SEO
class CopywritingSEOItem(BaseModel):
    longitud_copywriting: str
    total_publicaciones: int
    impacto_en_ventas_avg: float

# Query 9: Multi-Platform Effect
class MultiPlatformItem(BaseModel):
    soporte_plataformas: str
    lanzamientos: int
    precio_promedio: float
    base_usuarios_promedio: float

# Query 10: Overhype Analysis
class OverhypeItem(BaseModel):
    name: str
    rango_propietarios: str
    positive_ratings: int
    negative_ratings: int
    tasa_aprobacion: float

# Query 11: Accessibility & Hardware
class AccessibilityHardwareItem(BaseModel):
    tipo_requisitos_estimado: str
    cantidad_lanzamientos: int
    usuarios_promedio: float

# Query 12: Dev Support Commitment
class DevSupportItem(BaseModel):
    nivel_soporte: str
    total_juegos: int
    rating_promedio: float

# Query 13: Publisher Success Ratio
class PublisherSuccessItem(BaseModel):
    publisher: str
    juegos_publicados: int
    precio_promedio: float
    total_votos_positivos: int
    tasa_de_exito_porcentaje: float

# Query 14: Specialization vs Generalist
class SpecializationItem(BaseModel):
    estrategia_estudio: str
    cantidad_estudios: int
    calidad_promedio_global: float

# Query 15: Decade Evolution
class DecadeEvolutionItem(BaseModel):
    Anio_Lanzamiento: int
    Categoria_Mercado: str
    Total_Lanzamientos: int
    Penetración_Mac: str
    Precio_Promedio: float
    Playtime_Promedio_Min: float
    Score_Aprobacion_Global: float
