export type PokemonType =
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "normal"

export interface Pokemon {
  id: number
  name: string | null
  type: PokemonType
  level: number | null
  pokedexNum: number
  ownerId: number
}