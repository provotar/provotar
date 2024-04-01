<script setup>
defineEmits(['sendNewInvite'])
</script>

<template>
    <div class="empty-state no-invitee flex-col">
        <img src="/images/illustrations/grey_poll_box.svg" alt="grey_poll_box">
        <div class="empty-state-content flex-col">
            <p class="empty-state-title">No invitees yet.</p>
            <p class="empty-state-subtitle">Invitees will receive a secure link to vote in this poll</p>
        </div>
        <Buttons class="sml_btn pry_purple" @click="$emit('sendNewInvite')">Send Invite</Buttons>
    </div>
</template>