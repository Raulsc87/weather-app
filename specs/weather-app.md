# Especificación de Weather App

## 1. Objetivo

Desarrollar una aplicación web sencilla para buscar una ciudad, consultar
su clima actual y mostrar el pronóstico de hoy y los dos días siguientes.
El código debe utilizar los temas de clase y ser fácil de explicar durante
una revisión.

## 2. Alcance

### Tecnologías confirmadas

- HTML, Bootstrap CSS 5.3.8 por CDN, CSS propio y JavaScript puro.
- Open-Meteo para geocodificación y meteorología, sin llave para esta práctica.
- Sin backend, base de datos, otras librerías ni instalación de dependencias.

### Implementado

- Formulario de búsqueda y primera coincidencia de ciudad.
- Identificación de ciudad, región y país cuando están disponibles.
- Temperatura, sensación térmica, cielo, viento y humedad actuales.
- Descripciones WMO en español y alternativa para códigos desconocidos.
- Validación, carga, bloqueo de búsquedas simultáneas y recuperación de errores.
- Estructura adaptable con Bootstrap; revisión visual móvil pendiente.

Implementado no significa validado completamente en condiciones reales.

### Pendiente

- Consulta y presentación del pronóstico; las tres tarjetas son espacios sin datos.
- Pruebas reales del clima actual y comprobaciones completas en navegador.
- Pruebas de desconexión, red ralentizada y vista móvil con registro.
- Documentación final de uso.

### Fuera de alcance

Geolocalización, mapas, cuentas, favoritos, historial, gráficos y
actualizaciones automáticas.

## 3. Modelo de datos

No existe almacenamiento persistente ni base de datos. Los datos se
procesan en memoria y se muestran en el DOM.

### 3.1. Datos externos de Open-Meteo

#### Geocodificación: implementada

Endpoint: https://geocoding-api.open-meteo.com/v1/search

Parámetros: name recortado y codificado para URL, language=es,
format=json y count=1.

| Campo | Tipo | Uso y validación |
| --- | --- | --- |
| results | Arreglo opcional | Ausente o vacío: sin coincidencias. |
| results[0].name | Cadena | Nombre obligatorio, no vacío. |
| results[0].latitude | Número | Finito, entre -90 y 90. |
| results[0].longitude | Número | Finito, entre -180 y 180. |
| results[0].admin1 | Cadena opcional | Región, si está disponible. |
| results[0].country | Cadena opcional | País, si está disponible. |

Se usa la primera coincidencia. Un carácter no devuelve resultados;
dos caracteres permiten coincidencia exacta. Las traducciones de nombres
dependen de su disponibilidad.

#### Clima actual: implementado, pruebas reales pendientes

Endpoint: https://api.open-meteo.com/v1/forecast

Parámetros: latitude y longitude obtenidos de la ciudad,
current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m,
temperature_unit=celsius, wind_speed_unit=kmh y timezone=auto.

| Campo dentro de current | Tipo | Uso y validación |
| --- | --- | --- |
| temperature_2m | Número finito | Temperatura en °C. |
| apparent_temperature | Número finito | Sensación térmica en °C. |
| weather_code | Entero | Traducción WMO; desconocido: «Condición no disponible». |
| wind_speed_10m | Número finito >= 0 | Viento en km/h. |
| relative_humidity_2m | Número finito entre 0 y 100 | Humedad en %. |

Los valores ausentes o inválidos producen un error, no se convierten en
cero. Un cero numérico válido sí se muestra.

#### Pronóstico: aprobado, pendiente de implementación

Se añadirán daily=temperature_2m_max,temperature_2m_min y forecast_days=3,
conservando timezone=auto, requerido para datos diarios.

| Campo | Tipo | Uso previsto |
| --- | --- | --- |
| daily.time | Arreglo de fechas ISO | Hoy y los dos días siguientes en la ciudad. |
| daily.temperature_2m_max | Arreglo de números | Máximas en °C. |
| daily.temperature_2m_min | Arreglo de números | Mínimas en °C. |
| daily_units | Objeto | Unidades de los datos diarios. |

Los arreglos se relacionarán por índice. No se inventarán datos ni se
desplazarán las fechas por la zona horaria del navegador.

