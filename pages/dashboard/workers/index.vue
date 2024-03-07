<script setup>
definePageMeta({
    layout: 'dashboard',
    middleware: ["protected"]
})

// @ts-ignore
var results = ref([])
const user = useUser()
const route = useRoute()
const worker_id = route.params.slug


onMounted(async () => {
    results.value = await $fetch('/api/workers', {
        method: 'POST',
    })
    console.log(results)
})
</script>

<template>
    <h1 class="inria text-4xl text-center w-full font-bold mt-10">Workers For User Id: {{ user.userId }}</h1>
    <div>
        <template v-for="r in results.reverse()">
            <nuxt-link :to="'/dashboard/workers/'+r.id" class="block mt-20 p-10 pt-0 overflow-hidden mx-10 rounded-3xl shadow-amber-950 shadow-inner text-black">
                <p class="font-bold text-xl my-3 ">Worker Id:</p>{{ r.id }} <br />
            </nuxt-link>
        </template>
    </div>
</template>
