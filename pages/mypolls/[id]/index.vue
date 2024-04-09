<script setup>
import { usePollStore } from '~/store/polls';
const supabase = useSupabaseClient();
useHead({
    title: 'Provotar | My Polls'
})
definePageMeta({
    layout: "dashboard"
})

const usePoll = usePollStore();
const loadingPollDetails = ref(false);
const route = useRoute();
const pollId = ref(route.params.id);

const positionVotes = ref([]);
const totalCandidates = ref(0);


const pollDetails = ref([]);
const userVotes = ref(0)

const getPollDets = async () => {
    try {
        const { data, error } = await supabase
            .from("polls")
            .select("*, votes(*), positions(*, candidates(*))")
            .eq("id", `${pollId.value}`)
        if (data[0]) {
            pollDetails.value = data;
            loadingPollDetails.value = false
            // get total candidates
            pollDetails.value[0].positions.forEach((position) => {
                totalCandidates.value += position.candidates.length
            });

        }

    }
    catch (error) {
        console.log(error);
    }
}



// get individual vote
const filteredVotes = (user_id) => {
    if (pollDetails.value[0] && pollDetails.value[0].votes.length !== 0) {
        return pollDetails.value[0].votes.filter(({ candidate_id }) => candidate_id === user_id).length
    } else {
        return 0
    }
}
// get vote percentage-value
const votePercentage = (user_id, position_id) => {
    if (pollDetails.value[0].votes.length !== 0) {
        positionVotes.value = pollDetails.value[0].votes.filter(vote => vote.position_id === position_id)
        userVotes.value = positionVotes.value.filter(({ candidate_id }) => candidate_id === user_id).length
        const totalVotes = positionVotes.value.length;

        return (userVotes.value / totalVotes) * 100
    } else {
        return 0
    }
}

// toggle poll details options
const isPollOptionsOpen = ref(false)
const togglePollOptions = (event) => {
    if (event.target.classList.contains('optionsIcon')) {
        isPollOptionsOpen.value = true;
    } else {
        isPollOptionsOpen.value = false
    }
}


// copy-link
const linkCopied = ref(false)
const copyLink = async () => {
    try {
        linkCopied.value = true
        await navigator.clipboard.writeText(`${window.origin}/vote/${pollId.value}`);
        setTimeout(() => {
            linkCopied.value = false
        }, 2000);
    } catch (err) {
        console.log(err);
    }
}

// toggle endPollModal
const endPollModal = ref({ isOpen: false })

const openModal = (modal) => {
    modal.isOpen = true;
    document.body.style.overflow = 'hidden';
}
const closeModal = (modal) => {
    modal.isOpen = false;
    document.body.style.overflow = '';
}

// endPoll
const endPoll = () => {
    usePoll.endPoll(pollId.value);
}



onMounted(() => {
    loadingPollDetails.value = true;
    getPollDets();


})


</script>

<template>

    <div class="dashView poll-details-view flex-col" @click="togglePollOptions">
        <NuxtLink to="/mypolls" class="back-button flex-row">
            <PhosphorIconCaretLeft :size="16" weight="bold" />
            <p>Back</p>
        </NuxtLink>

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
                                <div class="poll-ctas flex-row">
                                    <Buttons btn_class="sml_btn sec_purple">Edit Poll</Buttons>
                                    <PhosphorIconDotsThree class="optionsIcon" :size="24" />
                                </div>
                            </div>

                            <Buttons v-if="linkCopied" btn_class="sml_btn pry_grey copylink">
                                Link copied
                                <template #icon>
                                    <PhosphorIconCopy :size="16" weight="bold" />
                                </template>
                            </Buttons>
                            <Buttons v-else btn_class="sml_btn pry_grey copylink" @btn_click="copyLink()">
                                Copy poll link
                                <template #icon>
                                    <PhosphorIconCopy :size="16" weight="bold" />
                                </template>
                            </Buttons>
                            <OptionsMenuPollDetails :is-live="poll.isLive" v-if="isPollOptionsOpen"
                                @endPoll="openModal(endPollModal)" :pollId="pollId" />
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

                    <div class="poll-data-main flex-col" v-for="positions in poll.positions" :key="positions.id">
                        <div class="poll-data-header flex-row">
                            <p class="position-name">{{ positions.position_name }}</p>
                            <div class="see-polls-dropdown flex-row">
                                <PhosphorIconCaretDown :size="24" />
                                <p>See full polls</p>

                            </div>
                        </div>

                        <div class="candidate-data flex-row" v-for="candidate in positions.candidates"
                            :key="candidate.id">
                            <p class="candidate-name">{{ candidate.candidate_name }}</p>

                            <div class="vote-percentage flex-row">
                                <div class="vote-flag flex-row">
                                    <p class="vote-num">{{ filteredVotes(candidate.id) }}</p>
                                    <img src="/images/icons/icon_flag.svg" alt="poll_flag">

                                </div>

                                <p class="percentage-value">{{ votePercentage(candidate.id, positions.id) }}
                                    % </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        <LoadingstatesLoadPollDetails v-if="loadingPollDetails" />
        <ModalsConfirmEndPoll v-if="endPollModal.isOpen" @closeModal="closeModal(endPollModal)"
            @confirmEndPoll="endPoll()" />


    </div>
</template>