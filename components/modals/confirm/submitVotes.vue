<script setup>
defineEmits(['closeModal', 'confirmSubmitVotes'])
defineProps({
    loading: {
        type: Boolean,
    }
})
</script>

<template>
    <ModalsCore modal_class="confirm-modal">
        <template #modal_title>
            <p class="modal_title">Submit my votes</p>
        </template>
        <template #modal_icon>
            <PhosphorIconX :size="24" weight="bold" @click="$emit('closeModal')" />
        </template>

        <template #modal_content>
            <div class="content_wrapper flex-col">
                <p class="confirm_msg">By clicking Submit votes, you agree that you have chosen your desired
                    candidate(s) and this CANNOT be reverted. Do you want to proceed?</p>
                <div class="modal_ctas flex-row">
                    <p class="back-button" @click="$emit('closeModal')">Cancel</p>

                    <Buttons v-if="loading" btn_class="sml_btn pry_purple_loading">
                        <template #icon>
                            <PhosphorIconSpinner :size="20" weight="bold" />
                        </template>
                        Submiting votes..
                    </Buttons>

                    <Buttons v-else btn_class="sml_btn pry_purple" @click="$emit('confirmSubmitVotes')">Submit votes
                    </Buttons>
                </div>
            </div>
        </template>
    </ModalsCore>
</template>