<script setup>
definePageMeta({ middleware: ["auth"] })

// lazy per renderitzar quan ho tingui el en client ???
const { data } = useFetch('/api/admin', {
    lazy: true
});

const {  user } = useUserSession();


</script>

<template>
    <div class="py-32 pokemon-page">
      <div class="flex  flex-col justify-between items-center gap-5">
        <h1 class="text-2xl font-bold pokemon-title">Inici</h1>
        <p class="pokemon-text">Benvingut/da <strong class="underline pokemon-accent-text">{{ user?.name }}</strong> a la aplicació de gestió de Pokémons</p>
        <UButton to="/pokemons" class="btn-primary">
          Veure els meus Pokémons
        </UButton>
      </div>
  
    </div>
  </template>

<style scoped>
  .pokemon-title {
    color: var(--pokemon-text);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .pokemon-text {
    color: var(--pokemon-text);
  }

  .pokemon-accent-text {
    color: var(--pokemon-light);
  }
</style>
  