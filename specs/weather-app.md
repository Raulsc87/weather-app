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
- Pronóstico de tres días en las tarjetas existentes, con fechas, máximas y mínimas.
- Descripciones WMO en español y alternativa para códigos desconocidos.
- Validación, carga, bloqueo de búsquedas simultáneas y recuperación de errores.
- Estructura adaptable con Bootstrap; usuario confirma 320 y 375 px sin
  desplazamiento horizontal, superposiciones ni controles recortados.

Implementado no significa validado completamente en condiciones reales.

### Pendiente

- Contraste de fechas y temperaturas del pronóstico con la API y verificación
  exacta de hoy y los dos días siguientes en la zona de la ciudad.
- Contraste de valores actuales con la respuesta de la API y comprobaciones
  de navegador aún sin registro (por ejemplo, botón y Enter por separado).
- Otras comprobaciones no confirmadas, como legibilidad de todos los mensajes en móvil.
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

#### Clima actual: implementado y visualización comprobada por el usuario

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

#### Pronóstico: implementado y visualización comprobada por el usuario

La petición meteorológica incluye daily=temperature_2m_max,temperature_2m_min y forecast_days=3,
conservando timezone=auto, requerido para datos diarios.

| Campo | Tipo | Uso |
| --- | --- | --- |
| daily.time | Arreglo de fechas ISO | Hoy y los dos días siguientes en la ciudad. |
| daily.temperature_2m_max | Arreglo de números | Máximas en °C. |
| daily.temperature_2m_min | Arreglo de números | Mínimas en °C. |
| daily_units | Objeto | Unidades de los datos diarios. |

Los tres arreglos deben tener exactamente tres elementos. Se validan fechas
ISO YYYY-MM-DD reales y consecutivas, temperaturas numéricas finitas y unidades
diarias °C. Se relacionan por índice, sin convertir ausencias en cero.
Las fechas se interpretan y formatean en UTC para conservar la fecha civil
que la API entrega con timezone=auto, no para convertir la hora de la ciudad.

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
| clima | Referencia temporal a la respuesta meteorológica validada, con current, daily y daily_units. |
| tarjetasPronostico | Arreglo de tres objetos con referencias DOM: fecha, maxima y minima. No almacena datos de la API. |

La región y el país se muestran, pero no se guardan dentro de
ciudadSeleccionada. Al comenzar una búsqueda se borran la selección y los
datos anteriores, incluidas las tres tarjetas. Ciudad, clima y pronóstico
se presentan después de validar ambas respuestas y todos sus datos.

El parámetro local diario referencia el objeto externo daily sin renombrar
sus campos. Un ciclo sencillo recorre sus arreglos y llena las referencias
DOM de tarjetasPronostico; no hay almacenamiento persistente adicional.

## 4. Plan de implementación

| Etapa | Estado |
| --- | --- |
| 1. Specs | Preparados y aprobados; reorganización en seis secciones aprobada. |
| 2. Interfaz estática | Implementada; usuario confirma 320 y 375 px sin desplazamiento horizontal, superposiciones ni controles recortados. Otras verificaciones móviles no confirmadas siguen pendientes. |
| 3. Geocodificación | Implementada; Madrid y búsqueda sin coincidencias comprobadas manualmente por el usuario, con capturas. Simulaciones del agente registradas en tasks.md. |
| 4. Clima actual | Implementado; usuario confirma Madrid con cinco datos, unidades y cielo en español, limpieza ante ciudad inexistente, reintento con Quetzaltenango, desconexión y recuperación al reconectar sin recarga. Contraste con respuesta API pendiente. |
| 5. Pronóstico | Implementado; simulaciones del agente y pruebas manuales del usuario registradas: visualización, limpieza, reintento, desconexión/reconexión, red lenta y vista móvil. Contraste con API pendiente. |
| 6. Verificación final y documentación | Pendiente. |

Desde el primer fetch se utilizan carga, comprobación HTTP y
try/catch/finally. El bloqueo cubre geocodificación, meteorología y presentación
del clima actual y pronóstico.

Mantener getElementById, eventos, preventDefault, textContent, classList,
fetch, async/await y funciones sencillas en español, con arreglos y ciclos
en el pronóstico.

El detalle operativo está en plan.md; las tareas y evidencias, en tasks.md.
La etapa 5 fue autorizada. Avanzar a otra etapa requiere nueva autorización.

## 5. Criterios de aceptación

Cada casilla representa un comportamiento verificable, no solo código
implementado. Se identifica el origen de la evidencia cuando está marcada.
Las comprobaciones simuladas no sustituyen la aceptación real en navegador.
Las capturas de Madrid y sin coincidencias se registran según lo informado
por el usuario, sin atribuir su ejecución al agente ni inventar rutas.
Las pruebas manuales adicionales de las etapas 4 y 5 se registran por confirmación
del usuario en tasks.md; no fueron ejecutadas por el agente.

### R1. Buscar una ciudad

- [x] Obtener una ciudad real mediante geocodificación: Madrid (prueba manual del usuario, con captura).
- [x] Mostrar un aviso ante una búsqueda sin coincidencias (prueba manual del usuario, con captura).
- [x] Recortar espacios iniciales y finales antes de consultar (simulación del agente, etapa 3).
- [ ] Enviar con el botón sin recargar la página, comprobado en navegador.
- [ ] Enviar con Enter sin recargar la página, comprobado en navegador.
- [ ] Comprobar en navegador la primera coincidencia y su región y país disponibles.
- [x] No solicitar el clima cuando results falta o está vacío (simulación del agente: salida por error antes de consultar clima).

