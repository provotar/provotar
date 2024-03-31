<script setup>
defineEmits(['closePollSuccess', 'copyLink'])

defineProps({
    linkCopied: Boolean,
    default: false
})
</script>
<template>
    <ModalsCore modal_class="success-modal">
        <template #modal_icon>
            <PhosphorIconX :size="24" weight="bold" @click="$emit('closePollSuccess')" />
        </template>

        <template #modal_content>
            <div class="content_wrapper flex-col">
                <img class="success_mark" src="/images/illustrations/checkmark.svg" alt="checkmark">
                <div class="success-content flex-col">
                    <div class="success-msg flex-col">

                        <p class="modal-title">You're all set</p>
                        <p class="modal-subtitle">Your poll has be created successfully.</p>
                    </div>

                    <div class="modal_ctas flex-col">
                        <Buttons v-if="linkCopied" btn_class="sml_btn pry_grey copylink">
                            Link copied
                            <template #icon>
                                <PhosphorIconCopy :size="16" weight="bold" />
                            </template>
                        </Buttons>
                        <Buttons v-else btn_class="sml_btn pry_grey copylink" @click="$emit('copyLink')">
                            Copy poll link
                            <template #icon>
                                <PhosphorIconCopy :size="16" weight="bold" />
                            </template>
                        </Buttons>



                        <Buttons @click="$emit('closePollSuccess')" btn_class="sml_btn pry_purple"> All done
                        </Buttons>
                    </div>
                </div>
            </div>

        </template>

    </ModalsCore>
</template>