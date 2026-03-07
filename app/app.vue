<script setup>
  import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen pokemon-theme">
    <NavBar/>
    <main class="pokemon-container">
      <NuxtPage/>
    </main>
  </div>
</template>

<style>
  @import "tailwindcss";
  @import "@nuxt/ui";
  @import "~/assets/css/main.css";

  .pokemon-theme {
    background: linear-gradient(135deg, var(--pokemon-bg-dark) 0%, var(--pokemon-bg) 100%);
    color: var(--pokemon-text);
  }

  .pokemon-container {
    min-height: calc(100vh - 80px);
  }
</style>