import {
  mostrarPokemon,
  mostrarListadoPokemon,
  obtenerNombrePokemonBuscado,
  configurarBotonBuscar,
  configurarBotonPaginado,
  crearPaginacion,
  seleccionarPokemon,
  seleccionarPagina,
} from './ui.js';
import { consultarListadoPokemones, consultarPokemon } from './pokemon.js';

let paginaActual = 1;
let ultimaPagina = 0;

async function cambiarAPokemonClickeado(e) {
  const nombrePokemon = e.target.dataset.nombre;
  const pokemonData = await consultarPokemon(nombrePokemon);
  mostrarPokemon(pokemonData);
  seleccionarPokemon(e);
}

async function cambiarAPokemonBuscado() {
  const pokemonData = await consultarPokemon(obtenerNombrePokemonBuscado());
  mostrarPokemon(pokemonData);
}

async function cambiarPagina(e) {
  if (e.target.dataset.pagina === 'siguiente') {
    if (paginaActual !== ultimaPagina) {
      paginaActual++;
    }
  } else if (e.target.dataset.pagina === 'anterior') {
    if (paginaActual !== 1) { paginaActual--; }
  } else {
    paginaActual = Number(e.target.dataset.pagina);
  }
  const offset = paginaActual * 20 - 20;
  mostrarListadoPokemon(await consultarListadoPokemones(offset), cambiarAPokemonClickeado);
  seleccionarPagina(e);
}

async function inicializar() {
  configurarBotonBuscar(cambiarAPokemonBuscado);
  mostrarPokemon(await consultarPokemon('ditto'));
  const pokemonesData = await consultarListadoPokemones();
  ultimaPagina = Math.ceil(Number(pokemonesData.count) / 20);
  crearPaginacion(pokemonesData);
  mostrarListadoPokemon(pokemonesData, cambiarAPokemonClickeado);
  configurarBotonPaginado(cambiarPagina);
}

inicializar();