Ambos servicios documentan errores HTTP con campos error y reason.
La aplicación comprueba respuesta.ok y muestra mensajes comprensibles.

Fuentes oficiales consultadas durante las etapas anteriores:
- https://open-meteo.com/en/docs
- https://open-meteo.com/en/docs/geocoding-api

### 3.2. Estructuras internas de JavaScript

| Estructura actual | Contenido y función |
| --- | --- |
| buscando | Booleano que impide consultas simultáneas. |
| ciudadSeleccionada | null o { nombre, latitud, longitud }, correspondiente a los resultados mostrados. |
| condicionesWmo | Objeto que relaciona códigos numéricos con descripciones en español. |
| ubicacion | Arreglo local con región y país disponibles para formar el texto. |
| actual | Referencia temporal al objeto externo current validado; no es un modelo interno renombrado. |

La región y el país se muestran, pero no se guardan dentro de
ciudadSeleccionada. Al comenzar una búsqueda se borran la selección y los
datos anteriores. Ciudad y clima se presentan después de validar ambas
respuestas.

No se define todavía una nueva estructura interna de pronóstico: el acuerdo
es recorrer los arreglos diarios con un ciclo sencillo.

## 4. Plan de implementación

| Etapa | Estado |
| --- | --- |
| 1. Specs | Preparados y aprobados; reorganización en seis secciones aprobada. |
| 2. Interfaz estática | Implementada; revisión visual a 320 y 375 px pendiente. |
| 3. Geocodificación | Implementada; Madrid y búsqueda sin coincidencias comprobadas manualmente por el usuario, con capturas. Simulaciones del agente registradas en tasks.md. |
| 4. Clima actual | Implementado; simulaciones registradas, pruebas reales pendientes. |
| 5. Pronóstico | Pendiente. |
| 6. Verificación final y documentación | Pendiente. |

Desde el primer fetch se utilizan carga, comprobación HTTP y
try/catch/finally. El bloqueo actual cubre geocodificación y meteorología.

Mantener getElementById, eventos, preventDefault, textContent, classList,
fetch, async/await y funciones sencillas en español. Incorporar arreglos y
ciclos al pronóstico.

El detalle operativo está en plan.md; las tareas y evidencias, en tasks.md.
Cada nueva etapa requiere autorización; esta reorganización no autoriza
implementar funcionalidades.

## 5. Criterios de aceptación

Cada casilla representa un comportamiento verificable, no solo código
implementado. Se identifica el origen de la evidencia cuando está marcada.
Las comprobaciones simuladas no sustituyen la aceptación real en navegador.
Las capturas de Madrid y sin coincidencias se registran según lo informado
por el usuario, sin atribuir su ejecución al agente ni inventar rutas.

### R1. Buscar una ciudad

- [x] Obtener una ciudad real mediante geocodificación: Madrid (prueba manual del usuario, con captura).
- [x] Mostrar un aviso ante una búsqueda sin coincidencias (prueba manual del usuario, con captura).
- [x] Recortar espacios iniciales y finales antes de consultar (simulación del agente, etapa 3).
- [ ] Enviar con el botón sin recargar la página, comprobado en navegador.
- [ ] Enviar con Enter sin recargar la página, comprobado en navegador.
- [ ] Comprobar en navegador la primera coincidencia y su región y país disponibles.
- [x] No solicitar el clima cuando results falta o está vacío (simulación del agente: salida por error antes de consultar clima).

### R2. Mostrar el clima actual

Los siguientes criterios de integración real siguen pendientes, aunque
existen pruebas simuladas de presentación y validación en tasks.md.

- [ ] Mostrar temperatura real en °C, contrastada con la respuesta de Open-Meteo.
- [ ] Mostrar sensación térmica real en °C, contrastada con la respuesta.
- [ ] Mostrar condición del cielo real mediante traducción WMO al español.
- [ ] Mostrar viento real en km/h, contrastado con la respuesta.
- [ ] Mostrar humedad real en %, contrastada con la respuesta.
- [x] Traducir los 29 códigos WMO documentados (simulación del agente, etapa 4).
- [x] Mostrar «Condición no disponible» ante un código desconocido (simulación del agente, etapa 4).
- [x] Rechazar datos actuales ausentes o inválidos sin convertirlos en cero (simulación del agente, etapa 4).
- [x] Mostrar los ceros numéricos válidos y temperaturas negativas (simulación del agente, etapa 4).
- [ ] Comprobar en navegador que no se muestran undefined ni NaN ante una respuesta incompleta.

