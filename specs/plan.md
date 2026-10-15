# Plan de implementación

## Decisiones confirmadas

- HTML, Bootstrap CSS por CDN, CSS propio y JavaScript puro.
- Sin otras librerías, backend, base de datos ni instalación de dependencias.
- Open-Meteo para geocodificación y meteorología, sin llave para esta práctica.
- Tomar la primera coincidencia y mostrar región y país si existen.
- Mostrar hoy y los dos días siguientes.
- Utilizar °C, km/h y %.
- Fijar una versión concreta de Bootstrap CSS al implementar.
- Revisar los specs antes de implementar y esperar revisión entre etapas.
- No crear archivos ni realizar commits sin autorización.
- Implementar carga, errores y recuperación de controles desde el primer
  fetch, usando try/catch/finally. Esto permite probar cada etapa de forma
  independiente, incluso cuando falle la conexión.
- Mantener soluciones sencillas relacionadas con los temas de clase.

## Estructura propuesta

- index.html: formulario, mensajes, clima actual, pronóstico y enlace
  a Bootstrap CSS por CDN.
- estilos.css: personalización mínima y ajustes para teléfonos.
- app.js: eventos, consultas, estados y actualización del DOM.
- specs/weather-app.md: requisitos y criterios de aceptación.
- specs/plan.md: decisiones y etapas.
- specs/tasks.md: tareas y estado.
- README.md: instrucciones de ejecución y comprobación.

Conservar AGENTS.md y .gitignore. Mantener separados HTML, CSS y JavaScript
para facilitar la explicación y revisión. Crear únicamente los archivos
de la etapa autorizada.

## Contrato de Open-Meteo

Los parámetros y campos siguientes se verificaron en la documentación
oficial durante la preparación de los specs. Esto no implica que se hayan
ejecutado pruebas de las peticiones o de la aplicación.

### Geocodificación

Endpoint: https://geocoding-api.open-meteo.com/v1/search

Parámetros:
- name: búsqueda sin espacios iniciales o finales y codificada para URL.
- language=es.
- format=json.
- count=1.

Respuesta:
- results: coincidencias; puede faltar o estar vacío sin resultados.
- Usar la primera coincidencia.
- name, latitude y longitude.
- admin1 y country, si existen.

Las búsquedas de un carácter no devuelven resultados; dos caracteres
permiten coincidencia exacta. Los nombres traducidos dependen de su
disponibilidad y algunos campos pueden omitirse.

### Meteorología

Endpoint: https://api.open-meteo.com/v1/forecast

Parámetros:
- latitude y longitude de la ciudad elegida.
- current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m
- daily=temperature_2m_max,temperature_2m_min
- timezone=auto, requerido al solicitar datos diarios.
- forecast_days=3, para hoy y los dos días siguientes.
- temperature_unit=celsius.
- wind_speed_unit=kmh.

Respuesta:
- current.temperature_2m: temperatura en °C.
- current.apparent_temperature: sensación térmica en °C.
- current.weather_code: código WMO de la condición del cielo.
- current.wind_speed_10m: velocidad del viento en km/h.
- current.relative_humidity_2m: humedad en %.
- daily.time: arreglo de fechas.
- daily.temperature_2m_max y daily.temperature_2m_min: arreglos de °C.
- daily_units: unidades de los valores diarios.

Ambos servicios documentan errores HTTP con campos error y reason.
Comprobar respuesta.ok antes de utilizar los datos y presentar mensajes
comprensibles, no depender de mostrar el mensaje técnico del servicio.

Fuentes oficiales:
- https://open-meteo.com/en/docs
- https://open-meteo.com/en/docs/geocoding-api

## Flujo y temas de clase

1. Obtener referencias con getElementById.
2. Escuchar submit con addEventListener y usar preventDefault.
3. Validar el nombre antes de consultar.
4. Activar la carga con classList y evitar consultas simultáneas.
5. Dentro de try, consultar geocodificación con fetch y async/await.
6. Comprobar respuesta.ok, coincidencias y coordenadas.
7. Una vez autorizada su etapa, consultar clima actual y pronóstico
   manteniendo el mismo estado de carga.
8. Mostrar textos externos mediante textContent.
9. Recorrer los arreglos diarios con un ciclo sencillo.
10. Manejar errores con catch y actualizar la visibilidad con classList.
11. Restaurar controles y retirar la carga mediante finally al terminar
    la búsqueda, también si falla cualquiera de las peticiones.

Usar funciones cortas, nombres propios en español y camelCase, const y let.
Traducir los códigos WMO documentados a español y contemplar un código
desconocido. No convertir valores nulos en cero ni insertar datos externos
como HTML sin validarlos. Conservar las fechas diarias sin desplazarlas
por la zona horaria del navegador.

## Etapas

1. Revisar y aprobar los specs.
2. Crear la interfaz estática y adaptable.
3. Integrar validación y geocodificación, incluyendo desde el primer fetch:
   - Carga visible y prevención de consultas simultáneas.
   - Comprobación de respuesta.ok.
   - Manejo de errores con try/catch.
   - Recuperación de controles y retirada de carga con finally.
   - Pruebas independientes de éxito, ciudad inexistente, error HTTP,
     fallo de conexión y nueva búsqueda después del error.
4. Integrar clima actual y traducción de códigos WMO, extendiendo el manejo
   de estados a la consulta meteorológica.
5. Integrar pronóstico y completar los estados de toda la aplicación,
   manteniendo la carga hasta finalizar la secuencia.
6. Ejecutar las comprobaciones completas, corregir problemas y documentar.

Cada etapa requiere revisión antes de avanzar. La aprobación de estos
specs no autoriza por sí sola implementar la aplicación.

## Ejecución local

Cuando exista index.html:

1. Abrir una terminal en weather-app.
2. Ejecutar: py -m http.server 8000
3. Abrir: http://localhost:8000
4. Detener: Ctrl + C

Python solo sirve archivos estáticos. Las consultas y la lógica se ejecutan
en JavaScript en el navegador. Bootstrap por CDN y Open-Meteo requieren
conexión.

## Verificación y evidencias

Comprobar cada criterio de specs/weather-app.md. Usar las herramientas del
navegador para observar peticiones, simular desconexión y ralentizar la red.

Simular respuestas HTTP fallidas o incompletas de forma controlada; no
depender de que Open-Meteo falle realmente. Verificar la carga y la
recuperación desde la etapa de geocodificación y repetir las comprobaciones
al integrar meteorología y pronóstico.

Registrar resultados reales, errores y correcciones. No marcar pruebas
como aprobadas sin ejecutarlas.

Revisar git diff y git status --short en cada etapa. No ignorar AGENTS.md,
specs/, README.md ni las evidencias. Conservar evidencias de /init, /undo,
/redo y /compact cuando se realicen; no inventar su ejecución. Solo realizar
commits de las etapas revisadas con autorización explícita.

## Decisiones pendientes

No quedan decisiones funcionales pendientes de las discutidas.
La versión concreta de Bootstrap CSS se fijará al implementar la interfaz;
no se incorporará su JavaScript porque no es necesario para lo previsto.
