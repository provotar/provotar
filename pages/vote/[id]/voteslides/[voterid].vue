<script setup>
import { useVoteStore } from '~/store/vote';
const useVote = useVoteStore();
const supabase = useSupabaseClient();
const route = useRoute();
const router = useRouter();
const voteID = ref(route.params.id);
const voterID = ref(route.params.voterid)
const slideDetails = ref([]);
const inviteeDets = ref([]);


// modals
const confirmVoteModal = ref({ isOpen: false });
const voteSentModal = ref({ isOpen: false });


const openModal = (modal) => {
    modal.isOpen = true;
    document.body.style.overflow = 'hidden';
}
const closeModal = (modal) => {
    modal.isOpen = false;
    document.body.style.overflow = '';
}

const getVoteDets = async () => {
    try {
        const { data, error } = await supabase
            .from("polls")
            .select("*, invitees(*), votes(*), positions(*, candidates(*))")
            .eq("id", `${voteID.value}`)
        if (data) {
            slideDetails.value = data;
            console.log(slideDetails.value[0].invitees);
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
    useVote.updateVotedStatus();
    closeModal(confirmVoteModal.value);
    openModal(voteSentModal.value);
}

const seePollStats = () => {
    router.push(`/vote/${voteID.value}/result`)
}
const goToIntro = () => {
    router.push(`/vote/${voteID.value}/`)
}



onMounted(() => {
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
            <CarouselsPollSlides :positionDets="slideDetails" @saveVotes="openModal(confirmVoteModal)" />
        </div>
        <ModalsConfirmSubmitVotes v-if="confirmVoteModal.isOpen" @closeModal="closeModal(confirmVoteModal)"
            @confirmSubmitVotes="saveVotesToDB()" />
        <ModalsSuccessVotesSent v-if="voteSentModal.isOpen" @seePollStats="seePollStats()" @goToIntro="goToIntro()" />
    </div>
</template>