<script setup>

const { pollDetails } = defineProps(['pollDetails']);
const userVotes = ref(0)

const filteredVotes = (user_id) => {
    if (pollDetails[0]) {
        return pollDetails[0].votes.filter(({ candidate_id }) => candidate_id === `${user_id}`).length
    }
}
const votePercentage = (user_id) => {
    if (pollDetails[0] && pollDetails[0].votes.length !== 0) {
        userVotes.value = pollDetails[0].votes.filter(({ candidate_id }) => candidate_id === `${user_id}`).length

        const totalVotes = pollDetails[0].votes.length;

        return (userVotes.value / totalVotes) * 100
    } else {
        return 0
    }
}

</script>




<template>
    <div class="dashView poll-details-view flex-col">
        <div class="back-button flex-row" @click="$emit('backtopolls')">
            <PhosphorIconCaretLeft :size="16" weight="bold" />
            <p>Back</p>
        </div>

        <div v-if="pollDetails">
            <div class="poll-details-wrapper flex-col" v-for="poll in pollDetails" :key="poll.id">
                <div class="top-section flex-col">
                    <div class="poll-header flex-col">
                        <img src="/images/icons/big_flag.svg" class="big-flag" alt="big_flag">
                        <div class="poll-header-content flex-col">
                            <div class="poll-title-cta flex-row">
                                <p class="poll-title">{{ poll.poll_name }}</p>
                                <div class="poll-ctas flex-row">
                                    <Buttons btn_class="sml_btn sec_purple">Edit Poll</Buttons>
                                    <PhosphorIconDotsThree :size="24" />
                                </div>
                            </div>

                            <Buttons btn_class="sml_btn pry_grey copylink">
                                Copy poll link
                                <template #icon>
                                    <PhosphorIconCopy :size="16" weight="bold" />
                                </template>
                            </Buttons>

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
                                <p class="poll-stat-value">{{ poll.positions[0].candidates.length }}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="poll-data-wrapper flex-col">
                    <p class="poll-data-title">Poll Statistics</p>

                    <div class="poll-data-main flex-col" v-for="positions in poll.positions">
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

                                <p class="percentage-value">{{ votePercentage(candidate.id) }} %</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>