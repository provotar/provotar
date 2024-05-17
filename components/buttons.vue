<script setup>
defineProps({
    btn_class: String,
    btn_type: String,
    loading: String,
    isDisabled: Boolean,
});
</script>

<template>
    <button :class="btn_class" @click="$emit('btn_click')" :disabled="isDisabled" :type="btn_type">
        <slot name="icon"></slot>
        <slot />
    </button>
</template>