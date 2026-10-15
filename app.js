const formularioBusqueda = document.getElementById('formularioBusqueda');
const campoCiudad = document.getElementById('campoCiudad');
const botonBuscar = document.getElementById('botonBuscar');
const mensajeCarga = document.getElementById('mensajeCarga');
const mensajeError = document.getElementById('mensajeError');
const nombreCiudad = document.getElementById('nombreCiudad');
const ubicacionCiudad = document.getElementById('ubicacionCiudad');
const temperaturaActual = document.getElementById('temperaturaActual');
const sensacionTermica = document.getElementById('sensacionTermica');
const condicionCielo = document.getElementById('condicionCielo');
const velocidadViento = document.getElementById('velocidadViento');
const humedadActual = document.getElementById('humedadActual');
const tarjetasPronostico = [];
for (let indice = 0; indice < 3; indice++) {
  tarjetasPronostico.push({
    fecha: document.getElementById('fechaPronostico' + indice),
    maxima: document.getElementById('maximaPronostico' + indice),
    minima: document.getElementById('minimaPronostico' + indice)
  });
}

// Traducciones de la tabla WMO publicada por Open-Meteo.
const condicionesWmo = {
  0: 'Cielo despejado',
  1: 'Mayormente despejado',
  2: 'Parcialmente nublado',
  3: 'Cubierto',
  45: 'Niebla',
  48: 'Niebla con escarcha',
  51: 'Llovizna ligera',
  53: 'Llovizna moderada',
  55: 'Llovizna intensa',
  56: 'Llovizna helada ligera',
  57: 'Llovizna helada intensa',
  61: 'Lluvia ligera',
  63: 'Lluvia moderada',
  65: 'Lluvia intensa',
  66: 'Lluvia helada ligera',
  67: 'Lluvia helada intensa',
  71: 'Nevada ligera',
  73: 'Nevada moderada',
  75: 'Nevada intensa',
  77: 'Nieve granulada',
  80: 'Chubascos ligeros',
  81: 'Chubascos moderados',
  82: 'Chubascos violentos',
  85: 'Chubascos de nieve ligeros',
  86: 'Chubascos de nieve intensos',
  95: 'Tormenta eléctrica',
  96: 'Tormenta eléctrica con granizo ligero',
  97: 'Tormenta eléctrica intensa',
  99: 'Tormenta eléctrica con granizo intenso'
};

let buscando = false;
// Conserva la ubicación de los resultados mostrados.
let ciudadSeleccionada = null;

function cambiarCarga(activa) {
  buscando = activa;
  campoCiudad.disabled = activa;
  botonBuscar.disabled = activa;
  mensajeCarga.classList.toggle('d-none', !activa);
}

function limpiarResultado() {
  ciudadSeleccionada = null;
  nombreCiudad.textContent = 'Sin ciudad seleccionada';
  ubicacionCiudad.textContent = 'Región y país pendientes de una búsqueda válida.';
  temperaturaActual.textContent = 'Sin datos';
  sensacionTermica.textContent = 'Sin datos';
  condicionCielo.textContent = 'Sin datos';
  velocidadViento.textContent = 'Sin datos';
  humedadActual.textContent = 'Sin datos';
  for (let indice = 0; indice < tarjetasPronostico.length; indice++) {
    tarjetasPronostico[indice].fecha.textContent = 'Fecha pendiente';
    tarjetasPronostico[indice].maxima.textContent = 'Sin datos';
    tarjetasPronostico[indice].minima.textContent = 'Sin datos';
  }
  mensajeError.textContent = '';
  mensajeError.classList.add('d-none');
}

function mostrarError(texto) {
  mensajeError.textContent = texto;
  mensajeError.classList.remove('d-none');
}

function validarCiudad(ciudad) {
  if (!ciudad || typeof ciudad.name !== 'string' || !ciudad.name.trim()
      || !Number.isFinite(ciudad.latitude) || !Number.isFinite(ciudad.longitude)
      || ciudad.latitude < -90 || ciudad.latitude > 90
      || ciudad.longitude < -180 || ciudad.longitude > 180) {
    throw new Error('El servicio devolvió una ciudad o coordenadas inválidas. Intenta otra búsqueda.');
  }
}

function mostrarCiudad(ciudad) {
  const ubicacion = [];
  if (typeof ciudad.admin1 === 'string' && ciudad.admin1.trim()) {
    ubicacion.push(ciudad.admin1.trim());
  }
  if (typeof ciudad.country === 'string' && ciudad.country.trim()) {
    ubicacion.push(ciudad.country.trim());
  }

  ciudadSeleccionada = {
    nombre: ciudad.name.trim(),
    latitud: ciudad.latitude,
    longitud: ciudad.longitude
  };
  nombreCiudad.textContent = ciudadSeleccionada.nombre;
  ubicacionCiudad.textContent = ubicacion.length > 0
    ? ubicacion.join(', ')
    : 'Región y país no disponibles.';
}

function describirCondicion(codigo) {
  return condicionesWmo[codigo] || 'Condición no disponible';
}

function validarClima(actual) {
  if (!actual || Array.isArray(actual)
      || !Number.isFinite(actual.temperature_2m)
      || !Number.isFinite(actual.apparent_temperature)
      || !Number.isInteger(actual.weather_code)
      || !Number.isFinite(actual.wind_speed_10m) || actual.wind_speed_10m < 0
      || !Number.isFinite(actual.relative_humidity_2m)
      || actual.relative_humidity_2m < 0 || actual.relative_humidity_2m > 100) {
    throw new Error('El servicio devolvió datos del clima incompletos o inválidos. Intenta de nuevo.');
  }
}

