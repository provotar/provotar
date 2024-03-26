<script setup>
defineProps({
    btn_class: String,
    loading: String,
    isDisabled: Boolean,
});
</script>

<template>
    <button :class="btn_class" @click="$emit('btn_click')" :disabled="isDisabled">
        <slot name="icon"></slot>
        <slot />
    </button>
</template>