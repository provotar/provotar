<script setup>
const supabase = useSupabaseClient();
const route = useRoute();
const voteID = ref(route.params.id);
const slideDetails = ref([]);

const getVoteDets = async () => {
    try {
        const { data, error } = await supabase
            .from("polls")
            .select("*, votes(*), positions(*, candidates(*))")
            .eq("id", `${voteID.value}`)
        if (data) {
            slideDetails.value = data;
        }

    }
    catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    getVoteDets();
})

</script>

<template>
    <div v-if="slideDetails[0]">
        <CarouselsPollSlides :positionDets="slideDetails" />
    </div>
</template>