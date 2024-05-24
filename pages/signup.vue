<script setup>
import { useUserStore } from '~/store/user';

useHead({
    title: 'Provotar | SignUp'
})

const userStore = useUserStore();
const fullname = ref();
const newEmail = ref();
const newPassword = ref();
const invalidEmail = ref(false);
const weakPassword = ref(false);

let errorMessage = ref(false)
let loadingCTA = ref(false)


// toggle password
const passwordShown = ref(false);
const togglePasswordShown = () => {
    if (!passwordShown.value) {
        passwordShown.value = true
    } else {
        passwordShown.value = false
    }
}

// createUserViaEmail
const createNewUserViaEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (newEmail.value !== "" && emailRegex.test(newEmail.value) && newPassword.value.length >= 6) {
        userStore.createUserViaEmail(newEmail.value, newPassword.value, fullname.value);
        invalidEmail.value = false;
        weakPassword.value = false;
    } else if (newPassword.value.length < 6) {
        weakPassword.value = true;
    }
    else {
        loadingCTA.value = false
        invalidEmail.value = true;
    }

}

const clearinValidEmailToast = () => {
    if (invalidEmail.value == true) {
        invalidEmail.value = false
    }
}
const clearErrorMessage = () => {
    if (errorMessage.value == true) {
        errorMessage.value = false
    }
}
watch(() => userStore.loading, (newValue, oldValue) => {
    loadingCTA.value = newValue
})
watch(() => userStore.errorMessage, (newValue, oldValue) => {
    errorMessage.value = newValue
})


</script>

<template>
    <div class="auth_wrapper flex-col">
        <nuxt-link to="/">
            <img class="auth-logo" src="/images/icons/logo_purple.svg" alt="logo_purple">
        </nuxt-link>
        <div class="top_section flex-col">
            <div class="header_wrapper flex-col">
                <p class="auth_header">Create an account</p>
                <p class="sub_heading">Join to start using Provotar for free.</p>
            </div>
            <a class="google_link flex-row">
                <img src="/images/icons/google.svg" alt="google_logo">
                <p>Continue with Google</p>
            </a>
        </div>
        <div class="divider flex-row">

            <p>or</p>
        </div>

        <form @submit.prevent="createNewUserViaEmail" id="signup_form" class="auth_form flex-col">
            <div class="form_wrapper flex-col">
                <div class="form_dets flex-col">

                    <Inputs placeholder="e.g Jon Bellion" type="text" v-model="fullname" :isRequired=true>
                        <template #label>
                            Full Name
                        </template>
                        <template #icon>
                            <PhosphorIconUserCircle :size="24" />
                        </template>
                    </Inputs>
                    <Inputs placeholder="you@email.com" type="Email" v-model="newEmail" :isRequired=true>
                        <template #label>
                            Email Address
                        </template>
                        <template #icon>
                            <PhosphorIconEnvelopeSimple :size="24" />
                        </template>
                    </Inputs>

                    <Inputs placeholder="*******" :type="!passwordShown ? 'password' : 'text'" v-model="newPassword"
                        :isRequired=true>
                        <template #label>
                            Password
                        </template>
                        <template #icon>
                            <PhosphorIconEyeSlash :size="24" v-if="!passwordShown" @click="togglePasswordShown" />
                            <PhosphorIconEye :size="24" v-else @click="togglePasswordShown" />
                        </template>

                        <template #helper_text>
                            <p class="helper_text">At least 6 characters</p>

                        </template>

                    </Inputs>


                </div>



            </div>

            <div class="cta_links flex-col">
                <Buttons btn_class="lg_btn pry_purple" type="submit" v-if="!loadingCTA">Create an account</Buttons>

                <Buttons btn_class="lg_btn pry_purple_loading" type="submit" v-else>
                    <template #icon>
                        <PhosphorIconSpinner :size="20" weight="bold" />
                    </template>
                    Logging in...
                </Buttons>

                <div class="cta_sub_wrapper flex-row">
                    <p class="cta_sub_copy">Already have an account? </p>
                    <nuxt-link to="/login" class="cta_sub_copy active-link">Login</nuxt-link>
                </div>
            </div>
        </form>
        <ToastsError v-if="errorMessage">
            <template #toastMessage>
                <p class="toastMessage"> An account with this email already exist </p>
            </template>
            <template #icon>
                <PhosphorIconX :size="16" weight="bold" @click="clearErrorMessage" />
            </template>
        </ToastsError>
        <ToastsError v-if="weakPassword">
            <template #toastMessage>
                <p class="toastMessage"> Password should be atleast 6 characters </p>
            </template>
            <template #icon>
                <PhosphorIconX :size="16" weight="bold" @click="clearErrorMessage" />
            </template>
        </ToastsError>

        <ToastsError v-if="invalidEmail">
            <template #toastMessage>
                <p class="toastMessage"> Enter a valid email </p>
            </template>
            <ToastsError #icon>
                <PhosphorIconX :size="16" weight="bold" @click="clearinValidEmailToast" />
            </ToastsError>
        </ToastsError>

    </div>
</template>