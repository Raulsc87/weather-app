# Plan de implementación y apoyo operativo

El spec principal es weather-app.md: contiene las seis secciones, el modelo
de datos, decisiones y criterios R1–R6. tasks.md registra trabajo y pruebas.
Este documento detalla la ejecución técnica, sin dar por probadas etapas
solo porque están implementadas.

## Estructura y responsabilidades

- index.html: formulario, mensajes, ciudad, clima actual y tarjetas de
  pronóstico conectadas al DOM; Bootstrap CSS 5.3.8 por CDN.
- estilos.css: personalización mínima y ajustes visuales.
- app.js: eventos, geocodificación, clima actual y pronóstico, validación y DOM.
- specs/weather-app.md: spec principal en seis secciones.
- specs/plan.md: detalle operativo de etapas y comprobaciones.
- specs/tasks.md: seguimiento y evidencia, distinguiendo su procedencia.
- README.md: descripción, ejecución local, uso, estructura y limitaciones.
- AGENTS.md y .gitignore: instrucciones y reglas de Git existentes.

Mantener HTML, CSS y JavaScript separados. No instalar dependencias,
incorporar Bootstrap JavaScript ni crear backend o base de datos.

## Contrato de peticiones

### Geocodificación implementada

https://geocoding-api.open-meteo.com/v1/search

- name: búsqueda recortada y codificada para URL.
- language=es, format=json, count=1.
- Usar results[0] y validar name, latitude y longitude.
- admin1 y country son opcionales.
- results ausente o vacío: sin coincidencias; no consultar el clima.
- Un carácter no devuelve resultados; dos permiten coincidencia exacta.

### Clima actual implementado

https://api.open-meteo.com/v1/forecast

- latitude y longitude de la primera coincidencia validada.
- current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m
- temperature_unit=celsius, wind_speed_unit=kmh, timezone=auto.
- Validar current y daily antes de mostrar ciudad, clima y pronóstico.
- Traducir weather_code mediante condicionesWmo y contemplar desconocidos.
- La misma petición incluye daily y forecast_days para el pronóstico.

### Pronóstico implementado en la etapa 5

La petición meteorológica incluye:
- daily=temperature_2m_max,temperature_2m_min
- forecast_days=3, conservando timezone=auto.

Validar que daily.time, daily.temperature_2m_max y daily.temperature_2m_min
sean arreglos de exactamente tres elementos. Comprobar fechas ISO reales y
consecutivas, temperaturas finitas sin coerción y unidades diarias °C.
Recorrerlos por índice y llenar las tres tarjetas mediante textContent.
Interpretar y formatear las fechas con UTC conserva el día civil recibido
de la API con timezone=auto, independientemente de la zona del navegador.
No inventar datos incompletos ni convertir ausencias en cero.

Contrato y tipos detallados en la sección 3 de weather-app.md.
Fuentes consultadas durante las etapas anteriores:
- https://open-meteo.com/en/docs
- https://open-meteo.com/en/docs/geocoding-api

## Flujo y temas de clase

1. Obtener elementos con getElementById.
2. Escuchar submit con addEventListener y usar preventDefault.
3. Ignorar envíos simultáneos, recortar nombre y limpiar resultados anteriores.
4. Si está vacío, mostrar aviso sin peticiones.
5. Activar carga con classList y bloquear controles desde el primer fetch.
6. Dentro de try, consultar geocodificación con fetch y async/await.
7. Comprobar respuesta.ok, JSON, coincidencias y coordenadas.
8. Consultar clima actual y pronóstico manteniendo carga y bloqueo; comprobar
   respuesta.ok y validar los cinco campos actuales y los arreglos diarios.
9. Mostrar ciudad, clima y tres días válidos con textContent y un ciclo.
10. Manejar errores con catch y recuperar controles mediante finally.
11. Limpiar también las fechas y temperaturas diarias al iniciar otra búsqueda;
    un error de validación no deja resultados parciales ni datos anteriores.

Usar funciones cortas en español y camelCase, const y let. No insertar datos
externos como HTML sin validarlos.

## Etapas y estado

1. Specs aprobados y reorganización en seis secciones aprobada.
2. Interfaz implementada. Usuario confirma vista móvil a 320 y 375 px sin
   desplazamiento horizontal, superposiciones ni controles recortados.
   Legibilidad completa y otras comprobaciones no confirmadas siguen pendientes.
