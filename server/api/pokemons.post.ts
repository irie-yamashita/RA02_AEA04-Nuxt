import { db } from "../db"
import { pokemons } from "../db/schema"
import type { PokemonType } from "../db/enums"
import { pokemonTypes } from "../db/enums"

export default defineEventHandler(async (event) => {

    // recupero id usuari
    const session = await requireUserSession(event)
    const ownerId = Number(session.user.id)

    // recupero dades
    const body = await readBody(event)
    const { name, type, level, pokedexNum } = body

    if (!name || !type || !pokedexNum) {
        // bad request si falten camps obligatoris
        throw createError({ statusCode: 400, message: "Falten camps obligatoris! [name, type, pokedexNum]" })
    }

    // validació tipus
    if (!pokemonTypes.includes(type as PokemonType)) {
        throw createError({
            statusCode: 400,
            message: `Tipus del Pokémon no vàlid. Valors vàlids: ${pokemonTypes.join(", ")}`
        })
    }

    // desestructurem i guardem 1 valor que retorna insert
    const [newPokemon] = await db
        .insert(pokemons)
        .values({
            name,
            type,
            level: level ?? 1, // si no ve, per defecte li poso 1
            ownerId,
            pokedexNum
        })
        .returning() // returning --> retorna un array


    return newPokemon
})