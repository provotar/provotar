<script setup>
const supabase = useSupabaseClient();
const route = useRoute();
const router = useRouter();


useHead({
    title: 'Provotar | Vote'
})
definePageMeta({
    layout: "default"
})

const voteID = ref(route.params.id);

const voteDetails = ref([]);
const inviteeList = ref([])
const loader = ref(false)
const invalidLink = ref(false)
const notInvited = ref(false);

const votersEmail = ref('');
const inviteeDets = ref([]);
const voterID = ref();


const getVoteDets = async () => {
    try {
        const { data, error } = await supabase
            .from("polls")
            .select("*, votes(*), invitees(*), positions(*, candidates(*))")
            .eq("id", `${voteID.value}`)
        if (data[0]) {
            voteDetails.value = data;
            loader.value = false
            inviteeList.value = voteDetails.value[0].invitees
        } else {
            loader.value = false
            invalidLink.value = true;
        }

    }
    catch (error) {
        console.log(error);
    }
}





const startVote = () => {
    inviteeDets.value = inviteeList.value.find(invitee => invitee.email === votersEmail.value)
    if (inviteeDets.value) {
        // route to votes
        if (!inviteeDets.value.hasVoted) {
            console.log(inviteeDets.value);
            router.push(`/vote/${voteID.value}/voteslides/${inviteeDets.value.id}`)
        } else {
            // route to hasVoted
            router.push(`/vote/${voteID.value}/hasVoted`)

        }
    } else {
        // not invited
        router.push(`/vote/${voteID.value}/notInvited`)
    }

}

onMounted(() => {
    loader.value = true
    getVoteDets();

})

</script>

<template>
    <div class="intro-template flex-col">
        <div class="intro-template" v-if="voteDetails[0]">
            <div v-for="details in voteDetails" class="flex-col">
                <div v-if="details.isLive" class="intro-wrapper flex-col">
                    <div class="intro-main flex-col">
                        <img class="vote-img" src="/images/icons/big_flag.svg" alt="big-flag">
                        <div class="vote-intro-content flex-col">
                            <p class="vote-intro-title">{{ details.poll_name }} </p>
                            <p class="vote-intro-msg">You have been invited to take part in this poll. Kindly note that
                                you
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

                        <div v-if="votersEmail !== ''">
                            <Buttons btn_class="lg_btn pry_purple" @btn_click="startVote()">Start
                                Voting
                            </Buttons>
                        </div>
                        <Buttons v-else btn_class="lg_btn pry_purple_disabled">Start Voting</Buttons>
                    </div>

                </div>

                <div v-else class="poll-ended-wrapper flex-col">
                    <div class="poll-ended-main flex-col">
                        <img src="/images/illustrations/red_pollbox_circle.svg" alt="red_pollbox_circle">
                        <div class="poll-ended-content flex-col">
                            <p class="poll-ended-title">This poll has ended</p>
                            <p class="poll-ended-msg">You can no longer vote because this poll has already ended. Check
                                out
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
        <div v-if="invalidLink" class="poll-ended-wrapper flex-col">
            <div class="poll-ended-main flex-col">
                <img src="/images/illustrations/broken_link.svg" alt="red_pollbox_circle">
                <div class="poll-ended-content flex-col">
                    <p class="poll-ended-title">Opss! It seems this link is invalid</p>
                    <p class="poll-ended-msg">You may be trying to access an already used link or the link is invalid.
                        Do contact the admin if you are experiencing a different issue</p>
                </div>
            </div>

        </div>
        <LoadingstatesLoadlogo v-if="loader" />
        <ToastsError v-if="notInvited" class="authMessage">
            <template #toastMessage>
                <p class="toastMessage"> You were not invited to vote in this poll </p>
            </template>
            <template #icon>
                <PhosphorIconX :size="16" weight="bold" />
            </template>
        </ToastsError>
    </div>

</template>