function esFechaValida(fecha) {
  if (typeof fecha !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return false;
  }
  const dia = new Date(fecha + 'T00:00:00Z');
  return Number.isFinite(dia.getTime()) && dia.toISOString().slice(0, 10) === fecha;
}

function validarPronostico(diario, unidades) {
  if (!diario || !Array.isArray(diario.time) || diario.time.length !== 3
      || !Array.isArray(diario.temperature_2m_max) || diario.temperature_2m_max.length !== 3
      || !Array.isArray(diario.temperature_2m_min) || diario.temperature_2m_min.length !== 3
      || !unidades || unidades.temperature_2m_max !== '°C' || unidades.temperature_2m_min !== '°C') {
    throw new Error('El servicio devolvió un pronóstico incompleto o unidades inválidas. Intenta de nuevo.');
  }
  for (let indice = 0; indice < 3; indice++) {
    if (!esFechaValida(diario.time[indice])
        || !Number.isFinite(diario.temperature_2m_max[indice])
        || !Number.isFinite(diario.temperature_2m_min[indice])) {
      throw new Error('El pronóstico contiene fechas o temperaturas inválidas. Intenta de nuevo.');
    }
    if (indice > 0) {
      const anterior = new Date(diario.time[indice - 1] + 'T00:00:00Z');
      const siguiente = new Date(diario.time[indice] + 'T00:00:00Z');
      if (siguiente.getTime() - anterior.getTime() !== 86400000) {
        throw new Error('El pronóstico no contiene tres días consecutivos. Intenta de nuevo.');
      }
    }
  }
}

function mostrarPronostico(diario) {
  for (let indice = 0; indice < tarjetasPronostico.length; indice++) {
    // UTC solo conserva la fecha civil recibida; no convierte la hora de la ciudad.
    const fecha = new Date(diario.time[indice] + 'T00:00:00Z');
    tarjetasPronostico[indice].fecha.textContent = fecha.toLocaleDateString('es', {
      day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
    });
    tarjetasPronostico[indice].maxima.textContent = diario.temperature_2m_max[indice] + ' °C';
    tarjetasPronostico[indice].minima.textContent = diario.temperature_2m_min[indice] + ' °C';
  }
}

async function consultarClima(ciudad) {
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + ciudad.latitude
    + '&longitude=' + ciudad.longitude
    + '&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m'
    + '&daily=temperature_2m_max,temperature_2m_min&forecast_days=3'
    + '&temperature_unit=celsius&wind_speed_unit=kmh&timezone=auto';
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error('El servicio del clima no pudo responder. Intenta de nuevo.');
  }

  const datos = await respuesta.json();
  if (!datos || typeof datos !== 'object' || Array.isArray(datos) || datos.error) {
    throw new Error('El servicio devolvió una respuesta del clima inválida. Intenta de nuevo.');
  }
  validarClima(datos.current);
  validarPronostico(datos.daily, datos.daily_units);
  return datos;
}

function mostrarClima(actual) {
  temperaturaActual.textContent = actual.temperature_2m + ' °C';
  sensacionTermica.textContent = actual.apparent_temperature + ' °C';
  condicionCielo.textContent = describirCondicion(actual.weather_code);
  velocidadViento.textContent = actual.wind_speed_10m + ' km/h';
  humedadActual.textContent = actual.relative_humidity_2m + ' %';
}

async function buscarCiudad(evento) {
  evento.preventDefault();
  if (buscando) {
    return;
  }

  const nombre = campoCiudad.value.trim();
  campoCiudad.value = nombre;
  limpiarResultado();

  if (!nombre) {
    mostrarError('Escribe el nombre de una ciudad para buscar.');
    campoCiudad.focus();
    return;
  }

  cambiarCarga(true);
  try {
    const url = 'https://geocoding-api.open-meteo.com/v1/search?name='
      + encodeURIComponent(nombre) + '&language=es&format=json&count=1';
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error('El servicio de ciudades no pudo responder. Intenta de nuevo.');
    }

    const datos = await respuesta.json();
    if (!datos || typeof datos !== 'object' || Array.isArray(datos)
        || datos.error || (datos.results !== undefined && !Array.isArray(datos.results))) {
      throw new Error('El servicio devolvió una respuesta inválida. Intenta de nuevo.');
    }
    if (!datos.results || datos.results.length === 0) {
      throw new Error('No se encontraron ciudades con ese nombre. Intenta otra búsqueda.');
    }

    const ciudad = datos.results[0];
    validarCiudad(ciudad);
    const clima = await consultarClima(ciudad);
    mostrarCiudad(ciudad);
    mostrarClima(clima.current);
    mostrarPronostico(clima.daily);
  } catch (error) {
    if (error instanceof TypeError) {
      mostrarError('No se pudo conectar con el servicio. Revisa tu conexión e intenta de nuevo.');
    } else if (error instanceof SyntaxError) {
      mostrarError('El servicio devolvió una respuesta inválida. Intenta de nuevo.');
    } else {
      mostrarError(error.message);
    }
  } finally {
    cambiarCarga(false);
    campoCiudad.focus();
  }
}

formularioBusqueda.addEventListener('submit', buscarCiudad);
