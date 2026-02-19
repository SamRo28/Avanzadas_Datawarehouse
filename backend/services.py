from sqlalchemy.orm import Session
from sqlalchemy import text
import schemas

# Query 1
def get_blue_ocean(db: Session):
    query = text("""
        SELECT 
            genres AS combinacion_generos,
            COUNT(*) AS cantidad_competencia,
            ROUND(AVG(positive_ratings / (positive_ratings + negative_ratings)) * 100, 2) AS rating_promedio,
            ROUND(AVG(price), 2) AS precio_promedio
        FROM steam
        WHERE 
            release_date >= '2023-01-01'
            AND (positive_ratings + negative_ratings) > 50
        GROUP BY genres
        HAVING 
            cantidad_competencia < 20
            AND rating_promedio > 85
        ORDER BY rating_promedio DESC
        LIMIT 10;
    """)
    result = db.execute(query).fetchall()
    return [schemas.BlueOceanItem(
        combinacion_generos=row[0],
        cantidad_competencia=row[1],
        rating_promedio=row[2],
        precio_promedio=row[3]
    ) for row in result]

# Query 2
def get_battle_royale_lifecycle(db: Session):
    query = text("""
        SELECT 
            YEAR(s.release_date) AS anio,
            COUNT(*) AS lanzamientos,
            ROUND(AVG(s.average_playtime), 0) AS tiempo_juego_promedio_minutos,
            SUM(s.positive_ratings) AS total_votos_positivos
        FROM steam s
        JOIN steamspy_tag_data t ON s.appid = t.appid
        WHERE 
            t.battle_royale > 0
            AND s.release_date IS NOT NULL
            AND YEAR(s.release_date) >= 2017
        GROUP BY YEAR(s.release_date)
        ORDER BY anio DESC;
    """)
    result = db.execute(query).fetchall()
    return [schemas.BattleRoyaleLifecycleItem(
        anio=row[0],
        lanzamientos=row[1],
        tiempo_juego_promedio_minutos=row[2],
        total_votos_positivos=row[3]
    ) for row in result]

# Query 3
def get_indie_success(db: Session):
    query = text("""
        SELECT 
            COUNT(*) AS total_indies_exitosos,
            CONCAT(ROUND(SUM(CASE WHEN t.pixel_graphics > 0 THEN 1 ELSE 0 END) / COUNT(*) * 100, 1), '%') AS tiene_pixel_graphics,
            CONCAT(ROUND(SUM(CASE WHEN t.rogue_like > 0 THEN 1 ELSE 0 END) / COUNT(*) * 100, 1), '%') AS tiene_roguelike,
            CONCAT(ROUND(SUM(CASE WHEN t.tag_2d > 0 THEN 1 ELSE 0 END) / COUNT(*) * 100, 1), '%') AS tiene_2d,
            CONCAT(ROUND(SUM(CASE WHEN t.strategy > 0 THEN 1 ELSE 0 END) / COUNT(*) * 100, 1), '%') AS tiene_strategy,
            CONCAT(ROUND(SUM(CASE WHEN t.horror > 0 THEN 1 ELSE 0 END) / COUNT(*) * 100, 1), '%') AS tiene_horror
        FROM steam s
        JOIN steamspy_tag_data t ON s.appid = t.appid
        WHERE 
            t.indie > 0
            AND s.owners NOT IN ('0 .. 20,000', '20,000 .. 50,000', '50,000 .. 100,000');
    """)
    result = db.execute(query).fetchall()
    return [schemas.IndieSuccessItem(
        total_indies_exitosos=row[0],
        tiene_pixel_graphics=row[1],
        tiene_roguelike=row[2],
        tiene_2d=row[3],
        tiene_strategy=row[4],
        tiene_horror=row[5]
    ) for row in result]

# Query 4
def get_price_elasticity(db: Session):
    query = text("""
        SELECT 
            owners AS rango_propietarios,
            COUNT(*) AS cantidad_juegos_estrategia,
            ROUND(AVG(price), 2) AS precio_ideal_promedio
        FROM steam s
        JOIN steamspy_tag_data t ON s.appid = t.appid
        WHERE 
            t.strategy > 0
            AND price > 0
        GROUP BY owners
        ORDER BY 
            CAST(REPLACE(SUBSTRING_INDEX(owners, ' ..', 1), ',', '') AS UNSIGNED) DESC;
    """)
    result = db.execute(query).fetchall()
    return [schemas.PriceElasticityItem(
        rango_propietarios=row[0],
        cantidad_juegos_estrategia=row[1],
        precio_ideal_promedio=row[2]
    ) for row in result]

