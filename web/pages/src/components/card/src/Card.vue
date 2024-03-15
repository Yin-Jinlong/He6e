<template>
    <div class="card">
        <div class="card-header"
             data-fill-width>
            <slot name="header"/>
        </div>
        <div class="card-content">
            <slot name="default"/>
        </div>
        <div class="card-footer">
            <slot name="footer"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
  background-color : var(--card-background);
  border-radius    : 10px;
  box-shadow       : 2px 2px 20px 0 rgba(0, 0, 0, 0.25);
  margin           : 2em;
  padding          : 20px;

  &:empty {
    display : none;
  }

  & > div {
    margin : 20px 0;
  }

}

.card-header {
  border-bottom : #222 solid 2px;
  font-size     : 24px;
  font-weight   : 900;
}

.card-content {
  box-sizing : border-box;
  width      : 100%;
}

.card-footer:empty {
  display : none;
}

</style>

<script lang="ts" setup>

</script>
