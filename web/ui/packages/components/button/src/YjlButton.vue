<template>
    <button
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
  --btn-color    : #{get-css(color,$name)};
  --btn-color-1  : #{get-css(color,#{$name}-2)};
  --btn-color--1 : #{get-css(color,#{$name}--1)};
}

.button {
  @include gen-colors(primary);
  background-color    : var(--btn-color);
  border              : none;
  border-radius       : get-css(radius, normal);
  color               : white;
  -moz-user-select    : none;
  -webkit-user-select : none;
  user-select         : none;

  &[data-type='success'] {
    @include gen-colors(sucsss);
  }

  &[data-type='warning'] {
    @include gen-colors(warning);
  }

  &[data-type='danger'] {
    @include gen-colors(danger);
  }

  &[data-type='info'] {
    @include gen-colors(info);
  }

  &[data-type='emphasize'] {
    @include gen-colors(emphasize);
  }

  &[data-size='small'] {
    padding : get-css(padding,small) get-css(padding,normal);
  }

  &[data-size='default'] {
    padding : get-css(padding,normal) get-css(padding,large);
  }

  &[data-size='large'] {
    padding : get-css(padding,normal) get-css(padding,xxl);
  }

  &[data-size='xlarge'] {
    padding : get-css(padding,xlarge) get-css(padding,4xl);
  }

  &:hover {
    background : var(--btn-color-1);
  }

  &:active {
    background : var(--btn-color--1);
  }
}

.button + .button {
  margin-left : 12px;
}
</style>

<script lang="ts" setup>

import {YjlButtonProps} from "./yjl-button";

withDefaults(defineProps<YjlButtonProps>(), {
    size: 'default',
})

</script>