# Query 5
def get_cost_of_quality(db: Session):
    query = text("""
        SELECT 
            CASE 
                WHEN price < 5 THEN 'Budget (< $5)'
                WHEN price BETWEEN 5 AND 19.99 THEN 'Standard ($5 - $19.99)'
                WHEN price BETWEEN 20 AND 39.99 THEN 'Premium ($20 - $39.99)'
                WHEN price >= 40 THEN 'AAA / High-End ($40+)'
            END AS segmento_precio,
            COUNT(*) AS total_juegos,
            ROUND(AVG(positive_ratings / NULLIF(positive_ratings + negative_ratings, 0)) * 100, 2) AS score_calidad_promedio,
            ROUND(AVG(positive_ratings + negative_ratings), 0) AS promedio_votos_por_juego
        FROM steam
        WHERE 
            price > 0
            AND (positive_ratings + negative_ratings) > 50
        GROUP BY segmento_precio
        ORDER BY score_calidad_promedio DESC;
    """)
    result = db.execute(query).fetchall()
    return [schemas.CostOfQualityItem(
        segmento_precio=row[0],
        total_juegos=row[1],
        score_calidad_promedio=row[2] or 0.0,
        promedio_votos_por_juego=row[3] or 0.0
    ) for row in result]

# Query 6
def get_f2p_vs_premium(db: Session):
    query = text("""
        SELECT 
            CASE 
                WHEN price = 0 THEN 'Free-to-Play'
                ELSE 'Premium (Pago)'
            END AS modelo_negocio,
            COUNT(*) AS cantidad_titulos,
            ROUND(AVG(average_playtime), 0) AS tiempo_juego_promedio_minutos,
            ROUND(AVG(median_playtime), 0) AS tiempo_juego_mediana_minutos,
            SUM(positive_ratings + negative_ratings) AS volumen_interaccion_total
        FROM steam
        GROUP BY modelo_negocio;
    """)
    result = db.execute(query).fetchall()
    return [schemas.F2PvsPremiumItem(
        modelo_negocio=row[0],
        cantidad_titulos=row[1],
        tiempo_juego_promedio_minutos=row[2],
        tiempo_juego_mediana_minutos=row[3],
        volumen_interaccion_total=row[4]
    ) for row in result]

# Query 7
def get_visual_assets_impact(db: Session):
    query = text("""
        SELECT 
            CASE 
                WHEN m.movies IS NOT NULL AND LENGTH(m.movies) > 2 THEN 'Con Trailer'
                ELSE 'Sin Trailer' 
            END AS estrategia_video,
            CASE 
                WHEN (LENGTH(m.screenshots) - LENGTH(REPLACE(m.screenshots, ',', '')) + 1) >= 5 THEN 'Visualmente Rico (5+ Screens)'
                ELSE 'Visualmente Pobre (<5 Screens)' 
            END AS estrategia_imagen,
            COUNT(*) AS cantidad_juegos,
            ROUND(AVG(CAST(REPLACE(SUBSTRING_INDEX(s.owners, ' ..', 1), ',', '') AS UNSIGNED))) AS usuarios_promedio_estimados
        FROM steam s
        JOIN steam_media_data m ON s.appid = m.steam_appid
        GROUP BY estrategia_video, estrategia_imagen
        ORDER BY usuarios_promedio_estimados DESC;
    """)
    result = db.execute(query).fetchall()
    return [schemas.VisualAssetsImpactItem(
        estrategia_video=row[0],
        estrategia_imagen=row[1],
        cantidad_juegos=row[2],
        usuarios_promedio_estimados=row[3]
    ) for row in result]

# Query 8
def get_copywriting_seo(db: Session):
    query = text("""
        SELECT 
            CASE 
                WHEN LENGTH(d.detailed_description) < 1500 THEN 'Breve (< 1.5k caracteres)'
                WHEN LENGTH(d.detailed_description) BETWEEN 1500 AND 5000 THEN 'Estándar (1.5k - 5k)'
                WHEN LENGTH(d.detailed_description) > 5000 THEN 'Extensa / Detallada (> 5k)'
                ELSE 'Sin Descripción'
            END AS longitud_copywriting,
            COUNT(*) AS total_publicaciones,
            ROUND(AVG(CAST(REPLACE(SUBSTRING_INDEX(s.owners, ' ..', 1), ',', '') AS UNSIGNED))) AS impacto_en_ventas_avg
        FROM steam s
        JOIN steam_description_data d ON s.appid = d.steam_appid
        WHERE d.detailed_description IS NOT NULL
        GROUP BY longitud_copywriting
        ORDER BY impacto_en_ventas_avg DESC;
    """)
    result = db.execute(query).fetchall()
    return [schemas.CopywritingSEOItem(
        longitud_copywriting=row[0],
        total_publicaciones=row[1],
        impacto_en_ventas_avg=row[2]
    ) for row in result]

