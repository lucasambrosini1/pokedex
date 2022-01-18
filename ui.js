/* eslint-disable func-names */
/* eslint linebreak-style: ["error", "windows"] */
export function mostrarListadoPokemon(data, callbackSeleccion) {
  const $listadoPokemones = document.querySelector('#listado-pokemones');
  $listadoPokemones.innerHTML = '';
  crearPaginacion(data);
  data.results.forEach((pokemon) => {
    crearElementoPokemonEnListado(pokemon, callbackSeleccion);
  });
}

function crearElementoPokemonEnListado(pokemon, callbackSeleccion) {
  const $listadoPokemones = document.querySelector('#listado-pokemones');
  const $pokemonEnLista = document.createElement('button');
  $pokemonEnLista.type = 'button';
  $pokemonEnLista.className = 'list-group-item list-group-item-action';
  $pokemonEnLista.innerText = pokemon.name;
  $pokemonEnLista.id = pokemon.name;
  $pokemonEnLista.onclick = callbackSeleccion;
  $listadoPokemones.appendChild($pokemonEnLista);
}

function crearPaginacion(data) {
  const cantidadPokemonesPorPagina = data.results.length;
  const cantidadPaginas = Number(data.count) / cantidadPokemonesPorPagina;
  ultimaPagina = cantidadPaginas;
  for (let i = 1; i <= cantidadPaginas; i++) {
    crearBotonPagina(i);
  }
  const $botonAnterior = document.querySelector('#anterior');
  $botonAnterior.onclick = cambiarPagina;
  const $botonSiguiente = document.querySelector('#siguiente');
  $botonSiguiente.onclick = cambiarPagina;
}

function crearBotonPagina(i) {
  const $botonPagina = document.createElement('li');
  const $paginacion = document.querySelector('#paginacion');
  $botonPagina.className = 'page-item';
  $botonPagina.innerHTML = `<a class="page-link" href="#">${i}</a>`;
  $botonPagina.onclick = cambiarPagina;
  $paginacion.appendChild($botonPagina);
}
function cambiarPagina(e) {
  if (e.target.innerText === 'Siguiente') {
    if (paginaActual !== ultimaPagina) {
      paginaActual++;
    }
  } else if (e.target.innerText === 'Anterior') {
    if (paginaActual !== 1) { paginaActual--; }
  } else {
    paginaActual = e.target.innerText;
  }
  const offset = paginaActual * 20 - 20;
  consultarListadoPokemones(offset);
}

let paginaActual = 1;
let ultimaPagina = 0;

export function configurarBotonBuscar(callbackBusqueda) {
  const $botonBuscarPokemon = document.querySelector('#buscar-pokemon');
  $botonBuscarPokemon.onclick = callbackBusqueda;
}

export function obtenerNombrePokemonBuscado() {
  const nombrePokemonBuscado = document.querySelector('#input-pokemon').value.toLowerCase().trim();
  return nombrePokemonBuscado;
}
export function obtenerNombrePokemonClickeado() {
  const $pokemonSeleccionado = document.querySelector('.list-group-item.active');
  if ($pokemonSeleccionado) {
    return $pokemonSeleccionado.innerText;
  }

  return undefined;
}

function seleccionarPokemon(e) {
  e.target.className = '.list-group-item.active';
}

export function mostrarPokemon(data) {
  const $nombrePokemon = document.querySelector('#nombre-pokemon');
  const $infoPokemon = document.querySelector('#info-pokemon');
  const $imgPokemon = document.querySelector('#img-pokemon');
  $nombrePokemon.innerText = data.name;
  let habilidades = '';
  data.abilities.forEach((habilidad) => {
    habilidades += `${habilidad.ability.name.toUpperCase()} `;
  });
  $infoPokemon.innerText = `ALTURA: ${data.height}, PESO: ${data.weight}, HABILIDADES: ${habilidades}`;
  $imgPokemon.src = data.sprites.front_default;
}
