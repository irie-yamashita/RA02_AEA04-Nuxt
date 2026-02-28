<script setup lang="ts">
import type { Pokemon } from "~/types"

definePageMeta({
  middleware: "auth"
})

const toast = useToast()

const { data: pokemons, refresh } = await useFetch<Pokemon[]>("/api/pokemons")

const deletePokemon = async (id: number) => {
  try {
    await $fetch(`/api/pokemons/${id}`, {
      method: "DELETE"
    })

    toast.add({
      title: "Pokémon eliminat",
      description: "S'ha eliminat correctament",
      color: "success"
    })

    refresh()
  } catch (error) {
    toast.add({
      title: "Error",
      description: "No s'ha pogut eliminar",
      color: "error"
    })
  }
}
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Els meus Pokémons</h1>

      <UButton to="/pokemons/new" class="btn-primary">
        Afegir Pokémon
      </UButton>
    </div>
    <p v-if="!pokemons || pokemons.length <= 0">Encara no tens cap Pokémon :/ Prova d'afegir-ne un.</p>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <UCard v-for="pokemon in pokemons" :key="pokemon.id" class="mb-4">
        <div class="flex justify-between items-end">
          <div>
            <h2 class="font-bold uppercase">{{ pokemon.name }} - #{{ pokemon.pokedexNum }}</h2>
            <p>Tipus: {{ pokemon.type }}</p>
            <p>Nivell: {{ pokemon.level }}</p>
          </div>
  
          <div class="flex gap-2">
            <UButton
              size="sm"
              color="info"
              :to="`/pokemons/${pokemon.id}/edit`"
            >
              Editar
            </UButton>
  
            <UButton
              size="sm"
              color="error"
              @click="deletePokemon(pokemon.id)"
            >
              Eliminar
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

