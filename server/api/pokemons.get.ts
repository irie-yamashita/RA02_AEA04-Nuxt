import { eq } from "drizzle-orm"
import { pokemons } from "../db/schema"
import { db } from "../db"

export default defineEventHandler(async (event) => {
    
  const session = await requireUserSession(event)

  const userId = Number(session.user.id)

  return await db
  .select()
  .from(pokemons)
  .where(eq(pokemons.ownerId, userId))
})