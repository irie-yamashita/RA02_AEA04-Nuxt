<script setup>
definePageMeta({ middleware: ["auth"] })

// lazy per renderitzar quan ho tingui el en client ???
const { data } = useFetch('/api/admin', {
    lazy: true
});

const {  user } = useUserSession();


</script>

<template>
    <div class="py-32">
      <div class="flex  flex-col justify-between items-center gap-5">
        <h1 class="text-2xl font-bold">Inici</h1>
        <p>Benvingut/da <strong class="underline">{{ user?.login }}</strong> a la aplicació de gestió de Pokémons</p>
        <UButton to="/pokemons" color="primary">
          Veure els meus Pokémons
        </UButton>
      </div>
  
    </div>
  </template>
  