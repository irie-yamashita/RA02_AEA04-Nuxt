<script setup>
definePageMeta({ middleware: ["auth"] })

// lazy per renderitzar quan ho tingui el en client ???
const { data } = useFetch('/api/admin', {
    lazy: true
});

</script>

<template>
    <div v-if="data">
        {{ data.sensitive }}
    </div>
</template>