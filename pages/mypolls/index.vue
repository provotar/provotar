<script setup>
import { usePollStore } from '~/store/polls';
import { useUserStore } from '~/store/user';
const { $openModal, $closeModal } = useNuxtApp();
const route = useRouter()
useHead({
    title: 'Provotar | My Polls'
})

definePageMeta({
    layout: "dashboard"
})


const usePolls = usePollStore();
let userPolls = ref([]);
let noPolls = ref(false);
let loadingPolls = ref(true);

// userDetails
const useUser = useUserStore();
let userDetails = ref();



watch(() => useUser.details, (newValue, oldValue) => {
    userDetails.value = newValue[0]
})

// watch all polls
watch(() => usePolls.userPolls, (newValue, oldValue) => {
    userPolls.value = newValue;
})
// watch loading
watch(() => usePolls.loadingPolls, (newValue, oldValue) => {
    loadingPolls.value = newValue;
})
// watch empty polls
watch(() => usePolls.noPolls, (newValue, oldValue) => {
    noPolls.value = newValue;
})

// save poll name
const pollNameModal = ref({ isOpen: false })
const savePollName = () => {
    $closeModal(pollNameModal.value);
    route.push("/newpoll/addPositions")
}

onMounted(() => {
    usePolls.getPolls();
    useUser.getUserSession();
})


</script>

<template>
    <div class="dashView myPollsView flex-col">
        <div class="topView flex-row">
            <p class="viewHeader">My Polls</p>
            <div v-if="userDetails">
                <div v-if="userDetails.isPro || userPolls.length < 4">
                    <Buttons btn_class="sml_btn pry_purple" @btn_click="$openModal(pollNameModal)">Start a poll
                    </Buttons>
                </div>
                <div v-else>
                    <Buttons btn_class="sml_btn pry_purple">✨ Upgrade to Pro
                    </Buttons>
                </div>
            </div>
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
                <NuxtLink class="pollCard flex-col" v-for="polls in userPolls" :key="polls.id"
                    :to="`/mypolls/${polls.id}/`">
                    <img src="/images/icons/poll_flag.svg" alt="poll_flag">
                    <div class="pollCardContent flex-col">
                        <p class="pollCardName">{{ polls.poll_name }}</p>
                        <div class="flex-row pollcard-subinfo">
                            <p class="pollCardVotes">{{ polls.votes.length }} votes</p>
                            <img v-if="polls.isLive" class="divider_dot" src="/images/icons/divider_dot.svg"
                                alt="divider_dot">
                            <div v-if="polls.isLive" class="live-check flex-row">
                                <p class="live-text">Live</p>
                                <img class="live-dot" src="/images/icons/green_dot.svg" alt="green_dot">
                            </div>
                            <div v-else class="ended-check flex-row">
                                <img src="/images/icons/icon_flag.svg" alt="icon_flag">
                                <p class="ended-text">Ended</p>
                            </div>
                        </div>
                    </div>
                </NuxtLink>
            </div>

            <div class="pollRack" v-if="noPolls">
                <div class="start_poll_card flex-row">
                    <Buttons btn_class="sml_btn pry_white" @click="$openModal(pollNameModal)">
                        <template #icon>
                            <PhosphorIconPlus :size="16" weight="bold" />
                        </template>
                        Start a poll
                    </Buttons>
                </div>

            </div>

        </div>
        <ModalsNewPoll v-if="pollNameModal.isOpen" @closeModal="$closeModal(pollNameModal)"
            @continue="savePollName()" />
    </div>

</template>