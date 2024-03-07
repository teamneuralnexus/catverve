<script setup lang="js">
definePageMeta({
    layout: 'dashboard',
    middleware: ["protected"]
})

const handleSubmit = async () => {
	await $fetch("/api/logout", {
		method: "POST",
		redirect: "manual" // ignore redirect responses
	});
	await navigateTo("/login");
};

</script>
<template>
    <div>
        dashboard
        <form method="post" action="/api/logout" @submit.prevent="handleSubmit">
		<input type="submit" value="Sign out" />
	</form>
    </div>
</template>
<style scoped>
</style>