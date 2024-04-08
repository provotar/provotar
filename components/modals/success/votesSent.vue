<script setup>
defineEmits(['goToIntro', 'seePollStats'])


</script>
<template>
    <ModalsCore modal_class="success-modal">
        <template #modal_icon>
            <PhosphorIconX :size="24" weight="bold" @click="$emit('goToIntro')" />
        </template>

        <template #modal_content>
            <div class="content_wrapper flex-col">
                <img class="success_mark" src="/images/illustrations/checkmark.svg" alt="checkmark">
                <div class="success-content flex-col">
                    <div class="success-msg flex-col">

                        <p class="modal-title">Votes submitted</p>
                        <p class="modal-subtitle">Your votes have been successfully submitted. You can see poll to check
                            live poll statistics</p>
                    </div>

                    <div class="modal_ctas flex-col">

                        <Buttons @click="$emit('seePollStats')" btn_class="sml_btn pry_purple"> See Poll
                        </Buttons>
                    </div>
                </div>
            </div>

        </template>

    </ModalsCore>
</template>