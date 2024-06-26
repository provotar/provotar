<script setup>
defineProps({
    badge_class: String
})
</script>

<template>
    <div :class="badge_class" class="flex-row">
        <p class="badge-text">
       <slot name="badgeText"></slot>
        </p>
    </div>
</template>