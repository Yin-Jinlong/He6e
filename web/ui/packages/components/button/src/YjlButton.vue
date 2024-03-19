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
import chroma, {hsl, Color} from 'chroma-js'
import {YjlButtonProps} from "./yjl-button"
import {onMounted, ref, watch} from "vue"
import {DefinedNamedColor} from "components/types";

const btn = ref<HTMLButtonElement>()

const props = withDefaults(defineProps<YjlButtonProps>(), {
    size: 'default',
})

const namedColors = ['primary', 'success', 'warning', 'danger', 'info', 'emphasize']

const btnColors: (string | Color)[] = []

function genColor(color: string | DefinedNamedColor) {
    btnColors.length = 0
    if (namedColors.includes(color)) {
        btnColors.push(`var(--color-${color})`)
        for (let i = 1; i <= 6; i++)
            btnColors.push(`var(--color-${color}-${i})`)
        for (let i = 1; i <= 5; i++)
            btnColors.push(`var(--color-${color}--${i})`)
    } else {
        let c = chroma(color).hsl()
        btnColors.push(hsl(...c))
        for (let i = 1; i <= 6; i++)
            btnColors.push(hsl(c[0], c[1], c[2] + 0.05 * i))
        for (let i = 1; i <= 5; i++)
            btnColors.push(hsl(c[0], c[1], c[2] - 0.05 * i))
    }
    return color
}

function changeColor(color: string | DefinedNamedColor) {
    genColor(color)
    const style = btn.value!.style
    style.setProperty('--btn-color', btnColors[0].toString())
    for (let i = 1; i <= 6; i++)
        style.setProperty(`--btn-color-${i}`, btnColors[i].toString())
    for (let i = 1; i <= 5; i++)
        style.setProperty(`--btn-color--${i}`, btnColors[6 + i].toString())
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
