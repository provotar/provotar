<script setup>
import { useUserStore } from '~/store/user';
const userStore = useUserStore();


const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const email = ref('');
const validInput = computed(() => emailRegex.test(email.value))
const noExistingEmail = ref(false);
const loadingButton = ref(false)

const clearNoExistingEmailToast = () => {
    if (noExistingEmail.value == true) {
        noExistingEmail.value = false
    }
}

const requestNewPassword = () => {
    userStore.requestResetPassword(email.value);
}

watch(() => userStore.NoExistingEmail, (newValue, oldValue) => {
    noExistingEmail.value = newValue;
})
watch(() => userStore.loadingReset, (newValue, oldValue) => {
    loadingButton.value = newValue;
})

</script>

<template>
    <div class="auth_wrapper flex-col">

        <div class="top_section flex-col">
            <div class="header_wrapper flex-col">
                <p class="auth_header request_newpassword">Enter your email address </p>
            </div>

        </div>


        <form @submit.prevent="requestNewPassword()" id="login_form" class="auth_form flex-col">
            <div class="form_wrapper flex-col">
                <div class="form_dets flex-col">

                    <Inputs placeholder="you@email.com" type="Email" v-model="email" :minLength="5" :isRequired=true>

                        <template #icon>
                            <PhosphorIconEnvelopeSimple :size="24" />
                        </template>
                    </Inputs>

                </div>

            </div>

            <div class="cta_links flex-col">
                <div v-if="!loadingButton" class="inner_cta_links flex-col">
                    <Buttons v-if="validInput" btn_class="lg_btn pry_purple" type="submit">Reset password</Buttons>
                    <Buttons v-else btn_class="lg_btn pry_purple_disabled">Reset password</Buttons>
                </div>
                <Buttons v-else btn_class="lg_btn pry_purple_disabled">Validating
                    email...
                </Buttons>

                <div class="cta_sub_wrapper flex-row">
                    <nuxt-link to="/login" class="active-link">Cancel password reset</nuxt-link>
                </div>
            </div>
        </form>


        <ToastsError v-if="noExistingEmail" class="authMessage">
            <template #toastMessage>
                <p class="toastMessage"> This email doesn't exist </p>
            </template>
            <template #icon>
                <PhosphorIconX :size="16" weight="bold" @click="clearNoExistingEmailToast" />
            </template>
        </ToastsError>
    </div>
</template>