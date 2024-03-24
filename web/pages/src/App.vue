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
            type="multi"/>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>

import {ref} from "vue"
import {SelectCard, SelectCardExpose} from "@components/select-card"
import {SelectTi} from "@/types"

import {HButton, HCard} from 'h-ui'

const ti = {
    title: '那个数字小于10（）',
    options: [
        {
            content: '5',
            right: true
        },
        {
            content: '6',
            right:true
        },
        {
            content: '11'
        },
        {
            content: '2',
            right:true
        }
    ]
} as SelectTi<string>

const confirm = ref(false)
const tiCard = ref<SelectCardExpose>()

function reset() {
    tiCard.value!.reset()
}

</script>
