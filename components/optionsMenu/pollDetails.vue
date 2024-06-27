<script setup>

defineEmits(['endPoll', 'resumePoll'])
defineProps({
    status: String,
    pollId: String,
});
</script>

<template>
    <div class="poll-details-option flex-col">

        <div class="menu-list invite flex-row">
            <PhosphorIconPencilSimple :size="20" />
            <p class="menu-text">Edit Poll</p>
        </div>

        <div v-if="status === 'isLive'" class="menu-list endpoll flex-row" @click="$emit('endPoll')">
            <PhosphorIconFlag :size="20" />
            <p class="menu-text">End Poll</p>
        </div>
        <div v-if="status === 'isEnded'" class="menu-list resumepoll flex-row" @click="$emit('resumePoll')">
            <PhosphorIconFlag :size="20" />
            <p class="menu-text">Resume Poll</p>
        </div>

    </div>
</template>