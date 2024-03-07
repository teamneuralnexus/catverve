<script setup>
</script>
<template>
    <div class="min-h-screen bg-gradient-to-r from-yellow-950 to-amber-900/60  pb-10 text-black">
        
        <div class="w-fit block ml-2 pt-5">
            <Nuxt-Link to="/"><img class="inline w-32 cursor-pointer" src="/image.webp"/></Nuxt-Link>
        </div>
        <slot/>
    </div>
</template>
<style scoped>
.cover {
    background-image: url('/image6.png');
}
</style>