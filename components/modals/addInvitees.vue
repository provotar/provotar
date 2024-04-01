<script setup>
import { v4 as uuidv4 } from "uuid";
const props = defineProps({
    pollId: String,
})
defineEmits(['closeModal'])
const newInviteEmail = ref();
const savedInvitees = ref([]);
const addInviteeEmail = () => {
    savedInvitees.value.push({
        invitee_email: newInviteEmail.value,
        invitee_id: uuidv4(),
        pollId: props.pollId,
        hasVoted: false,
        editMode: false
    })
    newInviteEmail.value = ''
}
// toggle edit invitee
const toggleEditMode = (id) => {
    const invitee_dets = savedInvitees.value.find(invitee => invitee.invitee_id === id);
    invitee_dets.editMode = !invitee_dets.editMode;
}

const deleteInvitee = (id) => {
    savedInvitees.value = savedInvitees.value.filter(invitee => invitee.invitee_id !== id)
}
</script>

<template>
    <ModalsCore modal_class="send-invite">
        <template #modal_title>
            <p class="modal_title">Send invite</p>
        </template>
        <template #modal_icon>
            <PhosphorIconX :size="24" weight="bold" @click="$emit('closeModal')" />
        </template>
        <template #modal_content>
            <div class="scroll-modal-content flex-col">
                <form @submit.prevent="addInviteeEmail">
                    <Inputs type="email" placeholder="name@email.com" v-model.trim="newInviteEmail" :minlength="'5'">
                        <template #label>
                            Email Address
                        </template>
                        <template #helper_text>
                            <p class="helper_text">Enter an email and press enter to add</p>
                        </template>
                    </Inputs>
                </form>

                <div class="invitee-list-wrapper flex-col">
                    <p class="special-caps-title invitee-list-title">INVITEES</p>
                    <div class="invitee-dets-wrapper flex-col">
                        <div class="invitee-dets" v-for="invitee in savedInvitees">

                            <div class="invitee-list flex-row" v-if="!invitee.editMode">
                                <p class="invitee-email">{{ invitee.invitee_email }}</p>
                                <div class="invitee_actions flex-row">
                                    <img @click="toggleEditMode(invitee.invitee_id)" src="/images/icons/edit_icon.svg"
                                        alt="edit_icon">
                                    <img @click="deleteInvitee(invitee.invitee_id)" src="/images/icons/delete_icon.svg"
                                        alt="delete_icon">
                                </div>
                            </div>

                            <div v-else class="invitee-form flex-col">
                                <div class="form-inputs flex-row">
                                    <Inputs type="text" placeholder="e.g Jon Bellion"
                                        v-model.trim="invitee.invitee_email">
                                        <template #label>
                                            Email Address
                                        </template>

                                    </Inputs>
                                </div>

                                <div class="form-actions flex-row">
                                    <p v-if="invitee.invitee_email !== ''" @click="toggleEditMode(invitee.invitee_id)"
                                        class="text_btn cancel_btn">
                                        Cancel</p>

                                    <p v-else @click="deleteInvitee(invitee.invitee_id)" class="text_btn delete_btn">
                                        Delete
                                    </p>

                                    <Buttons v-if="invitee.invitee_email !== ''" btn_class="sml_btn pry_black"
                                        @btn_click="toggleEditMode(invitee.invitee_id)">Save
                                        email
                                    </Buttons>

                                    <Buttons v-else btn_class="sml_btn pry_black_disabled">
                                        Save
                                        email
                                    </Buttons>
                                </div>
                            </div>

                        </div>


                    </div>

                </div>
            </div>
            <div class="modal-footer-actions flex-row">
                <Buttons @click="$emit('closeModal')" btn_class="sml_btn pry_purple">Save changes</Buttons>
            </div>
        </template>
    </ModalsCore>
</template>