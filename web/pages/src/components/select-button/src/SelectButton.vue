<template>
    <div class="button"
         @click="emits('click')"
         data-fill-width
         data-none-select
         data-pointer
         data-relative
         data-transition-fast>
        <yjl-button :data-status="status"
                    class="bg"
                    data-absolute
                    data-fill-size
                    data-transition-fast>
        </yjl-button>
        <div class="content"
             data-fill-size>
            {{ text }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use 'style/select-button';
</style>

<script lang="ts" setup>
import {YjlButton} from 'he6e-web-ui/es'
import {SelectButtonProps} from "./select-button"

defineProps<SelectButtonProps>()
const emits = defineEmits(['click'])

</script>
