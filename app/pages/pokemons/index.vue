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
  <div class="p-6 space-y-6 pokemon-page">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold pokemon-title">Els meus Pokémons</h1>

      <UButton to="/pokemons/new" class="btn-primary">
        Afegir Pokémon
      </UButton>
    </div>
    <p v-if="!pokemons || pokemons.length <= 0" class="pokemon-text-muted">Encara no tens cap Pokémon :/ Prova d'afegir-ne un.</p>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <UCard v-for="pokemon in pokemons" :key="pokemon.id" class="mb-4 card-pokemon">
        <div class="flex justify-between items-end">
          <div>
            <h2 class="font-bold uppercase pokemon-card-title">{{ pokemon.name }} - #{{ pokemon.pokedexNum }}</h2>
            <p class="pokemon-text-muted">Tipus: <span class="pokemon-text">{{ pokemon.type }}</span></p>
            <p class="pokemon-text-muted">Nivell: <span class="pokemon-text">{{ pokemon.level }}</span></p>
          </div>
  
          <div class="flex gap-2">
            <UButton
              size="sm"
              class="pokemon-btn-edit"
              :to="`/pokemons/${pokemon.id}/edit`"
            >
              Editar
            </UButton>
  
            <UButton
              size="sm"
              class="pokemon-btn-delete"
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

<style scoped>
  .pokemon-page {
    color: var(--pokemon-text);
  }

  .pokemon-title {
    color: var(--pokemon-text);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .pokemon-text-muted {
    color: var(--pokemon-text-muted);
  }

  .pokemon-card-title {
    color: var(--pokemon-light);
  }

  .pokemon-btn-edit {
    background-color: var(--pokemon-accent) !important;
    color: var(--pokemon-text) !important;
  }

  .pokemon-btn-edit:hover {
    background-color: var(--pokemon-light) !important;
  }

  .pokemon-btn-delete {
    background-color: var(--pokemon-error) !important;
    color: var(--pokemon-text) !important;
  }

  .pokemon-btn-delete:hover {
    background-color: #9b6a7b !important;
  }
</style>

