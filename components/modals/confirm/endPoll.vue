<script setup>
import { usePollStore } from '~/store/polls';
const usePoll = usePollStore();

defineEmits(['closeModal', 'confirmEndPoll'])


const endingPoll = ref(null);
watch(() => usePoll.loadingEndPolls, (newValue, oldValue) => {
    endingPoll.value = newValue;
})
</script>

<template>
    <ModalsCore modal_class="confirm-modal">
        <template #modal_title>
            <p class="modal_title">You are about to end this poll</p>
        </template>
        <template #modal_icon>
            <PhosphorIconX :size="24" weight="bold" @click="$emit('closeModal')" />
        </template>

        <template #modal_content>
            <div class="content_wrapper flex-col">
                <p class="confirm_msg">By clicking End poll, invitees will no longer be able to vote. You can resume a
                    poll after it has ended. Do you want to proceed?</p>
                <div class="modal_ctas flex-row">
                    <p class="back-button" @click="$emit('closeModal')">Cancel</p>


                    <Buttons v-if="endingPoll" btn_class="sml_btn pry_purple_loading">
                        Ending poll...
                    </Buttons>
                    <Buttons v-else btn_class="sml_btn pry_purple" @click="$emit('confirmEndPoll')">End Poll</Buttons>

                </div>
            </div>
        </template>
    </ModalsCore>
</template>