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
@import '../../../style/tools/fns';

@mixin gen-colors($name) {
  --btn-color : #{get-css(color,$name)};

  @for $i from 1 to 7 {
    --btn-color-#{$i} : #{get-css(color,#{$name}-#{$i})};
  }

  @for $i from 1 to 6 {
    --btn-color--#{$i} : #{get-css(color,#{$name}--#{$i})};
  }
}

.button {
  @include gen-colors(primary);
  background-color    : transparent;
  border              : none;
  border-radius       : get-css(radius, normal);
  -moz-user-select    : none;
  -webkit-user-select : none;
  user-select         : none;

  &:hover {
    background : get-css(color, white--1);
  }

  &:active {
    background : get-css(color, white--3);
  }


  &[data-type='primary'] {
    background-color : var(--btn-color);
    color            : white;

    &:hover {
      background : var(--btn-color-1);
    }

    &:active {
      background : var(--btn-color--1);
    }

  }

  &[data-type='text'] {
    color            : var(--btn-color);
    background-color : white;
    padding          : 0;

    &:hover {
      color : var(--btn-color-1);
    }

    &:active {
      color : var(--btn-color--2);
    }

  }

  &[data-type='plain'] {
    background-color : var(--btn-color-6);

    &:hover {
      background-color : var(--btn-color-5);
    }

    &:active {
      background-color : var(--btn-color-4);
    }

  }

  &:not([data-type=text]) {

    &[data-size='small'] {
      padding : get-css(padding, small) get-css(padding, normal);
    }

    &[data-size='default'] {
      padding : get-css(padding, normal) get-css(padding, large);
    }

    &[data-size='large'] {
      padding : get-css(padding, normal) get-css(padding, xxl);
    }

    &[data-size='xlarge'] {
      padding : get-css(padding, xlarge) get-css(padding, 4xl);
    }
  }

}

.button + .button {
  margin-left : 12px;
}
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
