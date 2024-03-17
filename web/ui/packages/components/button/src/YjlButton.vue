<template>
    <button
            :data-size="size"
            :data-type="type"
            class="button"
            data-pointer
            data-transition>
        按钮
    </button>
</template>

<style lang="scss" scoped>
@use '../../../style/tools/fns' as *;

@mixin gen-colors($name) {
  --btn-color    : #{get-css(color,$name)};
  --btn-color-1  : #{get-css(color,#{$name}-2)};
  --btn-color--1 : #{get-css(color,#{$name}--1)};
}

.button {
  @include gen-colors(primary);
  background-color : var(--btn-color);
  border           : none;
  border-radius    : #{get-css(radius,normal)};

  &[data-type='success'] {
    @include gen-colors(sucsss);
  }

  &[data-size='small'] {
    padding : #{get-css(padding,small)} #{get-css(padding,normal)};
  }

  &[data-size='default'] {
    padding : #{get-css(padding,normal)} #{get-css(padding,large)};
  }

  &[data-size='large'] {
    padding : #{get-css(padding,normal)} #{get-css(padding,xlarge)};
  }

  &:hover {
    background : var(--btn-color-1);
  }

  &:active {
    background : var(--btn-color--1);
  }
}
</style>

<script lang="ts" setup>

import {defineProps} from 'vue'
import {YjlButtonProps} from "./yjl-button";

withDefaults(defineProps<YjlButtonProps>(), {
    size: 'default',
})

</script>
