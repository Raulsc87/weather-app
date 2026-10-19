# Weather App

Aplicación web para buscar una ciudad y consultar temperatura actual,
sensación térmica, cielo, viento y humedad. Incluye el pronóstico de hoy
y los dos días siguientes con fecha, temperatura máxima y mínima.

## Tecnologías

HTML, Bootstrap CSS 5.3.8 por CDN, CSS propio y JavaScript puro.
Datos de clima y geocodificación de [Open-Meteo](https://open-meteo.com/),
con ubicaciones de GeoNames. Sin llave de API, backend ni base de datos.

## Cómo ejecutarla

Necesitas Python con el comando `py` disponible y un navegador.
Abre una terminal en la carpeta `weather-app` y ejecuta:

```powershell
py -m http.server 8000
```

Abre **http://localhost:8000**. Para detener el servidor, pulsa `Ctrl + C`.
Python solo sirve los archivos; la aplicación funciona en el navegador.
Se necesita internet para consultar Open-Meteo y cargar Bootstrap desde su CDN.

## Cómo usarla

Escribe una ciudad, por ejemplo Quetzaltenango, y pulsa **Buscar** o `Enter`.
Espera a que termine la carga. Si aparece un error, puedes corregir el nombre
o restablecer la conexión y buscar de nuevo sin recargar la página.

## Archivos

- `index.html`: estructura, formulario y tarjetas.
- `estilos.css`: personalización visual y ajustes móviles.
- `app.js`: consultas, validaciones, estados y presentación de datos.
- `specs/weather-app.md`: requisitos y criterios de aceptación.
- `specs/plan.md`: plan técnico y estado de las etapas.
- `specs/tasks.md`: tareas, pruebas y pendientes con su procedencia.
- `AGENTS.md`: reglas y decisiones del proyecto.
- `.gitignore`: exclusiones de Git.
- `README.md`: instrucciones de uso.

## Limitaciones

Se utiliza la primera ciudad coincidente, con región y país cuando están
disponibles. Un nombre de un solo carácter no devuelve resultados.
Las unidades son fijas: °C, km/h y %. Las fechas corresponden a la zona
horaria de la ciudad. Los datos cambian con cada consulta y dependen del
servicio externo. No hay modo sin conexión, historial, mapas ni favoritos.

Hay pruebas manuales del usuario y simulaciones registradas; la verificación
final aún tiene pendientes detallados en `specs/tasks.md`.
