const formularioBusqueda = document.getElementById('formularioBusqueda');
const campoCiudad = document.getElementById('campoCiudad');
const botonBuscar = document.getElementById('botonBuscar');
const mensajeCarga = document.getElementById('mensajeCarga');
const mensajeError = document.getElementById('mensajeError');
const nombreCiudad = document.getElementById('nombreCiudad');
const ubicacionCiudad = document.getElementById('ubicacionCiudad');

let buscando = false;
// Se conserva en memoria para consultar el clima en la siguiente etapa.
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
    mostrarCiudad(ciudad);
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
