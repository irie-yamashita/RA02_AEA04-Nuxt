<script setup>
  const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession();
</script>

<template>
    <UCard class="flex justify-end !rounded-none pokemon-navbar">
        <div v-if="loggedIn" class="flex items-center gap-2">
          <h1 class="pokemon-text">{{ user?.login }}</h1>
          <UButton @click="clear(); navigateTo('/login')" class="btn-primary">Logout</UButton>
        </div>
        <div v-else class="flex items-center gap-2">
          <h1 class="pokemon-text">Not logged in</h1>
          <UButton as-child class="btn-primary">
            <NuxtLink to="/login">Login</NuxtLink>
          </UButton>
        </div>
    </UCard>
</template>

<style scoped>
  .pokemon-navbar {
    background: linear-gradient(135deg, var(--pokemon-bg) 0%, var(--pokemon-bg-light) 100%) !important;
    border-bottom: 2px solid var(--pokemon-border) !important;
  }

  .pokemon-text {
    color: var(--pokemon-text);
  }
</style>
