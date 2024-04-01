<script setup>
const supabase = useSupabaseClient();
definePageMeta({
    layout: "dashboard"
})

const route = useRoute();
const pollId = ref(route.params.id);
const inviteeList = ref([])
const inviteeDetails = ref([])

const newInviteModal = ref({ isOpen: false });

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
        if (data) {
            inviteeDetails.value = data;
            inviteeList.value = inviteeDetails.value[0].invitees
        }

    }
    catch (error) {
        console.log(error);
    }
}


onMounted(() => {
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

            <div v-if="inviteeList.length">
                <h1>There are invitees</h1>
            </div>
            <EmptystatesPollsNoInvitees v-else @sendNewInvite="openModal(newInviteModal)" />
        </div>

        <ModalsAddInvitees v-if="newInviteModal.isOpen" @closeModal="closeModal(newInviteModal)" :pollId="pollId" />
    </div>

</template>