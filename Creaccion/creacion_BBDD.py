import pandas as pd
from sqlalchemy import create_engine, text
import os

# ==========================================
# CONFIGURACIÓN DE USUARIO
# ==========================================
DB_HOST = 'localhost'
DB_USER = 'root'       # Tu usuario
DB_PASS = 'pass'   # Tu contraseña
DB_PORT = '3306'
DB_NAME = 'steam'
CSV_FOLDER = './'      # Ruta donde están tus 6 archivos .csv

# Definición de nombres de archivos y tablas
FILES = {
    'steam': 'steam.csv',
    'description': 'steam_description_data.csv',
    'media': 'steam_media_data.csv',
    'requirements': 'steam_requirements_data.csv',
    'support': 'steam_support_info.csv',
    'tags': 'steamspy_tag_data.csv'
}

# ==========================================
# FUNCIONES AUXILIARES
# ==========================================

def create_database():
    """Crea la base de datos si no existe."""
    # Conexión sin base de datos seleccionada para crear el esquema
    engine_temp = create_engine(f"mysql+mysqlconnector://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}")
    with engine_temp.connect() as conn:
        conn.execute(text(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}"))
        print(f"Base de datos '{DB_NAME}' verificada/creada.")

def get_engine():
    """Devuelve la conexión a la base de datos steam."""
    return create_engine(f"mysql+mysqlconnector://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}")

def clean_tag_columns(df):
    """Limpia nombres de columnas conflictivos para MySQL (ej. empezar con números)."""
    clean_cols = {}
    for col in df.columns:
        new_col = col
        # Reemplazar caracteres conflictivos
        new_col = new_col.replace('&', '_and_').replace(' ', '_').replace('-', '_')
        # Si empieza por número, añadir prefijo (ej. '1980s' -> 'tag_1980s')
        if new_col[0].isdigit():
            new_col = f"tag_{new_col}"
        clean_cols[col] = new_col
    
    return df.rename(columns=clean_cols)

def process_steam_main(file_path, engine):
    """Procesa la tabla principal 'steam'."""
    print("Procesando tabla principal: steam...")
    df = pd.read_csv(file_path)
    
    # Limpieza básica
    # Convertir release_date a datetime (errores se vuelven NaT)
    df['release_date'] = pd.to_datetime(df['release_date'], errors='coerce')
    
    # Asegurar que appid es único y entero
    df = df.drop_duplicates(subset=['appid'])
    
    # Escribir a SQL
    df.to_sql('steam', engine, if_exists='replace', index=False, chunksize=1000)
    
    # Definir Primary Key
    with engine.connect() as conn:
        conn.execute(text("ALTER TABLE steam ADD PRIMARY KEY (appid);"))
    print("Tabla 'steam' creada y cargada.")

def process_satellite_table(table_name, file_path, engine, fk_column_csv, ref_table='steam', ref_col='appid'):
    """
    Procesa tablas satélite.
    Filtra filas huérfanas (que no existen en la tabla steam) para asegurar integridad referencial.
    """
    print(f"Procesando tabla: {table_name}...")
    df = pd.read_csv(file_path)
    
    # Obtener lista de IDs válidos de la tabla principal para filtrar huérfanos
    with engine.connect() as conn:
        valid_ids = pd.read_sql(f"SELECT {ref_col} FROM {ref_table}", conn)[ref_col].tolist()
    
    original_count = len(df)
    
    # Renombrar columna clave si es necesario para facilitar join o limpieza
    # En tus CSVs, algunas usan 'steam_appid' y tags usa 'appid'.
    # Nos aseguramos de mantener IDs que existen en la tabla principal
    df = df[df[fk_column_csv].isin(valid_ids)]
    
    filtered_count = len(df)
    if original_count != filtered_count:
        print(f"  -> Se eliminaron {original_count - filtered_count} registros huérfanos en {table_name}.")

    # Limpieza específica para la tabla de tags (columnas con nombres raros)
    if table_name == 'steamspy_tag_data':
        df = clean_tag_columns(df)
        fk_column_csv = 'appid' # En este csv la columna se llama appid

    # Escribir a SQL
    df.to_sql(table_name, engine, if_exists='replace', index=False, chunksize=1000)
    
    # Configurar PK y FK
    with engine.connect() as conn:
        # Hacer la columna NO NULA para que pueda ser PK
        conn.execute(text(f"ALTER TABLE {table_name} MODIFY COLUMN {fk_column_csv} BIGINT NOT NULL;"))
        # Añadir PK
        conn.execute(text(f"ALTER TABLE {table_name} ADD PRIMARY KEY ({fk_column_csv});"))
        # Añadir FK
        print(f"  -> Creando Foreign Key para {table_name}...")
        conn.execute(text(
            f"ALTER TABLE {table_name} "
            f"ADD CONSTRAINT fk_{table_name}_{ref_table} "
            f"FOREIGN KEY ({fk_column_csv}) REFERENCES {ref_table}({ref_col}) "
            f"ON DELETE CASCADE;"
        ))

# ==========================================
# EJECUCIÓN PRINCIPAL
# ==========================================

def main():
    try:
        # 1. Crear Base de Datos
        create_database()
        engine = get_engine()
        
        # 2. Procesar tabla principal (steam)
        # Es fundamental cargar esta primero para las claves foráneas
        path_steam = os.path.join(CSV_FOLDER, FILES['steam'])
        process_steam_main(path_steam, engine)
        
        # 3. Procesar tablas satélite
        # Mapeo: Nombre tabla DB -> (Archivo, Columna ID en CSV)
        
        # steam_description_data (usa steam_appid)
        process_satellite_table('steam_description_data', 
                                os.path.join(CSV_FOLDER, FILES['description']), 
                                engine, 'steam_appid')
        
        # steam_media_data (usa steam_appid)
        process_satellite_table('steam_media_data', 
                                os.path.join(CSV_FOLDER, FILES['media']), 
                                engine, 'steam_appid')
        
        # steam_requirements_data (usa steam_appid)
        process_satellite_table('steam_requirements_data', 
                                os.path.join(CSV_FOLDER, FILES['requirements']), 
                                engine, 'steam_appid')
                                
        # steam_support_info (usa steam_appid)
        process_satellite_table('steam_support_info', 
                                os.path.join(CSV_FOLDER, FILES['support']), 
                                engine, 'steam_appid')

        # steamspy_tag_data (usa appid y tiene muchas columnas)
        process_satellite_table('steamspy_tag_data', 
                                os.path.join(CSV_FOLDER, FILES['tags']), 
                                engine, 'appid') # Aquí la key es appid

        print("\n=== PROCESO FINALIZADO CON ÉXITO ===")
        print(f"La base de datos '{DB_NAME}' está lista con todas las relaciones.")

    except Exception as e:
        print(f"\n❌ Ocurrió un error: {e}")

if __name__ == '__main__':
    main()