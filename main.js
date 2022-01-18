/* eslint-disable func-names */
/* eslint linebreak-style: ["error", "windows"] */
import { mostrarPokemon, mostrarListadoPokemon, obtenerNombrePokemonBuscado, configurarBotonBuscar } from './ui.js';
import { consultarListadoPokemones, consultarPokemon } from './pokemon.js';

async function cambiarAPokemonClickeado(e) {
  const nombrePokemon = e.target.id;
  const pokemonData = await consultarPokemon(nombrePokemon);
  mostrarPokemon(pokemonData);
}

async function cambiarAPokemonBuscado() {
  const pokemonData = await consultarPokemon(obtenerNombrePokemonBuscado());
  mostrarPokemon(pokemonData);
}

async function inicializar() {
  mostrarPokemon(await consultarPokemon('ditto'));
  mostrarListadoPokemon(await consultarListadoPokemones(), cambiarAPokemonClickeado);
  configurarBotonBuscar(cambiarAPokemonBuscado);
}

inicializar();