# Query 9
def get_multi_platform_effect(db: Session):
    query = text("""
        SELECT 
            platforms AS soporte_plataformas,
            COUNT(*) AS lanzamientos,
            ROUND(AVG(price), 2) AS precio_promedio,
            ROUND(AVG(CAST(REPLACE(SUBSTRING_INDEX(owners, ' ..', 1), ',', '') AS UNSIGNED))) AS base_usuarios_promedio
        FROM steam
        GROUP BY platforms
        HAVING lanzamientos > 50
        ORDER BY base_usuarios_promedio DESC;
    """)
    result = db.execute(query).fetchall()
    return [schemas.MultiPlatformItem(
        soporte_plataformas=row[0],
        lanzamientos=row[1],
        precio_promedio=row[2],
        base_usuarios_promedio=row[3]
    ) for row in result]

# Query 10
def get_overhype_analysis(db: Session):
    query = text("""
        SELECT 
            name,
            owners AS rango_propietarios,
            positive_ratings,
            negative_ratings,
            ROUND((positive_ratings / (positive_ratings + negative_ratings)) * 100, 1) AS tasa_aprobacion
        FROM steam
        WHERE 
            owners IN ('200,000 .. 500,000', '500,000 .. 1,000,000', '1,000,000 .. 2,000,000', '2,000,000 .. 5,000,000')
            AND (positive_ratings + negative_ratings) > 500
        HAVING tasa_aprobacion < 50
        ORDER BY owners DESC, tasa_aprobacion ASC
        LIMIT 15;
    """)
    result = db.execute(query).fetchall()
    return [schemas.OverhypeItem(
        name=row[0],
        rango_propietarios=row[1],
        positive_ratings=row[2],
        negative_ratings=row[3],
        tasa_aprobacion=row[4]
    ) for row in result]

# Query 11
def get_accessibility_hardware(db: Session):
    query = text("""
        SELECT 
            CASE 
                WHEN t.pixel_graphics > 0 OR t.tag_2d > 0 OR t.retro > 0 THEN 'Low Spec / Retro / 2D'
                WHEN t.open_world > 0 OR t.tag_3d > 0 OR t.beautiful > 0 THEN 'High Spec / 3D / Open World'
                ELSE 'Estándar / Otros' 
            END AS tipo_requisitos_estimado,
            COUNT(*) AS cantidad_lanzamientos,
            ROUND(AVG(CAST(REPLACE(SUBSTRING_INDEX(s.owners, ' ..', 1), ',', '') AS UNSIGNED))) AS usuarios_promedio
        FROM steam s
        JOIN steamspy_tag_data t ON s.appid = t.appid
        GROUP BY tipo_requisitos_estimado
        ORDER BY usuarios_promedio DESC;
    """)
    result = db.execute(query).fetchall()
    return [schemas.AccessibilityHardwareItem(
        tipo_requisitos_estimado=row[0],
        cantidad_lanzamientos=row[1],
        usuarios_promedio=row[2]
    ) for row in result]

# Query 12
def get_dev_support(db: Session):
    query = text("""
        SELECT 
            CASE 
                WHEN sup.support_email != '' AND sup.support_url != '' THEN 'Soporte Completo (Email + Web)'
                WHEN sup.support_email != '' OR sup.support_url != '' THEN 'Soporte Parcial'
                ELSE 'Sin Contacto Directo' 
            END AS nivel_soporte,
            COUNT(*) AS total_juegos,
            ROUND(AVG(s.positive_ratings / NULLIF(s.positive_ratings + s.negative_ratings, 0)) * 100, 2) AS rating_promedio
        FROM steam s
        LEFT JOIN steam_support_info sup ON s.appid = sup.steam_appid
        WHERE (s.positive_ratings + s.negative_ratings) > 10
        GROUP BY nivel_soporte
        ORDER BY rating_promedio DESC;
    """)
    result = db.execute(query).fetchall()
    return [schemas.DevSupportItem(
        nivel_soporte=row[0],
        total_juegos=row[1],
        rating_promedio=row[2]
    ) for row in result]

