import { db } from "../../db"
import { pokemons } from "../../db/schema"
import { eq, and } from "drizzle-orm"
import type { Pokemon } from "~/types"
import { pokemonSchema } from "~/schemas/pokemon"

export default defineEventHandler(async (event): Promise<Pokemon> => {

    // recupero id usuari
    const session = await requireUserSession(event)
    const ownerId = Number(session.user.id)

    // recupero id del pokémon a modificar
    const id = Number(getRouterParam(event, "id"))

    if (!id) {
        throw createError({statusCode: 400,message: "ID no vàlid"})
    }

    // agafo les dades del formulari i valido amb Zod
    const body = await readBody(event)
    // per PUT, schema parcial pq no tots els camps són obligatoris
    const result = pokemonSchema.partial().safeParse(body)

    if (!result.success) {
        throw createError({
            statusCode: 400,
            message: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
        })
    }

    const { name, type, level, pokedexNum } = result.data

    // comprovar si existeix pokemon i si és del user
    const existingPokemon = await db.query.pokemons.findFirst({
        where: and(
            eq(pokemons.id, id),
            eq(pokemons.ownerId, ownerId)
        )
    })

    if (!existingPokemon) {
        throw createError({
            statusCode: 404,
            message: "Pokémon no trobat"
        })
    }

    // si tot està bé, actualiyzo el pokemon
    const [updatedPokemon] = await db
        .update(pokemons)
        .set({
            ...(name && { name }),
            ...(type && { type }),
            ...(level !== undefined && { level }),
            ...(pokedexNum && { pokedexNum })
        })
        .where(
            and(
                eq(pokemons.id, id),
                eq(pokemons.ownerId, ownerId)
            )
        )
        .returning()

    return updatedPokemon as Pokemon
})