<template>
    <div class="button"
         data-fill-width
         data-none-select
         data-pointer
         data-relative
         data-transition-fast>
        <div :data-status="status"
             class="bg" data-absolute
             data-fill-size
             data-transition-fast>
        </div>
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
import {defineProps} from 'vue'
import {SelectButtonProps} from "./select-button";

defineProps<SelectButtonProps>()

</script>
