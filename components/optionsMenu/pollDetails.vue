<script setup>
defineEmits(['endPoll', 'resumePoll', 'invite'])
defineProps({
    isLive: Boolean,
    pollId: String,
});
</script>

<template>
    <div class="poll-details-option flex-col">
        <NuxtLink :to="`/mypolls/${pollId}/invitees`">
            <div class="menu-list invite flex-row">
                <PhosphorIconPaperPlaneTilt :size="20" />
                <p class="menu-text">Invitee list</p>
            </div>
        </NuxtLink>
        <div v-if="isLive" class="menu-list endpoll flex-row" @click="$emit('endPoll')">
            <PhosphorIconFlag :size="20" />
            <p class="menu-text">End Poll</p>
        </div>
        <div v-else class="menu-list resumepoll flex-row" @click="$emit('resumePoll')">
            <PhosphorIconFlag :size="20" />
            <p class="menu-text">Resume Poll</p>
        </div>

    </div>
</template>