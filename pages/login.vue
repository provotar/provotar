<script setup>
import { useUserStore } from '~/store/user';

useHead({
    title: 'Provotar | Login'
})

const userStore = useUserStore();
const email = ref();
const password = ref();
const invalidEmail = ref(false);


// toggle password
const passwordShown = ref(false);
const togglePasswordShown = () => {
    if (!passwordShown.value) {
        passwordShown.value = true
    } else {
        passwordShown.value = false
    }
}


// loading & error prompts
let authError = ref(false)
let loadingCTA = ref(false)
const signInUser = userStore.signInUser;



const signInAdmin = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (email.value === "" || emailRegex.test(email.value)) {
        signInUser(email.value, password.value);
        invalidEmail.value = false;
    } else {
        loadingCTA.value = false
        invalidEmail.value = true;
    }
};

const clearinValidEmailToast = () => {
    if (invalidEmail.value == true) {
        invalidEmail.value = false
    }
}
const clearAuthErrorToast = () => {
    if (authError.value == true) {
        authError.value = false
    }
}


watch(() => userStore.authError, (newValue, oldValue) => {
    authError.value = newValue
})
watch(() => userStore.loading, (newValue, oldValue) => {
    loadingCTA.value = newValue
})



</script>

<template>
    <div class="auth_wrapper flex-col">
        <nuxt-link to="/">
            <img class="auth-logo" src="/images/icons/logo_purple.svg" alt="logo_purple">
        </nuxt-link>
        <div class="top_section flex-col">
            <div class="header_wrapper flex-col">
                <p class="auth_header">Welcome Back</p>
                <p class="sub_heading">Enter your details to access your account</p>
            </div>
            <a class="google_link flex-row">
                <img src="/images/icons/google.svg" alt="google_logo">
                <p>Continue with Google</p>
            </a>
        </div>
        <div class="divider flex-row">

            <p>or</p>
        </div>

        <form @submit.prevent="signInAdmin" id="login_form" class="auth_form flex-col">
            <div class="form_wrapper flex-col">
                <div class="form_dets flex-col">

                    <Inputs placeholder="you@email.com" type="Email" v-model="email" :isRequired=true>
                        <template #label>
                            Email Address
                        </template>
                        <template #icon>
                            <PhosphorIconEnvelopeSimple :size="24" />
                        </template>
                    </Inputs>

                    <Inputs placeholder="*******" :type="!passwordShown ? 'password' : 'text'" v-model="password"
                        :isRequired=true>
                        <template #label>
                            Password
                        </template>
                        <template #icon>
                            <PhosphorIconEyeSlash :size="24" v-if="!passwordShown" @click="togglePasswordShown" />
                            <PhosphorIconEye :size="24" v-else @click="togglePasswordShown" />
                        </template>

                    </Inputs>


                </div>
                <a>Forgot Password</a>

            </div>

            <div class="cta_links flex-col">
                <Buttons btn_class="lg_btn pry_purple" type="submit" v-if="!loadingCTA">Login</Buttons>
                <Buttons btn_class="lg_btn pry_purple_loading" type="submit" v-else>
                    <template #icon>
                        <PhosphorIconSpinner :size="20" weight="bold" />
                    </template>
                    Logging in...
                </Buttons>
                <div class="cta_sub_wrapper flex-row">
                    <p class="cta_sub_copy">Are you new here? </p>
                    <nuxt-link to="/signup" class="cta_sub_copy active-link">Create an account</nuxt-link>
                </div>
            </div>
        </form>


        <ToastsError v-if="invalidEmail" class="invalidEmail">
            <template #toastMessage>
                <p class="toastMessage">Enter a valid email</p>
            </template>
            <template #icon>
                <PhosphorIconX :size="16" weight="bold" @click="clearinValidEmailToast" />
            </template>
        </ToastsError>

        <ToastsError v-if="authError" class="authMessage">
            <template #toastMessage>
                <p class="toastMessage"> Wrong Email or password </p>
            </template>
            <template #icon>
                <PhosphorIconX :size="16" weight="bold" @click="clearAuthErrorToast" />
            </template>
        </ToastsError>
    </div>
</template>