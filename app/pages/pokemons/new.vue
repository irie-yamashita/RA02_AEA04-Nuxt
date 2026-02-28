<script setup lang="ts">
import { pokemonSchema, type PokemonInput } from "~/schemas/pokemon"

definePageMeta({
  middleware: "auth"
})

const toast = useToast()
const router = useRouter()

const state = reactive<PokemonInput>({
  name: "",
  type: "fire",
  level: 1,
  pokedexNum: 1
})

const loading = ref(false)

const onSubmit = async () => {
  try {
    loading.value = true

    await $fetch("/api/pokemons", {
      method: "POST",
      body: state
    })

    toast.add({
      title: "Pokémon creat!",
      description: "S'ha afegit correctament",
      color: "success"
    })

    router.push("/pokemons")

  } catch (error) {
    toast.add({
      title: "Error",
      description: "No s'ha pogut crear el Pokémon",
      color: "error"
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="p-6 max-w-lg mx-auto">
    <UCard>
      <h1 class="text-xl font-bold mb-4">Afegir Pokémon</h1>

      <UForm
        :schema="pokemonSchema"
        :state="state"
        @submit="onSubmit"
        class="space-y-4"
      >

        <UFormField label="Nom" name="name">
          <UInput class="w-full" v-model="state.name" />
        </UFormField>

        <UFormField label="Tipus" name="type">
          <UInput class="w-full" v-model="state.type" placeholder="fire, water, grass, electric, normal" />
        </UFormField>

        <UFormField label="Nivell" name="level">
          <UInput class="w-full" type="number" v-model.number="state.level" />
        </UFormField>

        <UFormField label="Pokedex #" name="pokedexNum">
          <UInput class="w-full" type="number" v-model.number="state.pokedexNum" />
        </UFormField>

        <UButton
          type="submit"
          class="btn-primary"
          :loading="loading"
          block
        >
          Crear Pokémon
        </UButton>

      </UForm>
    </UCard>
  </div>
</template>