<script setup>
const route = useRouter();
const props = defineProps({
    error: {
        type: Object,
        default: () => ({ statusCode: 404, message: 'Page not found' })
    }

})

const errorMessage = computed(() => {
    switch (props.error.statusCode) {
        case 500:
            return 'Internal Server Error';
        case 404:
        default:
            return 'This page could not be found'

    }
})

const goBack = () => {
    route.back();
}

</script>
<template>
    <div class="error-page flex-col">
        <div class="error-img-content flex-col">
            <div class="error-img-statuscode flex-col">
                <img class="error-img" src="/images/illustrations/grey_poll_box.svg" alt="grey_poll_box">
                <p class="error-subtitle">Error {{ error.statusCode }}</p>
            </div>
            <div class="error-content flex-col">
                <p class="error-title">{{ errorMessage }}</p>
                <p v-if="error.statusCode = 404" class="error-subtitle">Let's bring you back</p>
            </div>
        </div>
        <Buttons btn_class="lg_btn pry_purple" @btn_click="goBack()">Go back</Buttons>
    </div>
</template>