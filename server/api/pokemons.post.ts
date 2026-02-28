import { db } from "../db"
import { pokemons } from "../db/schema"
import type { Pokemon } from "~/types"
import { pokemonSchema } from "~/schemas/pokemon"

export default defineEventHandler(async (event): Promise<Pokemon> => {

    // recupero id usuari
    const session = await requireUserSession(event)
    const ownerId = Number(session.user.id)

    // recupero dades i valido amb Zod
    const body = await readBody(event)
    const result = pokemonSchema.safeParse(body)

    if (!result.success) {
        throw createError({
            statusCode: 400,
            message: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
        })
    }

    const { name, type, level, pokedexNum } = result.data

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


    return newPokemon as Pokemon
})