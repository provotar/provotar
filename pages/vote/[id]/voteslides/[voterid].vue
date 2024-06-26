<script setup>
import { useVoteStore } from '~/store/vote';
const { $openModal, $closeModal } = useNuxtApp();
const useVote = useVoteStore();
const supabase = useSupabaseClient();
const route = useRoute();
const router = useRouter();
const voteID = ref(route.params.id);
const voterID = ref(route.params.voterid)
const slideDetails = ref([]);
const inviteeDets = ref([]);
const loading = ref(false);
useHead({
    title: 'Provotar | Vote'
})

// modals
const confirmVoteModal = ref({ isOpen: false });
const voteSentModal = ref({ isOpen: false });

watch(() => useVote.voteSubmitting, (newValue, oldValue) => {
    loading.value = newValue;
})


// fetch vote details
const getVoteDets = async () => {
    try {

        const { data, error } = await supabase
            .from("polls")
            .select("*, invitees(*), votes(*), positions(*, candidates(*))")
            .eq("id", `${voteID.value}`)
        if (data) {
            slideDetails.value = data;
            // find invitee dets
            inviteeDets.value = slideDetails.value[0].invitees.find(invitee => invitee.id === voterID.value)
        }

    }
    catch (error) {
        console.log(error);
    }
}


// save votes to Database
const saveVotesToDB = () => {
    useVote.saveVotesToDB();
    // useVote.updateVotedStatus();
    $closeModal(confirmVoteModal.value);
    $openModal(voteSentModal.value);
}

const seePollStats = () => {
    router.push(`/results/${voteID.value}/`)
}
const goToIntro = () => {
    router.push(`/vote/${voteID.value}/`)
}



onMounted(() => {
    // save invitee ID to votestore
    useVote.inviteeId = voterID.value;
})

onBeforeMount(() => {
    getVoteDets();
    // reroute if user has voted
    if (inviteeDets.value.hasVoted) {
        router.push(`/vote/${voteID.value}/hasVoted`)
    }
})

</script>

<template>
    <div>
        <div v-if="slideDetails[0]">
            <CarouselsPollSlides :positionDets="slideDetails" @saveVotes="$openModal(confirmVoteModal)" />
        </div>
        <ModalsConfirmSubmitVotes v-if="confirmVoteModal.isOpen" @closeModal="$closeModal(confirmVoteModal)"
            @confirmSubmitVotes="saveVotesToDB()" :loading="loading" />
        <ModalsSuccessVotesSent v-if="voteSentModal.isOpen" @seePollStats="seePollStats()" @goToIntro="goToIntro()" />
    </div>
</template>