<script setup>
const props = defineProps({
    positionDets: Array,
});

const positionList = ref(props.positionDets[0].positions)
const currentPosition = ref(positionList.value[0]);
const totalSlides = ref(positionList.value.length);
const currentSlideIndex = ref(0);

const nextPosition = () => {
    currentSlideIndex.value += 1;
    currentPosition.value = positionList.value[currentSlideIndex.value]
}
const previousPosition = () => {
    currentSlideIndex.value -= 1;
    currentPosition.value = positionList.value[currentSlideIndex.value]
}
// get last side
const isLastSlide = computed(() => currentSlideIndex.value === totalSlides.value - 1);
// calculate progress bar
const progressWidth = computed(() => `${((currentSlideIndex.value + 1) / totalSlides.value) * 100}%`)

</script>

<template>
    <div class="poll-slide flex-col">
        <div class="flex-col top-section">
            <p class="poll-name">{{ positionDets[0].poll_name }}</p>
            <div class="outer-bar">
                <div :style="{ width: progressWidth }" class="inner-bar"></div>
            </div>
            <p class="progress-count">{{ currentSlideIndex + 1 }} of {{ totalSlides }}</p>
        </div>

        <div class="poll-slide-content flex-row">
            <h1 class="poll-slide-title">Who would you like to vote as <span class="highlight">{{
                currentPosition.position_name }}?</span></h1>
            <div class="slide-candidates flex-col">
                <div class="poll-slide-candidate flex-row" v-for="candidate in currentPosition.candidates">
                    <input type="radio" :id="candidate.candidate_name" :name="candidate.position_id">
                    <div>
                        <label :for="candidate.candidate_name">{{ candidate.candidate_name }}</label>
                        <p class="campaign_name">{{ candidate.candidate_campaign_name }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="slide-ctas flex-row">
            <p v-if="currentSlideIndex > 0" @click="previousPosition()">Back</p>

            <div v-if="isLastSlide">
                <Buttons btn_class="lg_btn pry_purple">
                    Submit poll
                </Buttons>
            </div>
            <div v-else>
                <Buttons btn_class="lg_btn pry_black" @btn_click="nextPosition()">
                    Continue
                </Buttons>
            </div>
        </div>
    </div>
</template>