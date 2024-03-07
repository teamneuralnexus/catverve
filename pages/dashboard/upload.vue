<script setup lang="js">
definePageMeta({
    layout: 'dashboard',
    middleware: ["protected"]
})


const btn = ref("Submit")
const isDragging = ref(false)
const files = reactive([])
const file = ref(null)

const onChange = () => {
    files.length = 0
    console.log(file.value.files)
    // @ts-ignore
    files.push(file.value.files);
}

const dragover = () => {
    isDragging.value = true
}

const dragleave = () => {
    isDragging.value = false
}

const drop = (e) => {
    files.length = 0
    // @ts-ignore
    // isDragging.value = false
    file.value.files = e.dataTransfer.files
    files.push(e.dataTransfer.files)
    console.log(file.value.files)
}

// const remove = (f, k) => {
//     console.log(f)
//     files[f].splice(1, k);
// }

function generateURL(file) {
    let fileSrc = URL.createObjectURL(file);
    btn.value = "Loading"
    setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
    }, 1000);
    return fileSrc;
}


async function onSubmit() {
    const formData = new FormData()
    btn.value = 'Loading'
    console.log(file.value.files.length)
    for (let index = 0; index < file.value.files.length; index++) {
        formData.append('attachments', file.value.files[index])
    }
    await $fetch('/api/ai/process', {
        method: 'POST',
        body: formData
    }).then(async (k)=>{
        btn.value = 'Submit'
        await navigateTo('/dashboard/workers/' + k.worker_id );
    })
}
</script>

<template>
    <div>
        <h1 class="text-4xl font-bold text-center w-full my-10">Got a new Product Catalogue?</h1>
        <div class="border-t-4 border-amber-900 mx-28 p-10">
            <div :class="{ '!border-amber-900': isDragging }" class="dropzone-container rounded-3xl"
                @dragover.prevent="dragover" @dragleave="dragleave" @drop.prevent="drop">
                <input type="file" multiple name="file" id="fileInput" class="hidden-input" @change="onChange"
                    ref="file" accept=".pdf,.jpg,.jpeg,.png" />

                <label for="fileInput" class="file-label">
                    <div v-if="isDragging">Release to drop files here.</div>
                    <div v-else>Drop files here or <u>click here</u> to upload.</div>
                </label>
                <div class="preview-container mt-4" v-if="files['length']">
                    <div v-for="f in files" >
                        <div v-for="k in f" class="preview-card">

                            <div>
                                <img class="preview-img"  :src="generateURL(k)" />
                                <p>
                                    {{ k.name, k.url }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h1 @click="onSubmit" class="px-10 py-2 block ml-auto mt-10 w-fit font-bold inria text-xl shadow-xl cursor-pointer hover:bg-amber-950 bg-amber-900 text-white text-center rounded-3xl">{{ btn }}</h1>
        </div>
    </div>
</template>

<style scoped>
.dropzone-container {
    padding: 4rem;
    background: #f7fafc;
    border: 2px dashed;
    border-color: #9e9e9e;
}

.hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
}

.file-label {
    font-size: 20px;
    display: block;
    cursor: pointer;
}

.preview-container {
    display: flex;
    margin-top: 2rem;
}

.preview-card {
    display: flex;
    border: 1px solid #a2a2a2;
    padding: 5px;
    margin-left: 5px;
}

.preview-img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid #a2a2a2;
    background-color: #a2a2a2;
}
</style>