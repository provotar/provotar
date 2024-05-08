<script setup>
defineEmits(['goBackToInvitees', 'clearDuplicates'])

defineProps({
    doubleInvitees: Array,
})
</script>

<template>
    <ModalsCore modal_class="send-invite">
        <template #modal_title>
            <p class="modal_title">Already invited emails</p>
        </template>
        <template #modal_icon>
            <PhosphorIconX :size="24" weight="bold" @click="$emit('goBackToInvitees')" />
        </template>
        <template #modal_content>
            <div class="scroll-modal-content flex-col">
                <p class="duplicate-email-msg">
                    Some emails have been already been invited to this poll. Clearing duplicates will remove them.
                </p>

                <div class="invitee-list-wrapper flex-col">

                    <div class="invitee-dets-wrapper flex-col">
                        <div class="invitee-dets" v-for="email in doubleInvitees">

                            <div class="invitee-list flex-row">
                                <p class="invitee-email">{{ email }}</p>

                            </div>

                        </div>


                    </div>

                </div>
            </div>
            <div class="modal-footer-actions flex-row">

                <p class="back-button" @click="$emit('goBackToInvitees')">Edit emails</p>
                <Buttons btn_class="sml_btn pry_purple" @click="$emit('clearDuplicates')">Clear duplicates
                </Buttons>

            </div>
        </template>
    </ModalsCore>
</template>