3. Búsqueda implementada, con simulaciones del agente registradas.
   El usuario comprobó Madrid y una búsqueda sin coincidencias en navegador
   y proporcionó capturas, según su confirmación. No son pruebas del agente.
4. Clima actual implementado. Sintaxis y simulaciones registradas. El usuario
   confirmó en navegador Madrid con cinco datos, unidades y cielo en español;
   aviso y limpieza ante ciudad inexistente; Quetzaltenango después del error;
   error sin conexión con fin de carga y controles recuperados; búsqueda
   correcta al reconectar sin recargar. Posteriormente confirmó el contraste
   de los cinco datos con la API para Quetzaltenango; valores en tasks.md.
5. Pronóstico autorizado e implementado; sintaxis y simulaciones registradas.
   Usuario confirma clima y tres días visibles, limpieza tras ciudad inexistente,
   búsqueda posterior correcta, error sin conexión y recuperación al reconectar
   sin recarga, carga visible y botón bloqueado con red lenta, y vista móvil.
   Posteriormente contrastó fechas y temperaturas del 15–17/10/2026 en
   America/Guatemala con la API. Es una observación puntual, no permanente.
6. Documentación creada y actualizada con autorización, sin cambios de código.
   Usuario confirma vacío/espacios sin peticiones y Enter sin recarga.
   Verificación completa y revisión final pendientes según tasks.md.

Carga, errores y recuperación se adelantaron al primer fetch para probar
cada etapa independientemente, incluida la simulación de fallos de conexión.
La carga cubre geocodificación, meteorología y presentación del pronóstico;
finally restaura los controles tanto en éxito como en error.

Cada nueva etapa requiere autorización y revisión. No crear todos los
archivos de una vez ni realizar commits sin indicación explícita.

## Ejecución local

1. Abrir una terminal en weather-app.
2. Ejecutar: py -m http.server 8000
3. Abrir: http://localhost:8000
4. Detener: Ctrl + C

Python sirve únicamente archivos estáticos; JavaScript se ejecuta en el
navegador. Bootstrap por CDN y Open-Meteo requieren conexión.

## Verificación y evidencia

- Seguir los comportamientos individuales R1–R6 del spec principal.
- Distinguir implementación, simulación del agente y prueba manual del usuario.
- Las capturas de Madrid y sin coincidencias respaldan esos resultados,
  no el clima real, desconexión, red lenta, Enter o diseño móvil.
- Las cinco comprobaciones manuales de la etapa 4 constan por confirmación
  del usuario en tasks.md, no como ejecución del agente. Incluyen clima
  actual, limpieza, reintento, desconexión y reconexión sin recarga.
- Las seis comprobaciones manuales de etapa 5 se registran por confirmación
  del usuario en tasks.md, no como pruebas ejecutadas por el agente.
- El usuario confirmó el contraste de Quetzaltenango con la API, así como
  vacío/espacios sin peticiones y Enter sin recarga. Registro puntual en tasks.md.
- No se conoce la hora exacta de aquella consulta: sigue pendiente comprobar
  explícitamente hoy/mañana/pasado mañana respecto del momento local.
- Usar las herramientas del navegador para las comprobaciones aún pendientes:
  envío con botón por separado, región/país, respuestas incompletas y aspectos móviles
  no confirmados. Red lenta y los aspectos móviles informados ya tienen registro.
- Simular errores HTTP y respuestas incompletas de forma controlada; no
  depender de que Open-Meteo falle realmente.
- Esas simulaciones ya pasaron en las etapas 3–5. No se repitieron al editar
  documentación; cualquier comprobación adicional en navegador sigue pendiente.
- Registrar resultado, origen y limitaciones; las simulaciones no sustituyen
  la integración real. No marcar nuevas pruebas por reorganizar los specs.
- Revisar git diff y git status --short. No ignorar AGENTS.md, specs/,
  README.md ni evidencias.
- Conservar evidencia de /init, /undo, /redo y /compact cuando se ejecuten;
  no inventar su ejecución. Commits únicamente con autorización explícita.
- El usuario confirma /undo → /redo → /undo, con diseño original restaurado.
  Se registra /compact y la recuperación del estado mediante lectura de archivos
  y Git, descartando el resumen desactualizado. Único indicador posterior
  conocido: aproximadamente 38.170 tokens, 10 % usado; sin medición anterior
  ni reducción calculable. Detalle y limitaciones de evidencia en tasks.md.
