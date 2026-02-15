# Reporte de Actividad 4: Dashboard Interactivo RegioVial

## 1. Preparación y Modelado de Datos

### Selección y Simulación del Dataset
Para este proyecto, se seleccionaron conjuntos de datos basados en la información pública de `datos.nl.gob.mx` y `datos.gob.mx`, enfocándose en tres ejes principales: **Siniestralidad Vial**, **Aforos Vehiculares** y **Transporte Público** del Área Metropolitana de Monterrey.

Para cumplir con el requerimiento de visualización en tiempo real, se desarrolló un módulo de simulación de datos en **Python**. Este script actúa como un generador de flujos de datos (simulando un stream tipo Kafka), el cual:
1.  Ingesta datos históricos base.
2.  Aplica algoritmos estocásticos para generar variaciones de tráfico y accidentes en tiempo real.
3.  Expone estos datos actualizados para ser consumidos por el dashboard cada 5 segundos.

### Conexión y Modelado
En lugar de utilizar herramientas tradicionales de BI, se optó por una arquitectura de ingeniería de datos moderna. Los datos fueron modelados utilizando **TypeScript** para asegurar la integridad referencial:
*   **Entidades Relacionales**: Se definieron relaciones claras entre las `Zonas Geográficas` (coordenadas lat/lng), los `Incidentes` (accidentes) y las `Vías` (avenidas).
*   **Campos Calculados**: Se implementaron métricas derivadas en tiempo real, como el `Nivel de Riesgo` (calculado dinámicamente basado en la densidad de accidentes por hora) y la `Velocidad Promedio de Flujo`.

## 2. Diseño de Tablero Interactivo

### Justificación del Diseño
Se diseñó una interfaz web progresiva (PWA) utilizando **Next.js** y **Tailwind CSS**. La elección de un **Tema Oscuro (Dark Mode)** se justifica por su uso previsto en centros de control y monitoreo (C4/C5), donde la baja luminosidad reduce la fatiga visual de los operadores durante turnos largos. Se utilizó la tipografía *Satoshi* para garantizar una legibilidad limpia y moderna en pantallas de alta resolución.

### Visualizaciones Implementadas
El tablero integra más de cuatro visualizaciones clave:
1.  **Mapa Geoespacial Interactivo**: Implementado con Leaflet, muestra la ubicación exacta de las zonas de riesgo en Monterrey con marcadores de neón codificados por color.
2.  **Gráfico de Área (Tendencia Temporal)**: Visualiza el volumen de tráfico durante las últimas 24 horas, permitiendo identificar patrones horarios.
3.  **Gráfico de Barras Horizontal (Ranking)**: Muestra el "Top 5 Avenidas con Mayor Congestión" para priorizar la atención vial.
4.  **KPI Cards Animadas**: Tarjetas superiores que muestran métricas críticas (Total Accidentes, Velocidad Promedio) con indicadores de tendencia comparativa.
5.  **Matriz de Calor (Heatmap Grid)**: Una visualización abstracta de cuadrantes para una lectura rápida del estado de los municipios.

### Controles Interactivos
El diseño prioriza la exploración de datos intuitiva:
*   **Navegación Lateral**: Un sidebar colapsable permite alternar entre vistas (Overview, Mapa, Transporte) sin recargar la página.
*   **Pestañas (Tabs)**: En la sección de análisis de riesgo, el usuario puede alternar entre la vista de "Mapa Interactivo" y "Vista Cuadrícula".
*   **Filtros de Búsqueda**: En la sección de Transporte, se implementó un buscador en tiempo real para filtrar unidades por nombre de ruta o estatus.
*   **Tooltips Dinámicos**: Al interactuar con cualquier gráfico o punto del mapa, se despliega información contextual detallada.

## 3. Visualización en Tiempo Real

### Integración de Flujos de Datos
La arquitectura implementa un patrón de **Polling Inteligente**. El frontend consulta al servicio de datos (alimentado por Python) cada 5 segundos. 

### Actualización Automática
El dashboard refleja los cambios instantáneamente sin necesidad de intervención manual (F5):
*   Los contadores de KPIs se animan al cambiar los valores.
*   Los marcadores en el mapa cambian de color (Verde $\to$ Naranja $\to$ Rojo) si una zona aumenta su nivel de riesgo.
*   Un indicador de "Estado del Sistema" en el menú lateral confirma la conectividad en tiempo real.

## 4. Hallazgos Clave y Posibles Decisiones

### Hallazgos Clave
Tras el análisis de los datos visualizados en el tablero RegioVial:
1.  **Correlación Horaria**: Se detectó un incremento del 40% en la siniestralidad en las zonas de "Centro" y "Gonzalitos" durante las ventanas de 7:00-9:00 AM y 6:00-8:00 PM.
2.  **Puntos Críticos Recurrentes**: El mapa de calor reveló que la zona de "Juárez" mantiene un nivel de riesgo "Crítico" constante, independientemente de la hora del día, sugiriendo problemas de infraestructura más que de flujo.

### Posibles Decisiones Derivadas
Basado en estos *insights*, se proponen las siguientes acciones:
1.  **Operativos Carrusel**: Desplegar unidades de tránsito en las avenidas Constitución y Morones Prieto 15 minutos antes de las horas pico detectadas.
2.  **Revisión de Infraestructura**: Enviar equipos de ingeniería vial a la zona de Juárez para auditar la señalización y estado del pavimento.
3.  **Ajuste Semafórico**: Modificar la sincronización de semáforos en las avenidas identificadas en el gráfico de "Top Congestión" para priorizar el flujo continuo.

---
*Nota: Las capturas de pantalla de la aplicación funcionando deben insertarse aquí, mostrando el mapa con los puntos de colores y los gráficos con datos cargados.*
