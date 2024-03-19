<template>
    <button
            ref="btn"
            :data-size="size"
            :data-type="type"
            class="button"
            data-pointer
            data-transition>
        <slot/>
    </button>
</template>

<style lang="scss" scoped>
@import 'style/yjl-button';
</style>

<script lang="ts" setup>
import {YjlButtonProps} from "./yjl-button"
import {onMounted, ref, watch} from "vue"
import {DefinedNamedColor} from "components/types"
import {genColor} from "./color-tool"

const btn = ref<HTMLButtonElement>()

const props = withDefaults(defineProps<YjlButtonProps>(), {
    size: 'default',
})


function changeColor(color: string | DefinedNamedColor) {
    let btnColors = genColor(color, 6, 5)
    const style = btn.value!.style
    style.setProperty('--btn-color', btnColors[0])
    for (let i = 1; i <= 6; i++)
        style.setProperty(`--btn-color-${i}`, btnColors[i])
    for (let i = 1; i <= 5; i++)
        style.setProperty(`--btn-color--${i}`, btnColors[6 + i])
}

onMounted(() => {
    let color = props.color
    if (!color)
        return
    changeColor(color);
})

watch(() => props.color, (c: string | undefined) => {
    changeColor(c!)
})

</script>
