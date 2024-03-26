<script setup>
defineProps({
    sideMenu_class: String
})
</script>
<template>
    <div :class="sideMenu_class" @click="$emit('sideMenu_click')">
        <slot name="side_menu_icon"></slot>
        <slot name="side_menu_name"></slot>
    </div>
</template>