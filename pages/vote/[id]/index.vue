<script setup>
const supabase = useSupabaseClient();
const route = useRoute();

useHead({
    title: 'Provotar | Vote'
})

const voteID = ref(route.params.id);
definePageMeta({
    layout: "default"
})

const voteDetails = ref([]);

const getVoteDets = async () => {
    try {
        const { data, error } = await supabase
            .from("polls")
            .select("*, votes(*), positions(*, candidates(*))")
            .eq("id", `${voteID.value}`)
        if (data) {
            voteDetails.value = data;
        }

    }
    catch (error) {
        console.log(error);
    }
}

const votersEmail = ref('');


onMounted(() => {
    getVoteDets();
})

</script>

<template>
    <div class="intro-template" v-if="voteDetails">
        <div v-for="details in voteDetails" class="flex-col">
            <div v-if="details.isLive" class="intro-wrapper flex-col">
                <div class="intro-main flex-col">
                    <img class="vote-img" src="/images/icons/big_flag.svg" alt="big-flag">
                    <div class="vote-intro-content flex-col">
                        <p class="vote-intro-title">{{ details.poll_name }} </p>
                        <p class="vote-intro-msg">You have been invited to take part in this poll. Kindly note that you
                            can
                            only vote once using
                            this link. Hence, <b>do not</b> share this link with anyone.</p>
                    </div>
                </div>
                <div class="vote-intro-form flex-col">
                    <Inputs placeholder="you@email.com" v-model.trim="votersEmail">
                        <template #label>
                            Email Address
                        </template>
                    </Inputs>
                    <Buttons v-if="votersEmail !== ''" btn_class="lg_btn pry_purple">Start Voting</Buttons>
                    <Buttons v-else btn_class="lg_btn pry_purple_disabled">Start Voting</Buttons>
                </div>

            </div>

            <div v-else class="poll-ended-wrapper flex-col">
                <div class="poll-ended-main flex-col">
                    <img src="/images/illustrations/red_pollbox_circle.svg" alt="red_pollbox_circle">
                    <div class="poll-ended-content flex-col">
                        <p class="poll-ended-title">This poll has ended</p>
                        <p class="poll-ended-msg">You can no longer vote because this poll has already ended. Check out
                            how it
                            ended.</p>
                    </div>
                </div>
                <NuxtLink :to="`/vote/${voteID}/result`">
                    <Buttons btn_class="lg_btn pry_purple">See result</Buttons>
                </NuxtLink>
            </div>
        </div>

    </div>
</template>