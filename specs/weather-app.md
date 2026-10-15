# Especificación de Weather App

## Alcance confirmado

Aplicación de una sola página para buscar una ciudad y consultar su clima
actual y un pronóstico de tres días. Usar HTML, Bootstrap CSS por CDN,
CSS propio y JavaScript puro. Sin backend, base de datos, otras librerías
ni instalación de dependencias.

Open-Meteo proporcionará la geocodificación y los datos meteorológicos,
sin llave de API para esta práctica. El código debe ser sencillo y fácil
de explicar en clase.

## Decisiones confirmadas

- Utilizar la primera coincidencia de geocodificación.
- Mostrar ciudad, región y país cuando estén disponibles.
- Mostrar hoy y los dos días siguientes, según la zona horaria de la ciudad.
- Utilizar °C para temperaturas, km/h para viento y % para humedad.
- Utilizar únicamente Bootstrap CSS por CDN, fijando su versión al implementar.
- Incorporar carga, errores y recuperación desde la primera petición fetch,
  para comprobar cada etapa independientemente.

## Requisitos y criterios de aceptación

### R1. Buscar una ciudad

- Enviar el formulario con el botón o con Enter no recarga la página.
- Eliminar los espacios iniciales y finales antes de buscar.
- Obtener las coordenadas mediante la geocodificación de Open-Meteo.
- Usar la primera coincidencia y mostrar el nombre de la ciudad consultada,
  su región y su país cuando estén disponibles.
- Si no hay coincidencias, mostrar un mensaje comprensible y no solicitar
  el clima. Contemplar que results pueda faltar o estar vacío.

### R2. Mostrar el clima actual

- Mostrar temperatura, sensación térmica, condición del cielo,
  velocidad del viento y humedad.
- Acompañar los valores con °C, km/h o %, según corresponda.
- Traducir weather_code a una descripción comprensible en español.
- Ante un código desconocido, mostrar "Condición no disponible".
- No presentar valores ausentes como cero ni mostrar undefined o NaN.

### R3. Mostrar el pronóstico

- Mostrar hoy y los dos días siguientes, según la zona horaria de la ciudad.
- Cada día incluye fecha, temperatura máxima y temperatura mínima en °C.
- Relacionar los arreglos de fechas, máximas y mínimas por su índice.
- Conservar la fecha de la ciudad sin desplazarla por la zona horaria
  del navegador.
- No inventar datos si la respuesta está incompleta.

### R4. Mostrar el estado de carga

- Incorporar carga visible desde la primera petición de geocodificación.
- Evitar búsquedas simultáneas mientras exista una consulta activa.
- Recuperar los controles y retirar la carga tanto en éxito como en error
  mediante finally.
- Al integrar meteorología, mantener la carga desde el inicio de la
  geocodificación hasta finalizar toda la secuencia de peticiones.

### R5. Validar y permitir recuperación

- Campo vacío o con espacios: mostrar un aviso sin hacer peticiones.
- Ciudad inexistente: informar que no se encontraron coincidencias.
- Respuesta HTTP fallida: informar que el servicio no pudo responder.
- Fallo de red: indicar que no se pudo conectar y sugerir revisar
  la conexión, sin afirmar una causa que el navegador no confirma.
- Respuesta incompleta: informar que faltan datos necesarios.
- Después de cualquier error, permitir corregir y volver a buscar.
- No presentar resultados anteriores como si fueran de la nueva ciudad.
- Desde la etapa de geocodificación, manejar errores HTTP y fallos de
  conexión con try/catch/finally.
- Comprobar en esa misma etapa que se puede volver a buscar después de
  un error, sin depender de implementar el clima o el pronóstico.

### R6. Funcionar en teléfonos

- Incluir configuración viewport.
- A 320 y 375 píxeles de ancho, no tener desplazamiento horizontal.
- Mantener legibles los datos, mensajes y etiquetas.
- Permitir utilizar el formulario y consultar las tarjetas sin
  superposiciones ni contenido recortado.

## Fuera de alcance

Geolocalización del dispositivo, mapas, cuentas, favoritos, historial,
gráficos y actualizaciones automáticas.

## Decisiones pendientes

No quedan decisiones funcionales pendientes de las discutidas.
La versión concreta de Bootstrap CSS se fijará al implementar la interfaz.
