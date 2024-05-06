<script setup>
defineEmits(['goBackToInvitees', 'removeDuplicates'])

defineProps({
    duplicateInvitees: Array,
})
</script>

<template>
    <ModalsCore modal_class="send-invite">
        <template #modal_title>
            <p class="modal_title">Duplicate Emails</p>
        </template>
        <template #modal_icon>
            <PhosphorIconX :size="24" weight="bold" @click="$emit('goBackToInvitees')" />
        </template>
        <template #modal_content>
            <div class="scroll-modal-content flex-col">
                <p class="duplicate-email-msg">
                    You have entered duplicate emails. Removing duplicates will keep just one copy of each email
                </p>

                <div class="invitee-list-wrapper flex-col">

                    <div class="invitee-dets-wrapper flex-col">
                        <div class="invitee-dets" v-for="invitee in duplicateInvitees">

                            <div class="invitee-list flex-row">
                                <p class="invitee-email">{{ invitee.email }}</p>
                                <p>x{{ invitee.count }}</p>
                            </div>

                        </div>


                    </div>

                </div>
            </div>
            <div class="modal-footer-actions flex-row">

                <p class="back-button" @click="$emit('goBackToInvitees')">Edit emails</p>
                <Buttons btn_class="sml_btn pry_purple" @click="$emit('removeDuplicates')">Remove duplicates
                </Buttons>

            </div>
        </template>
    </ModalsCore>
</template>