export async function consultarListadoPokemones(offset = 0, limit = 20) {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
  const respuesta = await fetch(url);
  const json = await respuesta.json();
  return json;
}

export async function consultarPokemon(nombrePokemon) {
  const url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`;
  const respuesta = await fetch(url);
  const json = await respuesta.json();
  return json;
}
