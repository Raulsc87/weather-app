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
- [x] Revisar la interfaz a 320 y 375 píxeles: sin desplazamiento horizontal, superposiciones ni controles recortados (usuario, etapa 5).
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
- [x] Probar fallo de conexión y nueva búsqueda después del error (usuario; confirmación manual de etapa 4).
- [x] Observar la carga con red ralentizada (usuario, etapa 5: visible y botón bloqueado hasta terminar).
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
- Pendientes: navegador con botón y Enter y campo vacío en navegador.
  La carga con red ralentizada fue confirmada por el usuario en la etapa 5.
  La desconexión real y recuperación fueron
  confirmadas después por el usuario en la etapa 4. Madrid y sin coincidencias
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
- [x] Comprobar visualización del clima actual real en navegador (usuario: Madrid, cinco datos con unidades y cielo en español).
- [ ] Contrastar los cinco datos mostrados con la respuesta de Open-Meteo.
- [x] Comprobar aviso y limpieza de resultados ante ciudad inexistente (usuario).
- [x] Comprobar búsqueda de Quetzaltenango después del error (usuario).
- [x] Comprobar error, fin de carga y recuperación de controles sin conexión (usuario).
- [x] Comprobar búsqueda correcta al reconectar sin recargar (usuario).
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
- Las simulaciones no sustituyen pruebas de interfaz ni de conexión real.

Pruebas manuales de etapa 4 confirmadas por el usuario, no ejecutadas por el agente:
- Madrid muestra los cinco datos actuales con unidades y cielo en español.
- Una ciudad inexistente muestra un aviso y limpia los resultados anteriores.
- Una nueva búsqueda de Quetzaltenango funciona después del error.
- Sin conexión aparece un error, termina la carga y se recuperan los controles.
- Al reconectar se puede buscar correctamente sin recargar la página.

Pendientes: contraste de los cinco valores con la respuesta API, campo vacío
y métodos de envío en navegador con registro explícito, respuestas incompletas
en navegador y otras verificaciones sin registro. Red lenta, aspectos móviles
y visualización del pronóstico fueron confirmados después en la etapa 5.
Estas confirmaciones no acreditan criterios adicionales ni la verificación final.

## 5. Pronóstico y estados

- [x] Solicitar máximas y mínimas con forecast_days=3 y timezone=auto.
- [x] Implementar hoy y los dos días siguientes mediante arreglos y un ciclo sencillo.
- [x] Implementar fechas, máximas y mínimas en °C sin desplazamientos por zona horaria.
- [x] Completar los estados de carga, éxito y error para toda la aplicación.
- [x] Mantener carga y bloqueo de consultas simultáneas durante toda la secuencia (simulación del agente).
- [x] Verificar recuperación de controles ante HTTP fallido en ambas peticiones (simulación del agente).
- [x] Evitar resultados anteriores confundidos con una nueva búsqueda (simulación del agente).
- [x] Comprobar una nueva búsqueda después de un error (simulación del agente).
- [x] Presentar la etapa para revisión.
- [x] Comprobar clima actual y pronóstico de tres días visibles en navegador (usuario).
- [ ] Comprobar correspondencia exacta de las fechas con hoy y los dos días siguientes en la zona de la ciudad.
- [ ] Contrastar fechas, máximas y mínimas con la respuesta real de Open-Meteo.
- [x] Repetir ciudad inexistente, búsqueda posterior y desconexión/reconexión en navegador con pronóstico integrado (usuario).

Comprobaciones ejecutadas por el agente en la etapa 5:
- Documentación oficial consultada: daily, forecast_days y timezone confirmados.
- `node --check app.js`: sin errores de sintaxis.
- Node con DOM/fetch simulados: contrato current+daily, tres tarjetas por
  índice, cinco datos actuales conservados, unidades, ceros y negativos.
- Fechas idénticas en UTC, America/Guatemala, America/Los_Angeles y
  Pacific/Kiritimati; año bisiesto, cambio de mes/año y fechas de cambio
  de horario de verano. Sin pruebas de navegador.
- Rechazadas 40 respuestas diarias inválidas: arreglos ausentes o de longitud
  incorrecta, fechas imposibles o no consecutivas, temperaturas ausentes,
  cadenas, NaN/Infinity y unidades ausentes o incorrectas.
- Pasaron errores HTTP de ambas peticiones, red/JSON meteorológicos, ciudad
  sin coincidencias sin segunda petición, carga y bloqueo durante ambas
  peticiones, limpieza de todas las tarjetas y búsqueda correcta tras errores.
- Campo con espacios: sin peticiones y con limpieza de resultados anteriores.
- El agente no consultó la API real ni ejecutó pruebas de navegador de etapa 5.

Pruebas manuales de etapa 5 confirmadas por el usuario, no ejecutadas por el agente:
- Clima actual y pronóstico de tres días visibles.
- Ciudad inexistente limpia clima y pronóstico anteriores.
- Nueva búsqueda correcta después del error.
- Error sin conexión y recuperación al reconectar sin recargar.
- Con red lenta, carga visible y botón bloqueado hasta terminar.
- Vista móvil a 320 y 375 px sin desplazamiento horizontal,
  superposiciones ni controles recortados.

Siguen pendientes el contraste de valores y fechas con la respuesta API,
la correspondencia exacta de los días con la zona de la ciudad y las
comprobaciones no informadas. No se atribuyen nuevas ejecuciones al agente.

## 6. Comprobaciones y documentación

Esta sección corresponde a la verificación final con el pronóstico integrado.
Las repeticiones pendientes no anulan las pruebas parciales ya registradas
en las etapas 3 y 4. No se han ejecutado pruebas nuevas al reorganizar los specs.

- [x] Probar clima actual y pronóstico visibles en la aplicación completa (usuario, etapa 5).
- [x] Repetir búsqueda sin coincidencias y limpieza con pronóstico (usuario, etapa 5).
- [ ] Probar campo vacío y campo con espacios.
- [ ] Probar una búsqueda de un carácter.
- [x] Probar fallo de conexión y recuperación al reconectar sin recarga (usuario, etapa 5).
- [ ] Probar un error HTTP mediante simulación controlada.
- [ ] Probar una respuesta incompleta mediante simulación controlada.
- [x] Observar carga con red ralentizada y botón bloqueado hasta terminar (usuario, etapa 5).
- [ ] Comparar fechas, valores y unidades con la respuesta de la API.
- [x] Comprobar 320 y 375 px sin desplazamiento horizontal, superposiciones ni controles recortados (usuario, etapa 5).
- [ ] Comprobar envío con Enter en navegador.
- [ ] Comprobar legibilidad de todos los textos y mensajes y contenidos de tarjetas sin recortes en teléfono.
- [x] Comprobar nueva búsqueda después de un error (usuario, etapa 5).
- [ ] Registrar evidencias reales y correcciones.
- [ ] Crear README.md con uso local, conexión y fuentes de datos.
- [ ] Revisar git diff y git status --short.
- [ ] Conservar evidencias de los comandos exigidos por la práctica cuando
      se ejecuten: /init, /undo, /redo y /compact.
- [ ] Presentar el resultado para revisión, sin realizar commits.
