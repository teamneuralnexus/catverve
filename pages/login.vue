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
	await $fetch("/api/login", {
		method: "POST",
		body: {
			mail: formData.get("mail"),
			password: formData.get("password")
		},
		redirect: "manual" // ignore redirect responses
	});
	await navigateTo("/dashboard/upload"); // profile page
};
</script>
<template>
   
    <div class="inter mt-10">
        <div class="w-96 p-10 my-auto mx-auto block bg-white/60 border-amber-900 border-2 rounded-3xl backdrop-blur  pt-5">
            <h1 class="inter font-bold text-xl text-center mb-1">Sign in to your account</h1>
            <p class="text-sm text-center mt-2">Welcome back user! Get Ready to quality test more items</p>
            <form class="mt-5" method="post" action="/api/login" @submit.prevent="handleSubmit" enctype="multipart/form-data">
                <h1 class="font-semibold text-lg mb-2 mt-10"><Icon name="ic:baseline-email" class="mr-1" /> Email</h1>
                <input name="mail" type="email" placeholder="Enter your email" class="w-full mb-3 bg-slate-200/10  backdrop-blur py-2 px-5 rounded-3xl  shadow-xl hover: border 2 hover:border-amber-900"/>
                <h1 class="font-semibold text-lg mt-5"><Icon name="material-symbols:password" class="mr-2" />Password</h1>
                <input name="password" type="password" placeholder="Enter your password" class="w-full my-3  py-2 px-5 rounded-3xl shadow-xl  hover: border 2 hover:border-amber-900"/>
                <button class="px-8 py-2 rounded-3xl w-60 mt-5 block mx-auto transition-all bg-black text-white cursor-pointer hover:bg-amber-900/70">Submit<Icon name="formkit:submit" class="ml-1" /></button>
            </form>
            <p class="mt-5 text-sm">Don't have an account? <nuxt-link class="font-bold cursor-pointer text-amber-900" to="/signup">Signup Here</nuxt-link></p>
        </div>

    </div>
</template>
<style scoped>

</style>