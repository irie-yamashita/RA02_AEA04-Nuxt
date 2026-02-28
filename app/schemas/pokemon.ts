import { z } from "zod"


export const pokemonSchema = z.object({
  name: z.string().min(1, "El nom és obligatori"),
  type: z.enum(["fire", "water", "grass", "electric", "normal"], {
    message: "Tipus no vàlid. Valors vàlids: fire, water, grass, electric, normal"
  }),
  level: z.number().int("Ha de ser un número enter").min(1, "Mínim 1").max(100, "Màxim 100").optional(),
  pokedexNum: z.number().int("Ha de ser un número enter").positive("Ha de ser positiu")
})


export type PokemonInput = z.infer<typeof pokemonSchema>


// amb errors per defecte
// export const pokemonSchema = z.object({
//   name: z.string().min(1, "El nom és obligatori"),
//   type: z.enum(["fire", "water", "grass", "electric", "normal"]),
//   level: z.number().int().min(1).max(100).optional(),
//   pokedexNum: z.number().int().positive()
// })