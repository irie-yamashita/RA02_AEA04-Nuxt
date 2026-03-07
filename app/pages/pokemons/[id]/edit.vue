<script setup lang="ts">
import { pokemonSchema, type PokemonInput } from "~/schemas/pokemon"
import type { Pokemon } from "~/types"

definePageMeta({
  middleware: "auth"
})

const route = useRoute()
const toast = useToast()
const router = useRouter()

const pokemonId = Number(route.params.id)

// Carregar el pokémon existent
const { data: pokemon, error } = await useFetch<Pokemon>(`/api/pokemons/${pokemonId}`)

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 404,
    statusMessage: error.value.statusMessage || "Pokémon no trobat"
  })
}

// Inicialitzar l'estat amb les dades del pokémon
const state = reactive<PokemonInput>({
  name: pokemon.value?.name || "",
  type: pokemon.value?.type || "fire",
  level: pokemon.value?.level || 1,
  pokedexNum: pokemon.value?.pokedexNum || 1
})

const loading = ref(false)

const onSubmit = async () => {
  try {
    loading.value = true

    await $fetch(`/api/pokemons/${pokemonId}`, {
      method: "PUT",
      body: state
    })

    toast.add({
      title: "Pokémon actualitzat!",
      description: "S'ha modificat correctament",
      color: "success"
    })

    router.push("/pokemons")

  } catch (error) {
    toast.add({
      title: "Error",
      description: "No s'ha pogut actualitzar el Pokémon",
      color: "error"
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="p-6 max-w-lg mx-auto">
    <UCard class="card-pokemon">
      <h1 class="text-xl font-bold mb-4 pokemon-title">Editar Pokémon</h1>

      <UForm
        v-if="pokemon"
        :schema="pokemonSchema"
        :state="state"
        @submit="onSubmit"
        class="space-y-4"
      >
        <UFormField label="Nom" name="name">
          <UInput class="w-full pokemon-input" v-model="state.name" />
        </UFormField>

        <UFormField label="Tipus" name="type">
          <UInput class="w-full pokemon-input" v-model="state.type" placeholder="fire, water, grass, electric, normal" />
        </UFormField>

        <UFormField label="Nivell" name="level">
          <UInput class="w-full pokemon-input" type="number" v-model.number="state.level" />
        </UFormField>

        <UFormField label="Pokedex #" name="pokedexNum">
          <UInput class="w-full pokemon-input" type="number" v-model.number="state.pokedexNum" />
        </UFormField>

        <UButton
          type="submit"
          class="btn-primary"
          :loading="loading"
          block
        >
          Actualitzar Pokémon
        </UButton>

      </UForm>
    </UCard>
  </div>
</template>

<style scoped>
  .pokemon-title {
    color: var(--pokemon-text);
  }
</style>

