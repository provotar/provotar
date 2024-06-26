<script setup>
defineEmits(['closeModal', 'submitPoll']);
defineProps({
    loading: Boolean
})


</script>

<template>
    <ModalsCore modal_class="confirm-modal">
        <template #modal_title>
            <p class="modal_title">Confirm poll creation</p>
        </template>
        <template #modal_icon>
            <PhosphorIconX :size="24" weight="bold" @click="$emit('closeModal')" />
        </template>

        <template #modal_content>
            <div class="content_wrapper flex-col">
                <p class="confirm_msg">By clicking Create poll, anyone with the private poll link will be able to cast
                    votes and view poll
                    details. Do you want to proceed?</p>
                <div class="modal_ctas flex-row">
                    <p class="back-button" @click="$emit('closeModal')">Cancel</p>
                    <Buttons v-if="loading" btn_class="sml_btn pry_purple_disabled">Creating poll...</Buttons>

                    <Buttons v-else btn_class="sml_btn pry_purple" @click="$emit('submitPoll')">Create Poll</Buttons>

                </div>
            </div>
        </template>
    </ModalsCore>
</template>