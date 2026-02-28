import { db } from "../../db"
import { pokemons } from "../../db/schema"
import { eq, and } from "drizzle-orm"
import type { Pokemon } from "~/types"

export default defineEventHandler(async (event): Promise<Pokemon> => {
  // recupero id usuari
  const session = await requireUserSession(event)
  const ownerId = Number(session.user.id)

  // recupero id del pokémon
  const id = Number(getRouterParam(event, "id"))

  if (!id) {
    throw createError({ statusCode: 400, message: "ID no vàlid" })
  }

  // busco el pokemon y comprovo que és del user
  const pokemon = await db.query.pokemons.findFirst({
    where: and(
      eq(pokemons.id, id),
      eq(pokemons.ownerId, ownerId)
    )
  })

  if (!pokemon) {
    throw createError({
      statusCode: 404,
      message: "Pokémon no trobat"
    })
  }

  return pokemon as Pokemon
})

