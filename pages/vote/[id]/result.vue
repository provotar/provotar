<script setup>
const supabase = useSupabaseClient();
const route = useRoute();
const pollID = ref(route.params.id);
const pollDetails = ref([]);
useHead({
    title: 'Provotar | Results'
})

const userVotes = ref()
const positions = ref([]);
const loadingPollDetails = ref(false);

const getPollDets = async () => {
    loadingPollDetails.value = true;
    try {
        const { data, error } = await supabase
            .from("polls")
            .select("*, votes(*), positions(*, candidates(*))")
            .eq("id", `${pollID.value}`)

        if (data[0]) {
            pollDetails.value = data;
            positions.value = data[0].positions
            loadingPollDetails.value = false;
        }

    }
    catch (error) {
        console.log(error);
    }
}

if (pollDetails.value[0]) {
    pollDetails.value[0].positions.forEach((position) => {
        totalCandidates.value += position.candidates.length
    });
}

// total candidates
const totalCandidates = computed(() => {
    let total = 0;
    if (pollDetails.value[0]) {
        pollDetails.value[0].positions.forEach((position) => {
            total += position.candidates.length
        });
    }
    return total;
})


// get individual vote
const filteredVotes = (user_id) => {
    if (pollDetails.value[0] && pollDetails.value[0].votes.length !== 0) {
        return pollDetails.value[0].votes.filter(({ candidate_id }) => candidate_id === `${user_id}`).length
    } else {
        return 0
    }
}

// get vote percentage-value
const votePercentage = (user_id, position_id) => {

    if (pollDetails.value[0].votes.length !== 0) {

        const positionVotes = pollDetails.value[0].votes.filter(vote => vote.position_id === position_id)
        const userVotes = positionVotes.filter(({ candidate_id }) => candidate_id === user_id).length
        const totalVotes = positionVotes.length;

        return ((userVotes / totalVotes) * 100).toFixed(1)
    } else {
        return 0
    }
}


onMounted(() => {
    getPollDets();
})

</script>

<template>

    <div class="dashView poll-details-view result flex-col">
        <div v-if="pollDetails">
            <div class="poll-details-wrapper flex-col" v-for="poll in pollDetails" :key="poll.id">
                <div class="top-section flex-col">
                    <div class="poll-header flex-col">
                        <img src="/images/icons/big_flag.svg" class="big-flag" alt="big_flag">
                        <div class="poll-header-content flex-col">
                            <div class="poll-title-cta flex-row">
                                <div class="name-livecheck flex-row">
                                    <p class="poll-title">{{ poll.poll_name }}</p>
                                    <div v-if="poll.isLive" class="live-check flex-row">
                                        <p class="live-text">Live</p>
                                        <img class="live-dot" src="/images/icons/green_dot.svg" alt="green_dot">
                                    </div>
                                    <div v-else class="ended-check flex-row">
                                        <img src="/images/icons/icon_flag.svg" alt="icon_flag">
                                        <p>Ended</p>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>

                    <div class="poll-stat-card-wrapper">
                        <div class="poll-stat-card flex-row">
                            <img src="/images/icons/total_votes_icon.svg" alt="total_votes_icon">
                            <div class="poll-stat-dets flex-col">
                                <p class="poll-stat-title">Total Votes</p>
                                <p class="poll-stat-value">{{ poll.votes.length }}</p>
                            </div>
                        </div>
                        <div class="poll-stat-card flex-row">
                            <img src="/images/icons/total_candidates_icon.svg" alt="total_candidates_icon">
                            <div class="poll-stat-dets flex-col">
                                <p class="poll-stat-title">Total Candidates</p>
                                <p class="poll-stat-value">{{ totalCandidates }}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="poll-data-wrapper flex-col">
                    <p class="poll-data-title">Poll Statistics</p>

                    <div class="poll-data-main flex-col" v-for="position in positions" :key="position.id">
                        <div class="poll-data-header flex-row">
                            <p class="position-name">{{ position.position_name }}</p>
                            <div class="see-polls-dropdown flex-row">
                                <PhosphorIconCaretDown :size="24" />
                                <p>See full polls</p>

                            </div>
                        </div>

                        <div class="candidate-data flex-row" v-for="candidate in position.candidates"
                            :key="candidate.id">
                            <p class="candidate-name">{{ candidate.candidate_name }}</p>

                            <div class="vote-percentage flex-row">
                                <div class="vote-flag flex-row">
                                    <p class="vote-num">{{ filteredVotes(candidate.id) }}</p>
                                    <img src="/images/icons/icon_flag.svg" alt="poll_flag">

                                </div>

                                <p class="percentage-value">{{ votePercentage(candidate.id, position.id) }} %</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>


        <LoadingstatesLoadPollDetails v-if="loadingPollDetails" />
    </div>
</template>