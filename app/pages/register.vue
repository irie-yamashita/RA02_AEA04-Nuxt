<script setup lang="ts">
import * as z from 'zod'
/* zod em dona facilitats per fer validacions de formularis */
import type { FormSubmitEvent } from '@nuxt/ui'
import { FetchError } from 'ofetch'

/* TODO: redirect a pokemons */

const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession();


const schema = z.object({
    name: z.string(),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
    name: undefined,
    email: undefined,
    password: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        await $fetch('/auth/register', {
            method: 'POST',
            body: event.data
        })
        toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
        navigateTo('/admin')
    } catch (error) {

    }
    console.log(event.data) 
}

watch(loggedIn, () => {
    if(loggedIn.value) {
        navigateTo('/admin')
    }
})

</script>

<template>
    <UCard class="max-w-md m-auto my-10">
        <h1 class="text-2xl text-center">Register</h1>
        <UForm :schema="schema" :state="state" class="flex flex-col items-stretch gap-y-4" @submit="onSubmit">
            <UFormField label="Nom" name="name">
                <UInput v-model="state.name" class="w-full" />
            </UFormField>

            <UFormField label="Email" name="email">
                <UInput v-model="state.email" class="w-full" />
            </UFormField>

            <UFormField label="Password" name="password">
                <UInput v-model="state.password" type="password" class="w-full" />
            </UFormField>

            <UButton type="submit" class="w-full justify-center">
                Submit
            </UButton>
        </UForm>
        <UButton class="mt-4 w-full justify-center" @click="openInPopup('/auth/github')">
            Login with Github
        </UButton>
    </UCard>
</template>
