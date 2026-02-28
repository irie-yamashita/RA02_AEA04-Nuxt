import { z } from "zod"


export const pokemonSchema = z.object({
  name: z.string({
    required_error: "El nom és obligatori",
    invalid_type_error: "El nom ha de ser un text"
  }).min(1, "El nom és obligatori"),
  type: z.enum(["fire", "water", "grass", "electric", "normal"], {
    errorMap: () => ({ message: "Tipus no vàlid. Valors vàlids: fire, water, grass, electric, normal" })
  }),
  level: z.number({
    required_error: "El nivell és obligatori",
    invalid_type_error: "El nivell ha de ser un número"
  }).int("Ha de ser un número enter").min(1, "Mínim 1").max(100, "Màxim 100").optional(),
  pokedexNum: z.number({
    required_error: "El número de Pokedex és obligatori",
    invalid_type_error: "El número de Pokedex ha de ser un número"
  }).int("Ha de ser un número enter").positive("Ha de ser positiu")
})


export type PokemonInput = z.infer<typeof pokemonSchema>


// amb errors per defecte
// export const pokemonSchema = z.object({
//   name: z.string().min(1, "El nom és obligatori"),
//   type: z.enum(["fire", "water", "grass", "electric", "normal"]),
//   level: z.number().int().min(1).max(100).optional(),
//   pokedexNum: z.number().int().positive()
// })