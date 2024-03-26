<script setup>
import { usePollStore } from '~/store/polls';


useHead({
    title: 'Provotar | Home'
})

// toggleDashboardView
const selectedView = ref(1)
const selectView = (view) => {
    selectedView.value = view;
}



// fetchPolls
const usePolls = usePollStore();
let userPolls = ref([]);
let noPolls = ref(false);
let loadingPolls = ref(true);


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


// show poll details
const pollDetail = ref(null);
const showPollDetails = (pollId) => {
    // console.log(pollId);
    if (userPolls.value) {
        const pollObject = userPolls.value.find(({ id }) => id === `${pollId}`)
        pollDetail.value = [pollObject];
        // console.log(pollDetail.value);
    }
    selectView('pollDetail');
}


// modals object
let pollNameModal = ref({ isOpen: false });

// toggle modal function
const openModal = (modal) => {
    modal.isOpen = true
    document.body.style.overflow = 'hidden';
}
const closeModal = (modal) => {
    modal.isOpen = false
    document.body.style.overflow = ''
}

const goToHome = () => {
    selectView(1);
    window.location.reload();
}

// // update poll name from child
// const newPollName = ref('')
// const updatePollName = (pollname) => {
//     newPollName.value = pollname
// }
// const savePollName = () => {
//     usePolls.saveCandidates(newPollName.value)
//     closeModal(pollNameModal.value);
//     selectView('positionDetails')

// }


const gotToPositions = () => {
    closeModal(pollNameModal.value);
    selectView('addPositionDetails')
}

onMounted(() => {
    usePolls.getPolls();
})

</script>

<template>
    <div class="main_dashboard flex-row">
        <!-- sideNav -->
        <NavSidenav @selectViewOne="selectView(1)" @selectViewTwo="selectView(2)" @selectViewThree="selectView(3)"
            @selectViewFour="selectView(4)" @selectViewFive="selectView(5)">


        </NavSidenav>

        <DashViewsMyPolls :userPolls="userPolls" :loadingPolls="loadingPolls" :noPolls="noPolls"
            v-if="selectedView === 1" @showPollDetails="showPollDetails" @createPoll="openModal(pollNameModal)">

        </DashViewsMyPolls>

        <DashViewsMyOrgs v-if="selectedView === 2" />
        <DashViewsMyPreferences v-if="selectedView === 3" />
        <DashViewsMyNotifications v-if="selectedView === 4" />
        <DashViewsMySubcription v-if="selectedView === 5" />


        <PollsPollDetails v-if="selectedView === 'pollDetail'" :pollDetails="pollDetail" @backtopolls="selectView(1)" />

        <ModalsNewPoll v-if="pollNameModal.isOpen" @closeModal="closeModal(pollNameModal)" @continue="gotToPositions" />

        <PollsAddPositionDetails v-if="selectedView === 'addPositionDetails'" @goToHome="goToHome" />

    </div>
</template>