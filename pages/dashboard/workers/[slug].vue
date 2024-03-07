<script setup>
definePageMeta({
    layout: 'dashboard',
    middleware: ["protected"]
})

// @ts-ignore
var results = ref([])

const route = useRoute()
const worker_id = route.params.slug


onMounted(async () => {
    results.value = await $fetch('/api/workers/job', {
        method: 'POST',
        body: {
            worker_id
        }
    })
    console.log(results)
})
</script>

<template>
    <h1 class="inria text-4xl text-center w-full font-bold mt-10">Jobs For Worker Id: {{ worker_id }}</h1>
    <div>
        <template v-for="r in results">
            <div class="mt-20 p-10 pt-0 overflow-hidden">
                <p class="font-bold text-xl my-3">Job Id:</p>{{ r.id }} <br />
                <p class="my-3 font-bold text-xl">Raw Output:</p> {{ r.output }}<br />
                <p class="my-3 font-bold text-xl">Reccomendations:</p> {{ r.recommendations }}
            </div>
        </template>
    </div>
</template>
