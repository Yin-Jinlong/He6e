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
            type="radio"/>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>

import {ref} from "vue"
import {SelectCard, SelectCardExpose} from "@components/select-card"
import {SelectTi} from "@/types"

import {HButton, HCard} from 'h-ui'

const ti = {
    title: '新中国成立在（）',
    options: [
        {
            content: '1949.10.1',
            right: true
        },
        {
            content: '1959.7.1'
        },
        {
            content: '1969.8.1'
        },
        {
            content: '1994.1.1'
        }
    ]
} as SelectTi<string>

const confirm = ref(false)
const tiCard = ref<SelectCardExpose>()

function reset() {
    tiCard.value!.reset()
}

</script>
