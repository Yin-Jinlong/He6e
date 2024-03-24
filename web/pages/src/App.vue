<template>
    <h-card>
        <template #header>
            设置
        </template>
        <template #default>
            <label>
                <span>确认提交</span>
                <input v-model="confirm" type="checkbox">
            </label>
            <h-button
                    :type="'primary'"
                    :color="'danger'"
                    @click="reset">
                重置
            </h-button>
        </template>
    </h-card>

    <select-card
            ref="tiCard"
            :confirm="confirm"
            :ti="ti"
            type="judge"/>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>

import {ref} from "vue"
import {SelectCard, SelectCardExpose} from "@components/select-card"
import {JudgeTi} from "@/types"

import {HButton, HCard} from 'h-ui'

const ti = {
    type: 'judge',
    title: '5>10',
    right: false
} as JudgeTi

const confirm = ref(false)
const tiCard = ref<SelectCardExpose>()

function reset() {
    tiCard.value!.reset()
}

</script>
