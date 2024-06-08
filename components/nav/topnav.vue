<script setup>
defineEmits(['getStarted', 'tglHamMenu'])
</script>

<template>
    <div class="nav-wrapper flex-col">
        <div class="top-navbar flex-row">
            <img class="main-logo" src="/images/icons/logo.svg" alt="logo">
            <div class="top-navbar-right flex-row">
                <ul class="link-section flex-row">
                    <nuxt-link to="/" class="top-navbar-link">About Us</nuxt-link>
                    <nuxt-link to="/" class="top-navbar-link">Pricing</nuxt-link>
                    <nuxt-link to="/" class="top-navbar-link">Contribute</nuxt-link>
                </ul>
                <ul class="cta-section flex-row">
                    <nuxt-link to="/login" class="top-navbar-link purple">Login</nuxt-link>
                    <Buttons btn_class="sml_btn pry_purple" @click="$emit('getStarted')">Get started</Buttons>
                </ul>
            </div>
            <div @click="$emit('tglHamMenu')" class="hamburger">
                <PhosphorIconEquals :size="32" />
            </div>

        </div>
    </div>

</template>
