<script setup>
defineEmits(['goBack', 'confirmAddInvitees'])

</script>

<template>
    <ModalsCore modal_class="confirm-modal">
        <template #modal_title>
            <p class="modal_title">Are you sure?</p>
        </template>
        <template #modal_icon>
            <PhosphorIconX :size="24" weight="bold" @click="$emit('goBack')" />
        </template>

        <template #modal_content>
            <div class="content_wrapper flex-col">
                <p class="confirm_msg">By clicking Send invites, invitees will have access to vote and view poll stats
                    and details. This is no reversible. Do you want to proceed?</p>
                <div class="modal_ctas flex-row">
                    <p class="back-button" @click="$emit('goBack')">Back</p>
                    <Buttons btn_class="sml_btn pry_purple" @click="$emit('confirmAddInvitees')">Yes, Send invites
                    </Buttons>
                </div>
            </div>
        </template>
    </ModalsCore>
</template>