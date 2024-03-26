<script setup>
defineProps({
    modal_class: String,
})
</script>
<template>
    <div class="modal_wrapper">
        <div class="modal_card flex-col" :class="modal_class">
            <div class="modal_header flex-row">
                <slot name="modal_title"></slot>
                <slot name="modal_icon"></slot>
            </div>
            <slot name="modal_content"></slot>
        </div>
    </div>
</template>