# Tareas

Las casillas marcadas corresponden al trabajo realizado.
Las tareas de implementación y pruebas sin marcar siguen pendientes.
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
- [x] Aprobar la reorganización del spec en seis secciones y sus ajustes.

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

- [x] Crear app.js y enlazarlo desde index.html.
- [x] Obtener elementos con getElementById.
- [x] Manejar submit con addEventListener y preventDefault.
- [x] Validar búsqueda vacía o con espacios sin hacer peticiones.
- [x] Activar carga visible con classList y evitar consultas simultáneas.
- [x] Consultar geocodificación con fetch, async/await y count=1.
- [x] Comprobar respuesta.ok y manejar errores con try/catch.
- [x] Comprobar coincidencias y validar las coordenadas.
- [x] Mostrar la primera ciudad con región y país cuando existan.
- [x] Recuperar controles y retirar la carga mediante finally.
- [x] Probar Madrid en navegador (usuario; captura proporcionada según su confirmación).
- [x] Probar búsqueda sin coincidencias en navegador (usuario; captura proporcionada según su confirmación).
- [ ] Probar campo vacío en navegador con registro explícito.
- [x] Probar error HTTP mediante simulación controlada.
- [ ] Probar fallo de conexión y nueva búsqueda después del error.
- [ ] Observar la carga con red ralentizada.
- [x] Registrar los dos resultados manuales informados por el usuario y presentar la etapa para revisión.

Pruebas manuales de la etapa 3 realizadas por el usuario:
- Madrid: búsqueda comprobada en navegador, con captura proporcionada,
  según confirmación del usuario. No fue ejecutada por el agente.
- Búsqueda sin coincidencias: resultado comprobado en navegador, con captura
  proporcionada, según confirmación del usuario. No fue ejecutada por el agente.
- No se inventan nombres de archivo ni rutas de las capturas. Estos registros
  no acreditan clima real, desconexión, red lenta, vista móvil ni los métodos
  específicos de envío con botón o Enter.

Comprobaciones simuladas y de sintaxis ejecutadas por el agente en la etapa 3:
- `node --check app.js`: sin errores de sintaxis.
- Node con DOM y fetch simulados: pasaron campo vacío sin peticiones,
  recorte del nombre, parámetros, conservación de coordenadas, respuestas
  sin coincidencias o inválidas, coordenadas fuera de rango o no numéricas,
  errores HTTP, de red y de JSON, carga, bloqueo de consultas simultáneas
  y búsqueda correcta después de errores.
- El primer chequeo simulado falló por una tilde alterada en la entrada de
  PowerShell; se corrigió el chequeo y la repetición pasó. No fue un fallo
  de la aplicación.
- Pendientes: navegador con botón y Enter, campo vacío en navegador,
  desconexión real y carga con red ralentizada. Madrid y sin coincidencias
  ya constan como pruebas manuales del usuario, no del agente.

## 4. Clima actual

- [x] Solicitar los cinco campos actuales acordados.
- [x] Extender carga, comprobación HTTP y manejo de errores a la petición
      meteorológica, recuperando controles al terminar toda la búsqueda.
- [x] Validar los datos necesarios sin convertir valores ausentes en cero.
- [x] Mostrar valores y unidades con textContent.
- [x] Traducir los códigos WMO a español.
- [x] Contemplar códigos desconocidos.
- [x] Comprobar éxito y recuperación tras fallo de la petición meteorológica con DOM/fetch simulados (agente).
- [ ] Comprobar clima actual con Open-Meteo real y contrastar los cinco datos en navegador.
- [x] Presentar la etapa para revisión.

Comprobaciones documentales, de sintaxis y simuladas del agente en la etapa 4:
- Documentación oficial de Open-Meteo consultada para confirmar los cinco
  campos de current, unidades y tabla WMO, incluido el código 97.
- `node --check app.js`: sin errores de sintaxis.
- Node con DOM y fetch simulados: contrato actual sin daily, unidades,
  ceros válidos, temperaturas negativas, traducción de los 29 códigos WMO
  documentados y descripción alternativa para un código desconocido.
- Se rechazaron 25 variantes de campos nulos, ausentes, cadenas, NaN o
  Infinity, además de respuestas incompletas, humedad fuera de rango y
  viento negativo. No se mostraron datos anteriores ni ceros inventados.
- Pasaron errores HTTP de ambas peticiones y errores de red y JSON de la
  petición meteorológica. Se comprobó carga y bloqueo durante la segunda
  petición, limpieza previa, recuperación y búsqueda correcta tras errores.
- Campo vacío: sin peticiones y con limpieza de los resultados anteriores.
- Pendientes: consulta real del clima contra Open-Meteo y comprobaciones
  en navegador, incluida desconexión y red ralentizada. Estas simulaciones
  no sustituyen las pruebas de interfaz ni las de conexión real.

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

Esta sección corresponde a la verificación final con el pronóstico integrado.
Las repeticiones pendientes no anulan las pruebas parciales ya registradas
en las etapas 3 y 4. No se han ejecutado pruebas nuevas al reorganizar los specs.

- [ ] Probar una ciudad real en la aplicación completa.
- [ ] Repetir búsqueda sin coincidencias en la aplicación completa con pronóstico.
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
