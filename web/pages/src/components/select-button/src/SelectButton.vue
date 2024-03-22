<template>
    <div data-fill-width>
        <h-button
                class="sb"
                style="padding: 1em 5px"
                data-fill-width>
            {{ text }}
        </h-button>
    </div>
</template>

<style lang="scss" scoped>
.sb {
  display : flex;
  padding : 10em 5px;
}
</style>

<script lang="ts" setup>

import {HButton} from 'h-ui'
import {SelectButtonProps} from "./select-button"

defineProps<SelectButtonProps>();
</script>
