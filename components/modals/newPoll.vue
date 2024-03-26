<script setup>
import { usePollStore } from '~/store/polls';
const usePolls = usePollStore();

// defineProps({
//     isOpen: Boolean,
// })
 defineEmits(['continue', 'closeModal'])

// save new poll name
const newPollName = ref('');
const savePollName =()=>{
usePolls.savePollName(newPollName.value)
};

const isInputFilled = computed(() => {
    return newPollName.value.trim() !== '';
})
</script>

<template>
    <ModalsCore modal_class="add_poll_name">
        <template #modal_icon>
            <PhosphorIconX :size="24" weight="bold" @click="$emit('closeModal')" />
        </template>

        <template #modal_content>
            <div class="new-poll-details flex-col">
                <img class="poll-box-circle" src="/images/illustrations/pollbox_circle.svg" alt="pollbox_circle">
                <div class="new-poll-form flex-col">
                    <p class="modal_title">What is the name of your poll?</p>
                    <Inputs type="text" placeholder="e.g Pop Council Election" v-model.trim="newPollName"
                        :minlength="'5'">
                        <template #helper_text required>
                            <p class="helper_text">At least 5 characters</p>
                        </template>
                    </Inputs>

                    <Buttons v-if="isInputFilled" btn_class="sml_btn pry_purple" @btn_click="savePollName" @click="$emit('continue')">
                        Continue
                    </Buttons>
                    <Buttons v-else btn_class="sml_btn pry_purple_disabled"> Continue
                    </Buttons>


                </div>
            </div>

        </template>

    </ModalsCore>
</template>