### R2. Mostrar el clima actual

- [x] Mostrar temperatura actual en °C (Madrid; prueba manual del usuario).
- [x] Mostrar sensación térmica actual en °C (Madrid; prueba manual del usuario).
- [x] Mostrar condición del cielo en español (Madrid; prueba manual del usuario).
- [x] Mostrar viento actual en km/h (Madrid; prueba manual del usuario).
- [x] Mostrar humedad actual en % (Madrid; prueba manual del usuario).
- [ ] Contrastar temperatura con la respuesta de Open-Meteo.
- [ ] Contrastar sensación térmica con la respuesta de Open-Meteo.
- [ ] Contrastar condición mostrada con weather_code de la respuesta.
- [ ] Contrastar viento con la respuesta de Open-Meteo.
- [ ] Contrastar humedad con la respuesta de Open-Meteo.
- [x] Traducir los 29 códigos WMO documentados (simulación del agente, etapa 4).
- [x] Mostrar «Condición no disponible» ante un código desconocido (simulación del agente, etapa 4).
- [x] Rechazar datos actuales ausentes o inválidos sin convertirlos en cero (simulación del agente, etapa 4).
- [x] Mostrar los ceros numéricos válidos y temperaturas negativas (simulación del agente, etapa 4).
- [ ] Comprobar en navegador que no se muestran undefined ni NaN ante una respuesta incompleta.

### R3. Mostrar el pronóstico

- [x] Mostrar clima actual y pronóstico de tres días en navegador (prueba manual del usuario, etapa 5).
- [ ] Comprobar con API real que el primer día es hoy en la ciudad.
- [ ] Comprobar con API real que el segundo día es mañana en la ciudad.
- [ ] Comprobar con API real que el tercer día es pasado mañana en la ciudad.
- [x] Mostrar una fecha por cada día sin desplazamientos por la zona del navegador (simulación del agente en cuatro zonas, etapa 5).
- [x] Mostrar máxima en °C por cada día (DOM/fetch simulados, etapa 5).
- [x] Mostrar mínima en °C por cada día (DOM/fetch simulados, etapa 5).
- [x] Relacionar fechas, máximas y mínimas por el mismo índice (simulación del agente, etapa 5).
- [x] Informar de datos diarios incompletos sin inventar valores (40 respuestas inválidas simuladas, etapa 5).
- [ ] Contrastar fechas, máximas y mínimas con la respuesta real en navegador.

### R4. Mostrar el estado de carga

- [x] Activar carga desde la geocodificación (simulación del agente, etapa 3).
- [x] Mantener carga durante la consulta actual (simulación del agente, etapa 4).
- [x] Impedir consultas simultáneas durante la secuencia actual (simulación del agente, etapa 4).
- [x] Retirar carga y recuperar controles mediante finally tras éxito (simulación del agente).
- [x] Retirar carga y recuperar controles tras error (simulación del agente de finally y prueba manual del usuario sin conexión).
- [x] Observar carga visible y botón bloqueado hasta terminar con red ralentizada (prueba manual del usuario, etapa 5).
- [x] Verificar la carga y bloqueo hasta presentar el pronóstico (DOM/fetch simulados, etapa 5).
- [x] Verificar búsqueda y recuperación de errores en navegador con pronóstico integrado (usuario: nueva búsqueda tras error y reconexión sin recarga).

### R5. Validar y permitir recuperación

- [x] Mostrar aviso para campo vacío sin peticiones (simulación del agente).
- [x] Tratar un campo con solo espacios como vacío (simulación del agente).
- [x] Mostrar error comprensible ante HTTP fallido en geocodificación (simulación del agente).
- [x] Mostrar error comprensible ante HTTP fallido en meteorología (simulación del agente).
- [x] Mostrar error ante respuesta actual incompleta (simulación del agente).
- [x] Manejar un fallo de red simulado sin afirmar una causa de conexión específica (simulación del agente).
- [x] Permitir búsqueda correcta después de errores simulados (simulación del agente).
- [x] Limpiar ciudad y clima anteriores antes de una nueva búsqueda (simulación del agente; usuario confirma limpieza ante ciudad inexistente).
- [x] Limpiar clima y pronóstico anteriores ante ciudad inexistente (prueba manual del usuario, etapa 5).
- [x] Comprobar el mensaje y recuperación ante desconexión real en navegador (usuario: error, fin de carga y controles recuperados).
- [x] Comprobar una nueva búsqueda tras error en navegador (usuario: Quetzaltenango después de ciudad inexistente).
- [x] Buscar correctamente al reconectar sin recargar la página (prueba manual del usuario).

### R6. Funcionar en teléfonos

- [ ] Verificar en navegador la configuración viewport para pantallas móviles.
- [x] Verificar a 320 px que no hay desplazamiento horizontal (prueba manual del usuario).
- [x] Verificar a 375 px que no hay desplazamiento horizontal (prueba manual del usuario).
- [ ] Verificar textos, mensajes y etiquetas legibles en teléfono.
- [x] Verificar ausencia de superposiciones a 320 y 375 px (prueba manual del usuario).
- [x] Verificar controles sin recortes a 320 y 375 px (prueba manual del usuario).
- [ ] Verificar específicamente que las tarjetas y sus contenidos no presentan recortes en teléfono.

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
