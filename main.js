const $botonBuscarPokemon = document.querySelector("#buscar-pokemon")
$botonBuscarPokemon.onclick = obtenerNombrePokemonBuscado
let paginaActual = 1
let ultimaPagina = 0


function obtenerNombrePokemonBuscado() {
    const nombrePokemonBuscado = document.querySelector("#form1").value.toLowerCase().trim()
    consultarPokemon(nombrePokemonBuscado)
}
function obtenerNombrePokemonClickeado(e) {
    const nombrePokemon = e.target.id
    consultarPokemon(nombrePokemon)
    
}

function mostrarPokemon(data) {
    const $nombrePokemon = document.querySelector("#nombre-pokemon")
    const $infoPokemon = document.querySelector("#info-pokemon")
    const $imgPokemon = document.querySelector("#img-pokemon")
    $nombrePokemon.innerText = data.name
    let habilidades = ""
    data.abilities.forEach(function (habilidad) {
        habilidades += habilidad.ability.name.toUpperCase() + " "
    })
    $infoPokemon.innerText = `ALTURA: ${data.height}, PESO: ${data.weight}, HABILIDADES: ${habilidades}`
    $imgPokemon.src = data.sprites.front_default
}

function consultarPokemones(offset = 0, limit = 20) {
    const URL = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    fetch(URL)
    .then(response => response.json())
    .then(data =>  mostrarListadoPokemon(data))
   
}

function mostrarListadoPokemon(data) {
    const $listadoPokemones = document.querySelector("#listado-pokemones")
    $listadoPokemones.innerHTML = ""
    crearPaginacion(data)
    data.results.forEach(function (pokemon) {
        crearElementoPokemonEnListado(pokemon)
    })
}


function crearElementoPokemonEnListado(pokemon) {
    const $listadoPokemones = document.querySelector("#listado-pokemones")
    const $pokemonEnLista = document.createElement("button")
    $pokemonEnLista.type = "button"
    $pokemonEnLista.className = "list-group-item list-group-item-action"
    $pokemonEnLista.innerText = pokemon.name
    $pokemonEnLista.id = pokemon.name
    $pokemonEnLista.onclick = obtenerNombrePokemonClickeado
    $listadoPokemones.appendChild($pokemonEnLista)

}

function crearPaginacion(data) {
    const cantidadPokemonesPorPagina = data.results.length
    const cantidadPaginas = Number(data.count) / cantidadPokemonesPorPagina
    ultimaPagina = cantidadPaginas
    for (i = 1; i <= cantidadPaginas; i++) {
        crearBotonPagina(i)
    }
    const $botonAnterior = document.querySelector("#anterior")
    $botonAnterior.onclick = cambiarPagina
    const $botonSiguiente = document.querySelector("#siguiente")
    $botonSiguiente.onclick = cambiarPagina

}

function crearBotonPagina(i) {
    const $botonPagina = document.createElement("li")
    const $paginacion = document.querySelector("#paginacion")
    $botonPagina.className = "page-item"
    $botonPagina.innerHTML = `<a class="page-link" href="#">${i}</a>`
    $botonPagina.onclick = cambiarPagina
    $paginacion.appendChild($botonPagina)
}
function cambiarPagina(e) {
    if (e.target.innerText === "Siguiente") {
        if (paginaActual !== ultimaPagina) {
            paginaActual++
        }
    }
    else if (e.target.innerText === "Anterior") {
        if (paginaActual !== 1)
            paginaActual--
    }
    else {
        paginaActual = e.target.innerText
    }
    const offset = paginaActual * 20 - 20
    consultarPokemones(offset)
}


consultarPokemones()
consultarPokemon("ditto")

function consultarPokemon(nombrePokemon) {
    url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`
    fetch(url)
    .then(response => response.json())
    .then(data => mostrarPokemon(data))
}

