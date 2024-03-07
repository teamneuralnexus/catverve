<script setup>
definePageMeta({
    layout: 'auth'
})

const user = useUser();
if (user.value) {
	await navigateTo("/dashboard"); // redirect to profile page
}

const handleSubmit = async (e) => {
	if (!(e.target instanceof HTMLFormElement)) return;
	const formData = new FormData(e.target);
	await $fetch("/api/signup", {
		method: "POST",
		body: {
			mail: formData.get("mail"),
            fullname: formData.get("fullname"),
			password: formData.get("password")
		},
		redirect: "manual" // ignore redirect responses
	});
	await navigateTo("/dashboard"); // profile page
};
</script>
<template>
    <div class="inter">
        <div class="w-96 p-10 my-auto mx-auto block bg-white/60 border-amber-900 border-2 rounded-3xl backdrop-blur  pt-5">
            <h1 class="inter font-bold text-xl text-center mb-1">Create your account</h1>
            <p class="text-sm text-center mt-2">Welcome to catverve!<br>Get Ready to quality test your content and be a vervcian now</p>
            <form class="mt-5" method="post" action="/api/signup" @submit.prevent="handleSubmit">
                <h1 class="font-semibold text-lg mb-2 mt-5"><Icon name="wpf:name" class="mr-1" /> Name</h1>
                <input name="fullname" type="text" placeholder="Enter your fullname" class="w-full mb-3 bg-slate-200/10  backdrop-blur py-2 px-5 rounded-3xl  shadow-xl hover: border 2 hover:border-amber-900"/>
                <h1 class="font-semibold text-lg mb-2 mt-5"><Icon name="ic:baseline-email" class="mr-1" /> Email</h1>
                <input name="mail"  type="email" placeholder="Enter your email" class="w-full mb-3 bg-slate-200/10  backdrop-blur py-2 px-5 rounded-3xl  shadow-xl hover: border 2 hover:border-amber-900"/>
                <h1 class="font-semibold text-lg mb-2 mt-5"><Icon name="material-symbols:password" class="mr-2" />Password</h1>
                <input name="password" type="password" placeholder="Enter your password" class="w-full mb-3 bg-slate-200/10  backdrop-blur py-2 px-5 rounded-3xl  shadow-xl hover: border 2 hover:border-amber-900"/>
                <button class="px-8 py-2 rounded-3xl w-60 mt-5 block mx-auto transition-all bg-black text-white cursor-pointer hover:bg-amber-900/70">Create Account<Icon name="formkit:submit" class="ml-1" /></button>
            </form>
            <p class="mt-5 text-sm">Already have an account? <nuxt-link class="font-bold cursor-pointer text-amber-900" to="/login">Login Here</nuxt-link></p>
        </div>
    </div>
</template>
<style scoped>

</style>