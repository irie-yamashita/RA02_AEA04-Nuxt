export type PokemonType =
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "normal" // els que tinguis

export interface Pokemon {
  id: number
  name: string
  type: PokemonType
  level: number
  pokedexNum: number
  ownerId: number
  createdAt: Date
}