<script setup>
import { usePollStore } from '~/store/polls';
const usePoll = usePollStore();
defineEmits(['closeModal', 'confirmStartPoll'])
const startingPoll = ref(null);
watch(() => usePoll.loadingStartPolls, (newValue, oldValue) => {
    startingPoll.value = newValue;
})
</script>

<template>
    <ModalsCore modal_class="confirm-modal">
        <template #modal_title>
            <p class="modal_title">You want to start this poll?</p>
        </template>
        <template #modal_icon>
            <PhosphorIconX :size="24" weight="bold" @click="$emit('closeModal')" />
        </template>

        <template #modal_content>
            <div class="content_wrapper flex-col">
                <p class="confirm_msg">By clicking Start poll, invitees will be able to start voting. Do you want to
                    proceed?</p>
                <div class="modal_ctas flex-row">
                    <p class="back-button" @click="$emit('closeModal')">Cancel</p>


                    <Buttons v-if="startingPoll" btn_class="sml_btn pry_purple_loading">
                        Starting poll...
                    </Buttons>
                    <Buttons v-else btn_class="sml_btn pry_purple" @click="$emit('confirmStartPoll')">Start Poll
                    </Buttons>

                </div>
            </div>
        </template>
    </ModalsCore>
</template>