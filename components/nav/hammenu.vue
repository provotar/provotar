<script setup>
defineEmits(['tglHamMenu', 'closeHamMenu'])

</script>
<template>
    <div class="ham-menu flex-row" v-motion :initial="{
        height: '0px',
        overflow: 'hidden'
    }" :enter="{
        height: '60vh',
        transition: { duration: 700, ease: 'easeOut' }
    }">

        <ul class="link-wrapper flex-col">
            <div class="ham-link-wrapper flex-col">
                <nuxt-link to="" class="ham-link" v-motion :initial="{
                    x: -20,
                    opacity: 0
                }" :enter="{
                    x: 0,
                    opacity: 1, transition: { duration: 800, ease: 'easeOut' }
                }" :delay="400">About</nuxt-link>

                <nuxt-link to="" class="ham-link" v-motion :initial="{
                    x: -20,
                    opacity: 0
                }" :enter="{
                    x: 0,
                    opacity: 1, transition: { duration: 800, ease: 'easeOut' }
                }" :delay="500">Pricing</nuxt-link>
                <nuxt-link to="" class="ham-link" v-motion :initial="{
                    x: -20,
                    opacity: 0
                }" :enter="{
                    x: 0,
                    opacity: 1, transition: { duration: 800, ease: 'easeOut' }
                }" :delay="600">FAQs</nuxt-link>
                <nuxt-link to="" class="ham-link" v-motion :initial="{
                    x: -20,
                    opacity: 0
                }" :enter="{
                    x: 0,
                    opacity: 1, transition: { duration: 800, ease: 'easeOut' }
                }" :delay="700">Contribute</nuxt-link>
            </div>
            <div class="cta-section flex-row" v-motion :initial="{
                x: -20,
                opacity: 0
            }" :enter="{
                x: 0,
                opacity: 1, transition: { duration: 800, ease: 'easeOut' }
            }" :delay="800">
                <nuxt-link to="/login" @click="$emit('closeHamMenu')" class="ham-link-white">Login</nuxt-link>
                <nuxt-link to="/signup" @click="$emit('closeHamMenu')">
                    <Buttons btn_class="lg_btn pry_white">Get started</Buttons>
                </nuxt-link>

            </div>
        </ul>
        <div class="closeIcon" @click="$emit('tglHamMenu')">
            <PhosphorIconX :size="32" color="white" />
        </div>
    </div>
</template>