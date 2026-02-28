import { db } from "../../db"
import { pokemons } from "../../db/schema"
import type { PokemonType } from "../../db/enums"
import { pokemonTypes } from "../../db/enums"
import { eq, and } from "drizzle-orm"

export default defineEventHandler(async (event) => {

    // recupero id usuari
    const session = await requireUserSession(event)
    const ownerId = Number(session.user.id)

    // recupero id del pokémon a modificar
    const id = Number(getRouterParam(event, "id"))


    if (!id) {
        throw createError({statusCode: 400,message: "ID no vàlid"})
    }

    // agafo les dades del formulari
    const body = await readBody(event)
    const { name, type, level, pokedexNum } = body

    // validació del tipus
    if (type && !pokemonTypes.includes(type as PokemonType)) {
        throw createError({
            statusCode: 400,
            message: `Tipus del Pokémon no vàlid. Valors vàlids: ${pokemonTypes.join(", ")}`
        })
    }

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

    return updatedPokemon
})