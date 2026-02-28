import { z } from "zod"

export const pokemonSchema = z.object({
  name: z.string().min(1, "El nom és obligatori"),
  type: z.enum(["fire", "water", "grass", "electric", "normal"]),
  level: z.number().int().min(1).max(100).optional(),
  pokedexNum: z.number().int().positive()
})

export type PokemonInput = z.infer<typeof pokemonSchema>