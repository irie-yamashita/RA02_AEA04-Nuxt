<script setup>
  const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession();
</script>

<template>
    <UCard class="flex justify-end">
        <div v-if="loggedIn" class="flex items-center gap-2">
          <h1>{{ user?.login }}</h1>
          <UButton @click="clear(); navigateTo('/login')">Logout</UButton>
        </div>
        <div v-else class="flex items-center gap-2">
          <h1>Not logged in</h1>
          <UButton as-child>
            <NuxtLink to="/login">Login</NuxtLink>
          </UButton>
        </div>
    </UCard>
</template>
