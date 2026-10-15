# Tareas

Las casillas marcadas corresponden únicamente a decisiones y revisiones
ya realizadas. La implementación y las pruebas siguen pendientes.
Marcar una tarea solo después de realizarla y comprobarla.

## 1. Revisar especificaciones

- [x] Revisar y aprobar los requisitos y criterios de aceptación ajustados.
- [x] Confirmar primera coincidencia de ciudad, con región y país si existen.
- [x] Confirmar pronóstico de hoy y los dos días siguientes.
- [x] Confirmar unidades: °C, km/h y %.
- [x] Confirmar Bootstrap CSS por CDN con versión fija al implementar.
- [x] Confirmar carga, errores y recuperación desde el primer fetch.
- [x] Consultar documentación oficial y confirmar parámetros y campos.
- [x] Aprobar el plan y autorizar únicamente la creación de los tres specs.
- [x] Obtener autorización para implementar la interfaz estática.

## 2. Interfaz estática

- [x] Fijar una versión concreta de Bootstrap CSS por CDN, sin su JavaScript.
- [x] Crear index.html con idioma español, viewport y Bootstrap CSS.
- [x] Agregar formulario con etiqueta, campo y botón.
- [x] Agregar zonas para carga y errores con anuncios accesibles.
- [x] Agregar secciones de clima actual y pronóstico.
- [x] Crear estilos.css con los ajustes necesarios.
- [ ] Revisar la interfaz a 320 y 375 píxeles.
- [x] Presentar la etapa para revisión.

## 3. Búsqueda de ciudades

- [ ] Crear app.js y enlazarlo desde index.html.
- [ ] Obtener elementos con getElementById.
- [ ] Manejar submit con addEventListener y preventDefault.
- [ ] Validar búsqueda vacía o con espacios sin hacer peticiones.
- [ ] Activar carga visible con classList y evitar consultas simultáneas.
- [ ] Consultar geocodificación con fetch, async/await y count=1.
- [ ] Comprobar respuesta.ok y manejar errores con try/catch.
- [ ] Comprobar coincidencias y validar las coordenadas.
- [ ] Mostrar la primera ciudad con región y país cuando existan.
- [ ] Recuperar controles y retirar la carga mediante finally.
- [ ] Probar ciudad real, búsqueda sin coincidencias y campo vacío.
- [ ] Probar error HTTP mediante simulación controlada.
- [ ] Probar fallo de conexión y nueva búsqueda después del error.
- [ ] Observar la carga con red ralentizada.
- [ ] Registrar resultados reales y presentar la etapa para revisión.

## 4. Clima actual

- [ ] Solicitar los cinco campos actuales acordados.
- [ ] Extender carga, comprobación HTTP y manejo de errores a la petición
      meteorológica, recuperando controles al terminar toda la búsqueda.
- [ ] Validar los datos necesarios sin convertir valores ausentes en cero.
- [ ] Mostrar valores y unidades con textContent.
- [ ] Traducir los códigos WMO a español.
- [ ] Contemplar códigos desconocidos.
- [ ] Comprobar éxito y recuperación tras fallo de la petición meteorológica.
- [ ] Presentar la etapa para revisión.

## 5. Pronóstico y estados

- [ ] Solicitar máximas y mínimas con forecast_days=3 y timezone=auto.
- [ ] Mostrar hoy y los dos días siguientes mediante arreglos y un ciclo sencillo.
- [ ] Mostrar fechas, máximas y mínimas en °C sin desplazamientos por zona horaria.
- [ ] Completar los estados de carga, éxito y error para toda la aplicación.
- [ ] Mantener carga y bloqueo de consultas simultáneas durante toda la secuencia.
- [ ] Verificar recuperación de controles si falla cualquiera de las peticiones.
- [ ] Evitar resultados anteriores confundidos con una nueva búsqueda.
- [ ] Comprobar una nueva búsqueda después de un error.
- [ ] Presentar la etapa para revisión.

## 6. Comprobaciones y documentación

- [ ] Probar una ciudad real en la aplicación completa.
- [ ] Probar una búsqueda sin coincidencias.
- [ ] Probar campo vacío y campo con espacios.
- [ ] Probar una búsqueda de un carácter.
- [ ] Probar fallo de conexión.
- [ ] Probar un error HTTP mediante simulación controlada.
- [ ] Probar una respuesta incompleta mediante simulación controlada.
- [ ] Observar carga con red ralentizada.
- [ ] Comparar fechas, valores y unidades con la respuesta de la API.
- [ ] Comprobar uso en teléfono y envío con Enter.
- [ ] Comprobar nueva búsqueda después de un error.
- [ ] Registrar evidencias reales y correcciones.
- [ ] Crear README.md con uso local, conexión y fuentes de datos.
- [ ] Revisar git diff y git status --short.
- [ ] Conservar evidencias de los comandos exigidos por la práctica cuando
      se ejecuten: /init, /undo, /redo y /compact.
- [ ] Presentar el resultado para revisión, sin realizar commits.
