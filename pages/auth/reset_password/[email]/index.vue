<script setup>
const route = useRoute();
const email = (route.params.email)
const request_email = ref(null);
request_email.value = email

</script>
<template>
    <div class="auth_wrapper flex-col">

        <div class="top_section flex-col">
            <div class="header_wrapper flex-col">
                <p class="auth_header">Check your email inbox</p>
                <p class="sub_heading">We have sent you a unique link to your <span class="highlight">{{ request_email
                        }}</span>. Click
                    the link
                    and follow the
                    intructions to reset your password </p>
            </div>

        </div>
    </div>

</template>