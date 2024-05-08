<script setup>
const route = useRoute();
const router = useRouter();
const voteID = ref(route.params.id);
</script>
<template>
    <div class="intro-template vote-info flex-col">
        <div class="poll-ended-wrapper flex-col">
            <div class="poll-ended-main flex-col">
                <img src="/images/illustrations/red_pollbox_circle.svg" alt="red_pollbox_circle">
                <div class="poll-ended-content flex-col">
                    <p class="poll-ended-title">This email was not invited</p>
                    <p class="poll-ended-msg vote-msg">You have not been invited to vote in this poll. Check your email
                        and
                        reenter or contact the poll admin</p>
                </div>
            </div>
            <NuxtLink :to="`/vote/${voteID}/`">
                <Buttons btn_class="lg_btn pry_purple">Go back</Buttons>
            </NuxtLink>
        </div>
    </div>
</template>