### R3. Mostrar el pronóstico

- [ ] Mostrar hoy según la zona horaria de la ciudad.
- [ ] Mostrar el día siguiente según la zona horaria de la ciudad.
- [ ] Mostrar el segundo día siguiente según la zona horaria de la ciudad.
- [ ] Mostrar una fecha por cada día sin desplazamientos por la zona del navegador.
- [ ] Mostrar máxima en °C por cada día.
- [ ] Mostrar mínima en °C por cada día.
- [ ] Relacionar fechas, máximas y mínimas por el mismo índice.
- [ ] Informar de datos diarios incompletos sin inventar valores.

### R4. Mostrar el estado de carga

- [x] Activar carga desde la geocodificación (simulación del agente, etapa 3).
- [x] Mantener carga durante la consulta actual (simulación del agente, etapa 4).
- [x] Impedir consultas simultáneas durante la secuencia actual (simulación del agente, etapa 4).
- [x] Retirar carga y recuperar controles mediante finally tras éxito (simulación del agente).
- [x] Retirar carga y recuperar controles mediante finally tras error (simulación del agente).
- [ ] Observar la carga visible en navegador con red ralentizada.
- [ ] Verificar la carga hasta finalizar el pronóstico una vez implementado.

### R5. Validar y permitir recuperación

- [x] Mostrar aviso para campo vacío sin peticiones (simulación del agente).
- [x] Tratar un campo con solo espacios como vacío (simulación del agente).
- [x] Mostrar error comprensible ante HTTP fallido en geocodificación (simulación del agente).
- [x] Mostrar error comprensible ante HTTP fallido en meteorología (simulación del agente).
- [x] Mostrar error ante respuesta actual incompleta (simulación del agente).
- [x] Manejar un fallo de red simulado sin afirmar una causa de conexión específica (simulación del agente).
- [x] Permitir búsqueda correcta después de errores simulados (simulación del agente).
- [x] Limpiar ciudad y clima anteriores antes de una nueva búsqueda (simulación del agente, etapa 4).
- [ ] Comprobar el mensaje y recuperación ante desconexión real en navegador.
- [ ] Comprobar una nueva búsqueda tras error en navegador con registro explícito.

### R6. Funcionar en teléfonos

- [ ] Verificar en navegador la configuración viewport para pantallas móviles.
- [ ] Verificar a 320 px que no hay desplazamiento horizontal.
- [ ] Verificar a 375 px que no hay desplazamiento horizontal.
- [ ] Verificar textos, mensajes y etiquetas legibles en teléfono.
- [ ] Verificar formulario y tarjetas sin superposiciones ni recortes en teléfono.

## 6. Decisiones tomadas y descartadas

| Tema | Decisión confirmada | Alternativa no elegida | Motivo |
| --- | --- | --- | --- |
| Ciudades homónimas | Primera coincidencia con región y país disponibles. | Seleccionar entre varias coincidencias. | Mantener sencilla la interfaz. |
| Período | Hoy y los dos días siguientes. | Tres días desde mañana. | Concretar el período del pronóstico. |
| Carga y errores | Desde el primer fetch y ampliados en cada etapa. | Dejarlos para la etapa del pronóstico. | Probar cada etapa independientemente. |
| Estilos | Bootstrap CSS por CDN, actualmente 5.3.8, y CSS propio. | Propuesta inicial sin Bootstrap. | Utilizar los temas vistos en clase y facilitar el diseño adaptable. |

Otras decisiones confirmadas: unidades fijas °C/km/h/%, JavaScript puro,
sin Bootstrap JavaScript, sin otras librerías, sin backend y sin base de
datos. No se atribuyen evaluaciones a alternativas que no se discutieron.

No quedan decisiones funcionales pendientes de las discutidas. La versión
de Bootstrap ya está fijada, no es una decisión pendiente.
