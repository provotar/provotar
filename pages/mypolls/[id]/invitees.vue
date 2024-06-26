<script setup>
import { usePollStore } from '~/store/polls';
const { $openModal, $closeModal } = useNuxtApp();
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
const inviteeList = ref([]);
const inviteeDetails = ref([]);

const loadingInvitees = ref(false);
const emptyInvites = ref(false);

const duplicateEmails = ref([]); // duplicate input invitee emails 
const doubleEmails = ref([]); // double invitee emails that have already been invited


// modals
const newInviteModal = ref({ isOpen: false });
const duplicateEmailModal = ref({ isOpen: false });
const doubleEmailModal = ref({ isOpen: false });
const confirmSaveInvitees = ref({ isOpen: false });
const voteInviteSent = ref({ isOpen: false });

const savedInvitees = ref([]);
const existingEmails = ref([]);


const getPollDets = async () => {
    try {
        const { data, error } = await supabase
            .from("polls")
            .select("*, invitees(*)")
            .eq("id", `${pollId.value}`)


        if (data[0].invitees.length > 0) {
            inviteeDetails.value = data;
            inviteeList.value = data[0].invitees
            // console.log(inviteeList.value);
            loadingInvitees.value = false

            // get all invited emails
            if (inviteeList.value.length > 0) {
                existingEmails.value = inviteeList.value.map(invitee => invitee.email)
                // console.log(invitedEmails.value);
            }
        } else {
            loadingInvitees.value = false
            emptyInvites.value = true
        }

    } catch (error) {
        console.log(error);
    }

};



// get duplicate emails and count
const findDuplicateEmails = () => {
    // email and count object
    const emailCounts = {}
    for (const invitee of savedInvitees.value) {

        if (emailCounts[invitee.invitee_email]) {
            // add 1 to email count if email already exist
            emailCounts[invitee.invitee_email] = emailCounts[invitee.invitee_email] + 1;
        } else {
            // initialise each email pair value to 1
            emailCounts[invitee.invitee_email] = 1;
        }
    }


    // filter emails with more than 1 count
    const duplicateEmailsArray = Object.entries(emailCounts).
        filter(([email, count]) => count > 1).
        map(([email, count]) => {

            // transform each entry to an object with email and count properties
            return { email: email, count: count }
        })


    return duplicateEmailsArray;
};

// remove duplicate input  emails
const removeDuplicateEmails = () => {
    // new Set to keep track of unique emails
    const emailSet = new Set();
    const uniqueInvitees = [];

    for (const invitee of savedInvitees.value) {
        if (!emailSet.has(invitee.invitee_email)) {
            emailSet.add(invitee.invitee_email);
            uniqueInvitees.push(invitee);
        }
    }
    savedInvitees.value = uniqueInvitees;
    backtoEditInvitees();
}

// remove already invited emails
const clearDoubleEmails = () => {
    savedInvitees.value = savedInvitees.value.filter(invitee => !doubleEmails.value.includes(invitee.invitee_email));
    backtoEditInvitees();
}

// deleteInvitee emit
const deleteInvitee = (id) => {
    savedInvitees.value = savedInvitees.value.filter(invitee => invitee.invitee_id !== id)
}


const backtoEditInvitees = () => {
    doubleEmails.value = [];
    $closeModal(duplicateEmailModal.value);
    $closeModal(doubleEmailModal.value);
    $closeModal(confirmSaveInvitees.value);
    $openModal(newInviteModal.value)
}



// saved poll to store
const saveInviteeToStore = () => {
    // handle duplicate email inputs
    duplicateEmails.value = findDuplicateEmails();
    if (duplicateEmails.value.length > 0) {
        $closeModal(newInviteModal.value);
        $openModal(duplicateEmailModal.value);
    } else
        if (savedInvitees.value.length !== 0) {
            // get the emails that have already been invited
            for (const invitee of savedInvitees.value) {
                if (existingEmails.value.includes(invitee.invitee_email)) {
                    doubleEmails.value.push(invitee.invitee_email);
                }
            }


            if (doubleEmails.value.length > 0) {
                // show Emails already exist modal
                $closeModal(newInviteModal.value);
                $openModal(doubleEmailModal.value);
            } else {
                // show invite confirmation
                usePolls.inviteeList = savedInvitees.value;
                $closeModal(newInviteModal.value);
                $openModal(confirmSaveInvitees.value);
            }

        }
}
const saveInviteeToDB = () => {
    usePolls.saveInviteesToDB();
    // refresh invitee list
    getPollDets();
    $closeModal(confirmSaveInvitees.value)

}





onMounted(() => {
    loadingInvitees.value = true;
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
                    <Buttons btn_class="sml_btn sec_purple" @btn_click="$openModal(newInviteModal)">Send Invite
                    </Buttons>
                    <PhosphorIconDotsThree class="optionsIcon" :size="24" />
                </div>
            </div>

            <LoadingstatesLoadInvitess v-if="loadingInvitees" />

            <div v-if="inviteeList.length > 0">
                <TablesInviteeList :inviteeList="inviteeList" />
            </div>
            <EmptystatesPollsNoInvitees v-if="emptyInvites" @sendNewInvite="$openModal(newInviteModal)" />
        </div>

        <ModalsAddInvitees v-if="newInviteModal.isOpen" @closeModal="$closeModal(newInviteModal)" :pollId="pollId"
            :savedInvitees="savedInvitees" @deleteInvitee="deleteInvitee" @storeInvitees="saveInviteeToStore()" />

        <ModalsConfirmSaveInvitees v-if="confirmSaveInvitees.isOpen" @goBack="backtoEditInvitees()"
            @confirmAddInvitees="saveInviteeToDB()" />

        <ModalsSuccessVoteInviteSent v-if="voteInviteSent.isOpen" @closeInviteSent="$closeModal(voteInviteSent)" />

        <ModalsErrorinfoDuplicateEmails v-if="duplicateEmailModal.isOpen" :duplicate-invitees="duplicateEmails"
            @goBackToInvitees="backtoEditInvitees()" @removeDuplicates="removeDuplicateEmails()" />

        <ModalsErrorinfoEmailAlreadyExist v-if="doubleEmailModal.isOpen" :double-invitees="doubleEmails"
            @goBackToInvitees="backtoEditInvitees()" @clearDuplicates="clearDoubleEmails()" />
    </div>

</template>