import { eq } from "drizzle-orm"
import { pokemons } from "../db/schema"
import { db } from "../db"
import type { Pokemon } from "~/types"

export default defineEventHandler(async (event): Promise<Pokemon[]> => {

  const user = event.context.user;

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Accés denegat: Cal iniciar sessió o proporcionar un token vàlid.',
    });
  }

  const userId = Number(user.id);


  const result = await db
    .select()
    .from(pokemons)
    .where(eq(pokemons.ownerId, userId))

  return result as Pokemon[]
})