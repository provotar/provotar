<script setup>
import { usePollStore } from '~/store/polls';
const supabase = useSupabaseClient();

useHead({
    title: 'Provotar | Invitees'
})
definePageMeta({
    layout: "dashboard"
})


const route = useRoute();
const usePolls = usePollStore();
const pollId = ref(route.params.id);
const inviteeList = ref([])
const inviteeDetails = ref([])

const loadingInvitees = ref(false);
const emptyInvites = ref(false)

const newInviteModal = ref({ isOpen: false });
const confirmSaveInvitees = ref({ isOpen: false });
const voteInviteSent = ref({ isOpen: false })

const openModal = (modal) => {
    modal.isOpen = true;
    document.body.style.overflow = 'hidden';
}
const closeModal = (modal) => {
    modal.isOpen = false;
    document.body.style.overflow = '';
}

const getPollDets = async () => {
    try {
        const { data, error } = await supabase
            .from("polls")
            .select("*, invitees(*)")
            .eq("id", `${pollId.value}`)
        if (data[0].length > 0) {
            inviteeDetails.value = data;
            inviteeList.value = inviteeDetails.value[0].invitees
            loadingInvitees.value = false
        } else {
            loadingInvitees.value = false
            emptyInvites.value = true
        }

    }
    catch (error) {
        console.log(error);
    }
};

const savedInvitees = ref([]);

// deleteInvitee emit
const deleteInvitee = (id) => {
    savedInvitees.value = savedInvitees.value.filter(invitee => invitee.invitee_id !== id)
}

// saved poll to store
const saveInviteeToStore = () => {
    if (savedInvitees.value.length !== 0) {
        usePolls.inviteeList = savedInvitees.value;
        closeModal(newInviteModal.value)
        openModal(confirmSaveInvitees.value)
    }
}
// confirm modal to invitee list modal
const backToInviteModal = () => {
    closeModal(confirmSaveInvitees.value);
    openModal(newInviteModal.value);
}

const saveInviteeToDB = () => {
    console.log(usePolls.inviteeList);
    usePolls.saveInviteesToDB();
    closeModal(confirmSaveInvitees.value)
}

onMounted(() => {
    loadingInvitees.value = true
    getPollDets();
})
</script>
<template>
    <div class="dashView invitees flex-col">
        <NuxtLink :to="`/mypolls/${pollId}`" class="back-button flex-row">
            <PhosphorIconCaretLeft :size="16" weight="bold" />
            <p>Back</p>
        </NuxtLink>

        <div class="invitee-wrapper flex-col">
            <div class="topView flex-row">
                <p class="viewHeader">Invitees</p>
                <div class="invitee-cta flex-row">
                    <Buttons btn_class="sml_btn sec_purple" @btn_click="openModal(newInviteModal)">Send Invite</Buttons>
                    <PhosphorIconDotsThree class="optionsIcon" :size="24" />
                </div>
            </div>

            <LoadingstatesLoadInvitess v-if="loadingInvitees" />

            <div v-if="inviteeList.length > 0">
                <TablesInviteeList :inviteeList="inviteeList" />
            </div>
            <EmptystatesPollsNoInvitees v-if="emptyInvites" @sendNewInvite="openModal(newInviteModal)" />
        </div>

        <ModalsAddInvitees v-if="newInviteModal.isOpen" @closeModal="closeModal(newInviteModal)" :pollId="pollId"
            :savedInvitees="savedInvitees" @deleteInvitee="deleteInvitee" @storeInvitees="saveInviteeToStore()" />

        <ModalsConfirmSaveInvitees v-if="confirmSaveInvitees.isOpen" @goBack="backToInviteModal()"
            @confirmAddInvitees="saveInviteeToDB()" />

        <ModalsSuccessVoteInviteSent v-if="voteInviteSent.isOpen" @closeInviteSent="closeModal(voteInviteSent)" />
    </div>

</template>