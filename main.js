/* eslint-disable func-names */
/* eslint linebreak-style: ["error", "windows"] */
import { mostrarPokemon, mostrarListadoPokemon, obtenerNombrePokemonClickeado } from './ui.js';
import { consultarListadoPokemones, consultarPokemon } from './pokemon.js';

async function actualizar() {
  const pokemonData = await consultarPokemones(obtenerNombrePokemonClickeado());
  mostrarPokemon(pokemonData);
}
async function inicializar() {
  mostrarPokemon(await consultarPokemon('ditto'));
  mostrarListadoPokemon(await consultarListadoPokemones(), actualizar);

}

inicializar();
