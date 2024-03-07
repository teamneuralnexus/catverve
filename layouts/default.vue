<script setup>
</script>
<template>
    <div class="min-h-screen bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] text-black">
        <!-- Navbar -->
        <div class="p-5 flex inter">
            <div class="w-1/3">
                <div class="w-fit block mx-auto ">
                    <img class="inline w-32" src="/catvervelogo.webp"/>
                </div>
            </div>
            <div class="w-2/6">
                <!--Spacing-->
            </div>
            <div class="w-1/3">
                <div class="w-fit block mx-auto">
                    <div class="lg:flex gap-10 font-semibold text-gray-600 hidden">
                        <h2 class="mt-5 cursor-pointer hover:text-black">Features</h2>
                        <h2 class="mt-5 cursor-pointer hover:text-black">Pricing</h2>
                        <nuxt-link to="/login" class="mt-5 cursor-pointer hover:text-black">Login</nuxt-link>
                        <nuxt-link to="/signup" class="px-5 mt-3 py-2 bg-amber-900 hover:bg-amber-950 cursor-pointer text-white rounded-3xl">Signup For Free</nuxt-link>
                    </div>
                </div>
            </div>
        </div>
        <slot />
    </div>
</template>
<style scoped>

</style>