<template>
    <div data-fill-width>
        <h-button
                class="sb"
                :type="status===''?'':'primary'"
                :color="status2Color()"
                style="padding: 1em 5px"
                data-fill-width>
            <span>{{ ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(i)) + '.' }}{{ text }}</span>
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

import {DefinedNamedColor, HButton} from '@yin-jinlong/h-ui'
import {SelectButtonProps} from "./select-button"

const props = defineProps<SelectButtonProps>()

function status2Color(): DefinedNamedColor | '' {
    switch (props.status) {
        case "success":
            return 'success'
        case "failed":
            return 'danger'
        case "selected":
            return 'primary'
        case "half-right":
            return 'warning'
    }
    return ''
}
</script>
