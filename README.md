# Proyecto Avanzadas Datawarehouse

Este proyecto consta de un backend en Python (FastAPI) y un frontend en Angular para visualizar estadísticas de un almacén de datos (data warehouse).

## Requisitos Previos

Antes de comenzar, asegúrate de cumplir con los siguientes requisitos:
*   **Python 3.x**: [Descargar Python](https://www.python.org/downloads/)
*   **Node.js (v18+ recomendado)**: [Descargar Node.js](https://nodejs.org/)
*   **Angular CLI**: Instalar globalmente usando `npm install -g @angular/cli`
*   **MySQL Server**: Asegúrate de tener una instancia de MySQL en ejecución.

## Estructura del Proyecto

*   `backend/`: Aplicación FastAPI (Python)
*   `frontend/dw_steam/`: Aplicación Angular (TypeScript)
*   `Creaccion/`: Scripts de creación de la base de datos (SQL)

## Instalación y Configuración

### 1. Configuración de la Base de Datos

1.  Asegúrate de que tu servidor MySQL esté en ejecución.
2.  Crea una nueva base de datos (por ejemplo, `steam_dw`).
3.  Ejecuta los scripts SQL ubicados en la carpeta `Creaccion/` para configurar el esquema y las tablas.
    *   Puedes usar una herramienta como MySQL Workbench o la línea de comandos para ejecutar estos scripts.

### 2. Configuración del Backend

1.  Navega al directorio del backend:
    ```bash
    cd backend
    ```

2.  Crea un entorno virtual:
    *   **Windows**:
        ```bash
        python -m venv venv
        ```
    *   **Linux/Mac**:
        ```bash
        python3 -m venv venv
        ```

3.  Activa el entorno virtual:
    *   **Windows**:
        ```bash
        .\venv\Scripts\activate
        ```
    *   **Linux/Mac**:
        ```bash
        source venv/bin/activate
        ```

4.  Instala las dependencias requeridas:
    ```bash
    pip install -r requirements.txt
    ```

5.  **Configuración**:
    Crea un archivo `.env` en el directorio `backend/` con los detalles de conexión a tu base de datos. Ejemplo:
    ```env
    DB_HOST=127.0.0.1
    DB_USER=tu_usuario_db
    DB_PASSWORD=tu_contraseña_db
    DB_NAME=steam_dw
    DB_PORT=3306
    ```
    *Nota: Usa `127.0.0.1` para `DB_HOST` en lugar de `localhost` para evitar posibles problemas de resolución.*

### 3. Configuración del Frontend

1.  Navega al directorio del frontend:
    ```bash
    cd frontend/dw_steam
    ```

2.  Instala las dependencias:
    ```bash
    npm install
    ```

## Ejecutando la Aplicación

### 1. Iniciar el Servidor Backend

Desde el directorio `backend/` (con tu entorno virtual activado):

```bash
uvicorn main:app --reload
```

La API estará disponible en `http://localhost:8000`. Puedes acceder a la documentación interactiva de la API en `http://localhost:8000/docs`.

### 2. Iniciar la Aplicación Frontend

Desde el directorio `frontend/dw_steam/`:

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`.

## Orden de Uso

1.  Asegúrate de que la Base de Datos esté corriendo.
2.  Inicia el Backend (Puerto 8000).
3.  Inicia el Frontend (Puerto 4200).
4.  Abre `http://localhost:4200` en tu navegador web.
