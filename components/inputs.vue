<script setup>
const props = defineProps({
    placeholder: String,

    minLength: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        default: 'text',
    },
    isRequired: {
        type: Boolean,
        default: false,
    },

});


const model = defineModel()

</script>

<template>
    <div class="input_wrapper flex-col">
        <p class="input_label">
            <slot name="label"></slot>
        </p>
        <div class="input-container flex-row">
            <input :placeholder="placeholder" :type="type" v-model="model" :required="isRequired"
                :minlength="minLength">

            <slot name="icon"></slot>
        </div>
        <slot name="helper_text"></slot>


    </div>
</template>