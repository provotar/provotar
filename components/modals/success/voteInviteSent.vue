<script setup>
defineEmits(['closeInviteSent'])


</script>
<template>
    <ModalsCore modal_class="success-modal">
        <template #modal_icon>
            <PhosphorIconX :size="24" weight="bold" @click="$emit('closeInviteSent')" />
        </template>

        <template #modal_content>
            <div class="content_wrapper flex-col">
                <img class="success_mark" src="/images/illustrations/checkmark.svg" alt="checkmark">
                <div class="success-content flex-col">
                    <div class="success-msg flex-col">

                        <p class="modal-title">Invite Sent</p>
                        <p class="modal-subtitle">Your poll has be created successfully.</p>
                    </div>

                    <div class="modal_ctas flex-col">
                        <Buttons @click="$emit('closeInviteSent')" btn_class="sml_btn pry_purple"> All done
                        </Buttons>
                    </div>
                </div>
            </div>

        </template>

    </ModalsCore>
</template>