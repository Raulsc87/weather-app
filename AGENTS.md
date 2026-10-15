# Instrucciones del proyecto Weather App

## Objetivo

Desarrollar una aplicación web para buscar una ciudad y consultar
su clima actual y un pronóstico de al menos tres días.

El código debe ser sencillo, organizado y fácil de explicar
durante una revisión de clase.

## Tecnologías acordadas

- HTML para la estructura de la página.
- Bootstrap por CDN para formularios, botones, tarjetas y diseño adaptable.
- CSS propio para personalizar lo necesario.
- JavaScript puro para el funcionamiento.
- Open-Meteo como fuente de datos, sin llave de API.

No utilizar otros frameworks ni librerías.
No instalar dependencias sin consultarme primero.
No se necesita base de datos ni un backend propio.

## Temas de clase

Utilizar estos temas cuando sean necesarios:

- getElementById para obtener elementos del DOM.
- textContent para mostrar textos y datos.
- classList para mostrar, ocultar o cambiar estados visuales.
- addEventListener para manejar eventos.
- preventDefault para evitar que el formulario recargue la página.
- fetch para consultar las API.
- async y await para esperar las respuestas.
- respuesta.ok para comprobar el estado HTTP.
- try y catch para manejar errores.
- Arreglos y ciclos sencillos para recorrer el pronóstico.

Evitar soluciones complicadas cuando exista una alternativa clara.

## Requisitos de la aplicación

1. Buscar una ciudad por nombre y obtener sus coordenadas.
2. Mostrar temperatura actual, sensación térmica, condición del cielo,
   velocidad del viento y humedad.
3. Mostrar al menos tres días de pronóstico, indicando fecha,
   temperatura máxima y temperatura mínima.
4. Mostrar un mensaje visible mientras se consultan los datos.
5. Mostrar errores comprensibles cuando la ciudad no exista,
   falle el servicio o no haya conexión.
6. Permitir utilizar la interfaz desde una pantalla de teléfono.

Validar también que el campo de búsqueda no esté vacío.
La aplicación debe permitir intentar otra búsqueda después de un error.

## Uso de Open-Meteo

- Usar el servicio de geocodificación para buscar ciudades.
- Usar el servicio de pronóstico para consultar el clima.
- Revisar la documentación oficial antes de escribir las peticiones.
- Confirmar los parámetros y campos de respuesta; no inventarlos.
- Mostrar las unidades correspondientes a cada dato.
- Mostrar la condición del cielo con una descripción comprensible.

Documentación:
https://open-meteo.com/en/docs
https://open-meteo.com/en/docs/geocoding-api

## Decisiones agregadas manualmente

### Estructura prevista

- index.html: estructura de la página y enlaces a Bootstrap.
- estilos.css: personalización visual y ajustes para teléfonos.
- app.js: eventos, peticiones, manejo de estados y actualización del DOM.
- specs/weather-app.md: requisitos y criterios de aceptación.
- specs/plan.md: estructura y plan de implementación.
- specs/tasks.md: tareas y su estado.
- README.md: descripción e instrucciones de uso.
- AGENTS.md: instrucciones y decisiones del proyecto.
- .gitignore: archivos que Git debe ignorar.

Esta estructura es una propuesta.
No crear todos los archivos de una sola vez.

### Ejecución local

Cuando exista index.html:

1. Abrir una terminal en la carpeta weather-app.
2. Ejecutar: py -m http.server 8000
3. Abrir http://localhost:8000 en el navegador.
4. Detener el servidor con Ctrl + C.

Python se utiliza únicamente para servir los archivos estáticos.
La lógica de la aplicación se ejecuta en JavaScript en el navegador.

### Convenciones del código

- Usar nombres claros en español para variables y funciones propias.
- Escribir nombres con camelCase, por ejemplo: buscarCiudad.
- Usar const y let, evitando var.
- Mantener separados HTML, CSS y JavaScript.
- Crear funciones cortas con una responsabilidad clara.
- Agregar comentarios breves cuando ayuden a entender una decisión.
- No insertar datos externos como HTML sin validarlos.

## Forma de trabajo

- Responder en español con explicaciones claras y breves.
- Leer este archivo y los specs relevantes antes de modificar código.
- Preparar y revisar los specs antes de implementar la aplicación.
- En modo Plan, analizar y proponer sin modificar archivos.
- Antes de crear archivos, mostrar la estructura y esperar mi confirmación.
- En modo Build, implementar únicamente la etapa autorizada.
- Explicar qué cambió, por qué y cómo puedo comprobarlo.
- Permitir que revise cada cambio antes de continuar.
- No realizar commits ni subir cambios sin mi indicación.
- Actualizar este archivo cuando cambien las decisiones del proyecto.

## Comprobaciones

Durante las etapas correspondientes, verificar:

- Búsqueda de una ciudad real.
- Búsqueda de una ciudad inventada.
- Campo vacío o con espacios.
- Fallo de conexión.
- Estado de carga visible.
- Pronóstico con fechas y temperaturas correctas.
- Diseño en una pantalla angosta.
- Posibilidad de volver a buscar después de un error.

No afirmar que una prueba pasó si no se ejecutó.
Registrar errores reales y sus correcciones como evidencia.

## Git y evidencias

- Revisar los cambios con git diff.
- Guardar las etapas revisadas mediante commits separados.
- No incluir credenciales en archivos versionados.
- No ignorar AGENTS.md, specs/, README.md ni las evidencias.
- Conservar evidencia de las pruebas y de los comandos exigidos
  por la práctica: /init, /undo, /redo y /compact.