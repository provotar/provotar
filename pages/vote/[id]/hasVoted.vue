<script setup>
const route = useRoute();
const router = useRouter();
const voteID = ref(route.params.id);
useHead({
    title: 'Provotar | Vote'
})
</script>
<template>
    <div class="intro-template vote-info flex-col">
        <div class="poll-ended-wrapper flex-col">
            <div class="poll-ended-main flex-col">
                <img src="/images/illustrations/red_pollbox_circle.svg" alt="red_pollbox_circle">
                <div class="poll-ended-content flex-col">
                    <p class="poll-ended-title">You have already voted</p>
                    <p class="poll-ended-msg vote-msg">It seems you may have already voted using this email. If this is
                        an error,
                        kindly reach out to the admin of the poll.</p>
                </div>
            </div>
            <NuxtLink :to="`/vote/${voteID}/`">
                <Buttons btn_class="lg_btn pry_purple">Vote using another mail</Buttons>
            </NuxtLink>
        </div>
    </div>
</template>