<script setup>
import { usePollStore } from '~/store/polls';
import { v4 as uuidv4 } from "uuid";
const route = useRouter();
const { $openModal, $closeModal } = useNuxtApp();

definePageMeta({
    layout: "dashboard"
})

const usePolls = usePollStore();
const positionList = ref([]);
const positionToEdit = ref([]);
const pollID = usePolls.newPoll.pollID;
let submittingPoll = ref(false);

watch(() => usePolls.savingPoll, (newValue, oldValue) => {
    submittingPoll.value = newValue
})


// Modal state object
const editPositionModal = ref({ isOpen: false });
const confirmPollCreationModal = ref({ isOpen: false });
const successPollCreatedModal = ref({ isOpen: false });



// Add new position
const createPosition = () => {
    positionList.value.push({
        pos_id: uuidv4(),
        positionName: '',
        candidates: []
    })
    // get newest Position
    positionToEdit.value = positionList.value[positionList.value.length - 1]
    $openModal(editPositionModal.value);
}
// edit position modal
const editPosition = (id) => {
    positionToEdit.value = positionList.value.find(posList => posList.pos_id === id);
    $openModal(editPositionModal.value);
}
// delete position
const deletePosition = (id) => {
    positionList.value = positionList.value.filter(posList => posList.pos_id !== id);
}
// clear position editing after clicking x when input is empty
const editedPositionId = ref('') // initialize id from editPosition.vue
const clearPosition = (id) => {
    editedPositionId.value = id;
    deletePosition(editedPositionId.value);
    $closeModal(editPositionModal.value);
}



// save position to pinia store
const savePositionDetails = () => {
    usePolls.newPoll.positions = positionList.value;
    usePolls.userDetails();
    $openModal(confirmPollCreationModal.value);
}

// save details to database
const addPositionsToDB = async () => {
    await usePolls.createPoll();
    $closeModal(confirmPollCreationModal.value)
    $openModal(successPollCreatedModal.value)
}
// close success, go to poll view
const closePollSuccess = () => {
    $closeModal(successPollCreatedModal.value);
    if (pollID) {
        route.push(`/mypolls/${pollID}`)
    } else {
        route.push(`/mypolls`)
    }
}

// copy-link\
const linkCopied = ref(false)
const copyLink = async () => {
    try {
        linkCopied.value = true
        await navigator.clipboard.writeText(`${window.origin}/vote/${usePolls.newPoll.pollID}`);
        setTimeout(() => {
            linkCopied.value = false
        }, 2000);
    } catch (err) {
        console.log(err);
    }
}




</script>

<template>
    <div class="dashView add-poll-details flex-col">
        <NuxtLink to="/mypolls" class="back-button flex-row">
            <PhosphorIconCaretLeft :size="16" weight="bold" />
            <p>Back</p>
        </NuxtLink>
        <div class="poll-title-header flex-col">
            <img src="/images/icons/big_flag.svg" alt="big_flag">
            <div class="topView flex-row">
                <p class="poll-title">{{ usePolls.newPoll.pollTitle }}</p>
                <div>
                    <Buttons v-if="positionList.length" btn_class="sml_btn pry_purple"
                        @btn_click="savePositionDetails()">Save Poll</Buttons>
                    <Buttons v-else btn_class="sml_btn pry_purple_disabled">Save Poll</Buttons>

                </div>

            </div>

        </div>
        <table class="position-table">
            <thead>
                <tr class="table-header">
                    <th>
                        <p>Position Name</p>
                    </th>
                    <th>
                        <p>Candidates</p>
                    </th>
                    <th>
                        <p>Actions</p>
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-show="positionList.length" v-for="position in positionList" :key="position.pos_id"
                    class="position-item">
                    <td>
                        <p class="position-name">{{ position.positionName }}</p>
                    </td>

                    <td>
                        <div class="candidate-sum flex-row" v-if="position.candidates.length">
                            <p class="candidate-fname" v-for="candidate in position.candidates" :key="candidate.id">{{
                                candidate.fullName }},
                            </p>
                        </div>
                        <div v-else>
                            <p> No Candidate</p>
                        </div>
                    </td>

                    <td>
                        <div class="actions flex-row">
                            <Buttons btn_class="sml_btn pry_light_grey" @btn_click="editPosition(position.pos_id)">
                                <template #icon>
                                    <img src="/images/icons/edit_icon.svg" alt="edit_icon">
                                </template>
                                Edit
                            </Buttons>
                            <img src="/images/icons/delete_icon.svg" @click="deletePosition(position.pos_id)">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>


        <div class="create-position-btn flex-row" @click="createPosition">
            <PhosphorIconPlus :size="20" weight="bold" />
            <p>Add position</p>
        </div>
    </div>


    <ModalsEditPosition v-show="editPositionModal.isOpen" :positionDetails="positionToEdit"
        @clear-position="clearPosition" @closeModal="$closeModal(editPositionModal)">
    </ModalsEditPosition>
    <ModalsConfirmPollCreation v-show="confirmPollCreationModal.isOpen"
        @closeModal="$closeModal(confirmPollCreationModal)" @submitPoll="addPositionsToDB()" :loading="submittingPoll">
    </ModalsConfirmPollCreation>
    <ModalsSuccessPollCreated v-show="successPollCreatedModal.isOpen" @closePollSuccess="closePollSuccess"
        :linkCopied="linkCopied" @copyLink="copyLink()">
    </ModalsSuccessPollCreated>
</template>