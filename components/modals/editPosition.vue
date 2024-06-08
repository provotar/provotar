<script setup>
import { v4 as uuidv4 } from "uuid";

const props = defineProps({
    positionDetails: Object,
})


const emit = defineEmits(['clearPosition', 'closeModal'])

const clearPositionDets = () => {
    emit('clearPosition', props.positionDetails.pos_id)
}




const addCandidate = () => {
    props.positionDetails.candidates.push({
        candidate_id: uuidv4(),
        fullName: '',
        campaignName: '',
        editMode: true,
    })
}
const toggleEditMode = (id) => {
    const candidate_dets = props.positionDetails.candidates.find(candidate => candidate.candidate_id === id)
    candidate_dets.editMode = !candidate_dets.editMode;
}

const deleteCandidate = (id) => {
    props.positionDetails.candidates = props.positionDetails.candidates.filter(candidate => candidate.candidate_id !== id)
}




</script>

<template>
    <ModalsCore modal_class="edit-position">
        <template #modal_title>
            <p class="modal_title">Edit Position</p>
        </template>
        <template #modal_icon>

            <PhosphorIconX :size="24" weight="bold" @click="clearPositionDets"
                v-if="positionDetails.positionName === ''" />

        </template>
        <template #modal_content>
            <div class="scroll-modal-content flex-col">
                <Inputs type="text" placeholder="e.g President" v-model.trim="positionDetails.positionName">
                    <template #label>
                        Position Name
                    </template>
                </Inputs>

                <div class="candidate-list-wrapper flex-col">
                    <p class="special-caps-title candidate-list-title">CANDIDATES</p>
                    <div class="candidate-dets-wrapper flex-col">
                        <div class="candidate-dets" v-for="candidates in positionDetails.candidates">

                            <div class="candidate-list flex-row" v-if="!candidates.editMode">
                                <div class="candidate_names flex-row">
                                    <p class="candidate-fullname">{{ candidates.fullName }},</p>
                                    <p class="candidate-campaign-name">{{ candidates.campaignName }}</p>
                                </div>

                                <div class="candidate_actions flex-row">
                                    <img @click="toggleEditMode(candidates.candidate_id)"
                                        src="/images/icons/edit_icon.svg" alt="edit_icon">
                                    <img @click="deleteCandidate(candidates.candidate_id)"
                                        src="/images/icons/delete_icon.svg" alt="delete_icon">
                                </div>
                            </div>

                            <div v-else class="candidate-form flex-col">
                                <div class="form-inputs flex-row">
                                    <Inputs type="text" placeholder="e.g Jon Bellion"
                                        v-model.trim="candidates.fullName">
                                        <template #label>
                                            Full Name
                                        </template>
                                    </Inputs>
                                    <Inputs type="text" placeholder="Belie" v-model.trim="candidates.campaignName">
                                        <template #label>
                                            Campaign Name
                                        </template>
                                    </Inputs>
                                </div>

                                <div class="form-actions flex-row">
                                    <p v-if="candidates.fullName !== ''"
                                        @click="toggleEditMode(candidates.candidate_id)" class="text_btn cancel_btn">
                                        Cancel</p>

                                    <p v-else @click="deleteCandidate(candidates.candidate_id)"
                                        class="text_btn delete_btn">
                                        Delete
                                    </p>

                                    <Buttons v-if="candidates.fullName !== ''" btn_class="sml_btn pry_black"
                                        @btn_click="toggleEditMode(candidates.candidate_id)">Save
                                        Candidate
                                    </Buttons>

                                    <Buttons v-else btn_class="sml_btn pry_black_disabled">
                                        Save
                                        Candidate
                                    </Buttons>
                                </div>
                            </div>

                        </div>
                        <div @click="addCandidate()" class="create-candidate-btn flex-row">
                            <PhosphorIconPlus :size="24" />
                            <p>Add a candidate</p>
                        </div>

                    </div>

                </div>
            </div>
            <div class="modal-footer-actions flex-row">

                <Buttons v-if="positionDetails.positionName !== '' && positionDetails.candidates"
                    @click="$emit('closeModal')" btn_class="sml_btn pry_purple">Save
                    changes</Buttons>

                <Buttons v-else btn_class="sml_btn pry_purple_disabled">Save changes
                </Buttons>

            </div>
        </template>


    </ModalsCore>
</template>