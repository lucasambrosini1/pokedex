/* eslint-disable func-names */
/* eslint linebreak-style: ["error", "windows"] */
export function mostrarListadoPokemon(data, callbackSeleccion) {
  const $listadoPokemones = document.querySelector('#listado-pokemones');
  $listadoPokemones.innerHTML = '';
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
  $pokemonEnLista.dataset.nombre = pokemon.name;
  $pokemonEnLista.onclick = callbackSeleccion;
  $listadoPokemones.appendChild($pokemonEnLista);
}

export function crearPaginacion(data) {
  const cantidadPokemonesPorPagina = data.results.length;
  const cantidadPaginas = Number(data.count) / cantidadPokemonesPorPagina;
  const $botonAnterior = document.createElement('li');
  $botonAnterior.className = 'page-item';
  $botonAnterior.innerHTML = '<a class="page-link" href="#" data-pagina="anterior">Anterior</a>';
  const $botonSiguiente = document.createElement('li');
  $botonSiguiente.className = 'page-item';
  $botonSiguiente.innerHTML = '<a class="page-link" href="#" data-pagina="siguiente">Siguiente</a>';
  const $paginacion = document.querySelector('#paginacion');
  $paginacion.appendChild($botonAnterior);
  $paginacion.appendChild($botonSiguiente);

  for (let i = 1; i <= cantidadPaginas; i++) {
    crearBotonPagina(i);
  }
}

function crearBotonPagina(i) {
  const $botonPagina = document.createElement('li');
  const $paginacion = document.querySelector('#paginacion');
  $botonPagina.className = 'page-item';
  $botonPagina.innerHTML = `<a class="page-link" href="#" data-pagina="${i}">${i}</a>`;
  $paginacion.appendChild($botonPagina);
}

export function configurarBotonPaginado(callbackPaginado) {
  const $botonesPaginado = document.querySelectorAll('.page-link');
  $botonesPaginado.forEach((boton) => {
    boton.onclick = callbackPaginado;
  });
}

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

export function seleccionarPokemon(e) {
  const $itemActivo = document.querySelector('.btn-primary');
  e.target.className = 'btn-primary';
  if ($itemActivo) {
    $itemActivo.className = 'list-group-item list-group-item-action';
  }
}

export function seleccionarPagina(e) {
  const $itemActivo = document.querySelector('.link-primary');
  e.target.className = 'link-primary';
  if ($itemActivo) {
    $itemActivo.className = 'page-link';
  }
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
