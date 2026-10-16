# Plan de implementación y apoyo operativo

El spec principal es weather-app.md: contiene las seis secciones, el modelo
de datos, decisiones y criterios R1–R6. tasks.md registra trabajo y pruebas.
Este documento detalla la ejecución técnica, sin dar por probadas etapas
solo porque están implementadas.

## Estructura y responsabilidades

- index.html: formulario, mensajes, ciudad, clima actual y tarjetas de
  pronóstico todavía sin datos; Bootstrap CSS 5.3.8 por CDN.
- estilos.css: personalización mínima y ajustes visuales.
- app.js: eventos, geocodificación, consulta actual, validación y DOM.
- specs/weather-app.md: spec principal en seis secciones.
- specs/plan.md: detalle operativo de etapas y comprobaciones.
- specs/tasks.md: seguimiento y evidencia, distinguiendo su procedencia.
- README.md: documentación de uso pendiente.
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
- Validar current antes de mostrar ciudad y clima.
- Traducir weather_code mediante condicionesWmo y contemplar desconocidos.
- No enviar daily ni solicitar pronóstico en la implementación actual.

### Ampliación aprobada, pendiente

En la etapa 5 se añadirán a la petición meteorológica:
- daily=temperature_2m_max,temperature_2m_min
- forecast_days=3, conservando timezone=auto.

Recorrer daily.time, daily.temperature_2m_max y daily.temperature_2m_min
por índice. Comprobar las unidades diarias y evitar desplazamientos de fecha
por la zona horaria del navegador. No inventar valores diarios incompletos.

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
8. Consultar clima actual manteniendo carga y bloqueo; comprobar respuesta.ok
   y validar los cinco campos, sin convertir valores ausentes en cero.
9. Mostrar ciudad y clima válidos con textContent.
10. Manejar errores con catch y recuperar controles mediante finally.
11. En la etapa 5, ampliar la validación y presentación al pronóstico,
    usando arreglos y ciclos sencillos, sin acortar la carga de la secuencia.

Usar funciones cortas en español y camelCase, const y let. No insertar datos
externos como HTML sin validarlos.

## Etapas y estado

1. Specs aprobados y reorganización en seis secciones aprobada.
2. Interfaz implementada. Revisión móvil a 320 y 375 px pendiente.
3. Búsqueda implementada, con simulaciones del agente registradas.
   El usuario comprobó Madrid y una búsqueda sin coincidencias en navegador
   y proporcionó capturas, según su confirmación. No son pruebas del agente.
4. Clima actual implementado. Sintaxis y simulaciones registradas. El usuario
   confirmó en navegador Madrid con cinco datos, unidades y cielo en español;
   aviso y limpieza ante ciudad inexistente; Quetzaltenango después del error;
   error sin conexión con fin de carga y controles recuperados; búsqueda
   correcta al reconectar sin recargar. Contraste de valores con la respuesta
   API y otras comprobaciones no registradas siguen pendientes.
5. Pronóstico pendiente de implementación y autorización.
6. Verificación completa y documentación pendientes.

Carga, errores y recuperación se adelantaron al primer fetch para probar
cada etapa independientemente, incluida la simulación de fallos de conexión.
La carga actual cubre geocodificación y meteorología; en la etapa 5 cubrirá
también la presentación del pronóstico.

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
- Mantener pendiente el contraste de los valores con la respuesta API.
- Usar las herramientas del navegador para las comprobaciones aún pendientes:
  contraste de respuestas, red ralentizada y vista a 320/375 px.
- Simular errores HTTP y respuestas incompletas de forma controlada; no
  depender de que Open-Meteo falle realmente.
- Registrar resultado, origen y limitaciones; las simulaciones no sustituyen
  la integración real. No marcar nuevas pruebas por reorganizar los specs.
- Revisar git diff y git status --short. No ignorar AGENTS.md, specs/,
  README.md ni evidencias.
- Conservar evidencia de /init, /undo, /redo y /compact cuando se ejecuten;
  no inventar su ejecución. Commits únicamente con autorización explícita.
