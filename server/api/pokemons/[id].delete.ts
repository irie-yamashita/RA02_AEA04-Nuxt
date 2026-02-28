import { db } from "../../db"
import { pokemons } from "../../db/schema"
import { eq, and } from "drizzle-orm"

export default defineEventHandler(async (event) => {

  // recupero id usuari
  const session = await requireUserSession(event)
  const ownerId = Number(session.user.id)

  // recupero id param
  const id = Number(getRouterParam(event, "id"))

  if (!id) {
    throw createError({ statusCode: 400, message: "ID no vàlid" })
  }

  // comprovem que existeix i és del user
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

  // delete
  const [deletedPokemon] = await db
    .delete(pokemons)
    .where(
      and(
        eq(pokemons.id, id),
        eq(pokemons.ownerId, ownerId)
      )
    )
    .returning()

  return deletedPokemon
})