# Query 13
def get_publisher_success(db: Session):
    query = text("""
        SELECT 
            publisher,
            COUNT(*) as juegos_publicados,
            ROUND(AVG(price), 2) as precio_promedio,
            SUM(positive_ratings) as total_votos_positivos,
            ROUND(
                (SUM(CASE WHEN (positive_ratings / (positive_ratings + negative_ratings)) > 0.8 THEN 1 ELSE 0 END) / COUNT(*)) * 100
            , 2) as tasa_de_exito_porcentaje
        FROM steam
        WHERE publisher != '' AND publisher IS NOT NULL
        GROUP BY publisher
        HAVING juegos_publicados > 10
        ORDER BY tasa_de_exito_porcentaje DESC
        LIMIT 20;
    """)
    result = db.execute(query).fetchall()
    return [schemas.PublisherSuccessItem(
        publisher=row[0],
        juegos_publicados=row[1],
        precio_promedio=row[2],
        total_votos_positivos=row[3],
        tasa_de_exito_porcentaje=row[4]
    ) for row in result]

# Query 14
def get_specialization_generalist(db: Session):
    query = text("""
        WITH DeveloperStats AS (
            SELECT 
                developer,
                COUNT(*) AS total_juegos,
                COUNT(DISTINCT SUBSTRING_INDEX(genres, ';', 1)) AS generos_distintos_probados,
                AVG(positive_ratings / NULLIF(positive_ratings + negative_ratings, 0)) AS calidad_avg_dev
            FROM steam
            WHERE developer != '' AND (positive_ratings + negative_ratings) > 0
            GROUP BY developer
            HAVING total_juegos >= 5
        )
        SELECT 
            CASE 
                WHEN generos_distintos_probados = 1 THEN 'Especialista (1 Género)'
                WHEN generos_distintos_probados BETWEEN 2 AND 3 THEN 'Flexible (2-3 Géneros)'
                ELSE 'Generalista (>3 Géneros)' 
            END AS estrategia_estudio,
            COUNT(*) AS cantidad_estudios,
            ROUND(AVG(calidad_avg_dev) * 100, 2) AS calidad_promedio_global
        FROM DeveloperStats
        GROUP BY estrategia_estudio
        ORDER BY calidad_promedio_global DESC;
    """)
    result = db.execute(query).fetchall()
    return [schemas.SpecializationItem(
        estrategia_estudio=row[0],
        cantidad_estudios=row[1],
        calidad_promedio_global=row[2]
    ) for row in result]

# Query 15
def get_decade_evolution(db: Session):
    query = text("""
        SELECT 
            YEAR(s.release_date) AS Anio_Lanzamiento,
            CASE 
                WHEN t.indie > 0 THEN 'Indie' 
                ELSE 'Mainstream / Otros' 
            END AS Categoria_Mercado,
            COUNT(s.appid) AS Total_Lanzamientos,
            CONCAT(ROUND(
                (SUM(CASE WHEN s.platforms LIKE '%mac%' THEN 1 ELSE 0 END) / COUNT(*)) * 100
            , 1), '%') AS Penetración_Mac,
            ROUND(AVG(s.price), 2) AS Precio_Promedio,
            ROUND(AVG(s.average_playtime), 0) AS Playtime_Promedio_Min,
            ROUND(
                (SUM(s.positive_ratings) / NULLIF(SUM(s.positive_ratings) + SUM(s.negative_ratings), 0)) * 100
            , 2) AS Score_Aprobacion_Global
        FROM 
            steam s
        JOIN 
            steamspy_tag_data t ON s.appid = t.appid
        WHERE 
            s.release_date IS NOT NULL 
            AND YEAR(s.release_date) >= 2012
            AND YEAR(s.release_date) <= 2024
        GROUP BY 
            YEAR(s.release_date), 
            Categoria_Mercado
        ORDER BY 
            Anio_Lanzamiento DESC, 
            Categoria_Mercado;
    """)
    result = db.execute(query).fetchall()
    return [schemas.DecadeEvolutionItem(
        Anio_Lanzamiento=row[0],
        Categoria_Mercado=row[1],
        Total_Lanzamientos=row[2],
        Penetración_Mac=row[3],
        Precio_Promedio=row[4],
        Playtime_Promedio_Min=row[5],
        Score_Aprobacion_Global=row[6] or 0.0
    ) for row in result]
