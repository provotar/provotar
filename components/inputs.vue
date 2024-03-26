<script setup>
defineProps({
    placeholder: String,
    type: String,
    isRequired: {
        type: Boolean,
        default: false,
    },
    min: String,
    minlength: String,
});
const model = defineModel()
</script>

<template>
    <div class="input_wrapper flex-col">
        <p class="input_label">
            <slot name="label"></slot>
        </p>
        <div class="input-container flex-row">
            <input :placeholder="placeholder" :type="type" v-model="model" :min="min" :minlength="minlength"
                :required="isRequired">

            <slot name="icon"></slot>
        </div>
        <slot name="helper_text"></slot>

    </div>
</template>