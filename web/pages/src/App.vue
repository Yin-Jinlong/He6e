<template>
    <h-card class="card">
        <template #header>
           title
        </template>
        <template #default>
            <div class="select-box"
                 data-fill-width
                 data-flex>
                <select-button :status="'success'" text="A.1949"/>
                <select-button :status="'failed'" text="B.1959"/>
                <select-button :status="'half-right'" text="C.1969"/>
                <select-button status="" text="D.1994"/>
            </div>
        </template>
    </h-card>
</template>

<style lang="scss" scoped>

.card{
  width: 600px;
}

.select-box {
  flex-direction: column;

  &>div{
    margin: 5px 0;
  }

}
</style>

<script lang="ts" setup>

import {SelectButton} from "@components/select-button"
import {HCard} from "h-ui"
</script>
