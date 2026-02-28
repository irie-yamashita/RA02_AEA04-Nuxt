import { eq } from "drizzle-orm"
import { pokemons } from "../db/schema"
import { db } from "../db"
import type { Pokemon } from "~/types"

export default defineEventHandler(async (event): Promise<Pokemon[]> => {
    
  const session = await requireUserSession(event)

  const userId = Number(session.user.id)

  const result = await db
    .select()
    .from(pokemons)
    .where(eq(pokemons.ownerId, userId))

  return result as Pokemon[]
})