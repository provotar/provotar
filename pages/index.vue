<script setup>


useHead({
    title: 'Provotar | Home'
})


onMounted(() => {
    usePolls.getPolls();
})

</script>

<template>
    <div class="main_dashboard flex-row">

    </div>
</template>