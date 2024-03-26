<script setup>

defineProps({
    userPolls: Array,
    noPolls: Boolean,
    loadingPolls: Boolean
})
const emit = defineEmits(['showPollDetails', 'createPoll'])

const pollDetails = (pollId) => {
    emit('showPollDetails', pollId)
}


</script>

<template>
    <div class="dashView myPollsView flex-col">
        <div class="topView flex-row">
            <p class="viewHeader">My Polls</p>
            <Buttons btn_class="sml_btn pry_purple" @click="$emit('createPoll')">Start a poll</Buttons>
        </div>
        <div class="viewContent flex-col">
            <div class="tutorialCard flex-row">
                <div class="tutorialCardContent flex-col">
                    <p class="tutorialCardTitle">
                        Setup a campaign in minutes
                    </p>
                    <Buttons btn_class="sml_btn pry_black">Watch Tutorial</Buttons>
                </div>
                <img class="tutorialImg" src="/images/illustrations/vote_box.svg" alt="voteBox">
            </div>
            <div class="pollRack" v-if="loadingPolls">

                <div class="loaders"></div>
                <div class="loaders"></div>
                <div class="loaders"></div>

            </div>

            <div class="pollRack userPolls" v-if="userPolls.length >= 1">
                <div class="pollCard flex-col" v-for="polls in userPolls" @click="pollDetails(polls.id)" :key="polls.id">
                    <img src="/images/icons/poll_flag.svg" alt="poll_flag">
                    <div class="pollCardContent flex-col">
                        <p class="pollCardName">{{ polls.poll_name }}</p>
                        <p class="pollCardVotes">{{ polls.votes.length }} votes</p>
                    </div>
                </div>
            </div>

            <div class="pollRack" v-if="noPolls">
                <div class="start_poll_card flex-row">
                    <Buttons btn_class="sml_btn pry_white" @click="$emit('createPoll')">
                        <template #icon>
                            <PhosphorIconPlus :size="16" weight="bold" />
                        </template>
                        Start a poll
                    </Buttons>
                </div>

            </div>

        </div>
    </div>
</template>