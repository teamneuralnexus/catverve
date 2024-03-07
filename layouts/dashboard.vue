<script setup>
const user = useUser()

const route = useRoute()

function changeMenu(x) {
    if(route.path.split('/').includes(x)) {
        return true
    }
    else {
        return false
    }
}


</script>
<template>
    <div class="min-h-screen bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] text-black">
        <div class="flex min-h-screen">
            <div class="min-h-screen text-black sticky w-64 bg-gray-100 border-r-2 border-gray-300 p-5">
                <nuxt-link to="/dashboard" class="">
                    <p class="text-left"><p class="font-bold text-lg mb-1">{{ user.fullname }}</p>{{ user.mail }}</p>
                </nuxt-link>
                <hr class="border-gray-300 my-5 mb-10"/>
                <div>
                    <p :class="{'text-amber-900': changeMenu('upload')}" @click="changeMenu('upload')" class="hover:text-amber-800 cursor-pointer font-bold"><Icon name="material-symbols:upload" class="size-7 mr-2"/><nuxt-link to="/dashboard/upload">Upload</nuxt-link></p>
                    <p :class="{'text-amber-900': changeMenu('logs')}" @click="changeMenu('logs')" class="hover:text-amber-800 cursor-pointer font-bold mt-8"><Icon name="icon-park-outline:upload-logs" class="size-7 mr-2"/><nuxt-link to="/dashboard/logs">Logs</nuxt-link></p>
                    <p :class="{'text-amber-900': changeMenu('workers')}" @click="changeMenu('workers')" class="hover:text-amber-800 cursor-pointer font-bold mt-8"><Icon name="fluent-mdl2:repair" class="size-7 mr-2"/><nuxt-link to="/dashboard/workers">Workers</nuxt-link></p>
                    <p :class="{'text-amber-900': changeMenu('statistics')}" @click="changeMenu('statistics')" class="hover:text-amber-800 cursor-pointer font-bold mt-8"><Icon name="oui:stats" class="size-7 mr-2"/><nuxt-link to="/dashboard/statistics">Statistics</nuxt-link></p>
                </div>
            </div>
            <div class="min-h-screen w-4/5">
    
                <slot/>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>