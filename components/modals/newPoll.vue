<script setup>
import { usePollStore } from '~/store/polls';
import { v4 as uuidv4 } from "uuid";
const usePolls = usePollStore();

// defineProps({
//     isOpen: Boolean,
// })
const emit = defineEmits(['continue', 'closeModal'])

// save new poll name
const newPollName = ref('')
const newPollID = uuidv4();

const savePollName = () => {
    usePolls.savePollName_ID(newPollName.value, newPollID);
    emit('continue');
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
                <form class="new-poll-form flex-col" @submit.prevent="savePollName">
                    <p class="modal_title">What is the name of your poll?</p>

                    <Inputs type="text" placeholder="e.g Pop Council Election" v-model.trim="newPollName"
                        :minlength="5">
                        <template #helper_text required>
                            <p class="helper_text">At least 5 characters</p>
                        </template>
                    </Inputs>

                    <Buttons v-if="isInputFilled" btn_class="sml_btn pry_purple" type="submit">
                        Continue
                    </Buttons>
                    <Buttons v-else btn_class="sml_btn pry_purple_disabled"> Continue
                    </Buttons>

                </form>
            </div>

        </template>

    </ModalsCore>
</template>