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
                    :color="'danger'"
                    :type="'primary'"
                    @click="reset">
                重置
            </h-button>
        </template>
    </h-card>

    <select-card
            ref="tiCard"
            :confirm="confirm"
            :ti="tis[tiI]"/>
    <div>
        <h-button
                :type="'primary'"
                @click="goTi(-1)">上一题
        </h-button>
        <h-button
                :type="'primary'"
                @click="goTi(1)">下一题
        </h-button>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>

import {ref} from "vue"
import {SelectCard, SelectCardExpose} from "@components/select-card"
import {JudgeTi, SelectTi, Ti} from "@/types"

import {HButton, HCard} from 'h-ui'

const tis: Ti[] = [
    {
        type: 'select',
        title: '1+1=',
        options: [
            {
                content: '3'
            },
            {
                content: '2',
                right: true
            },
            {
                content: '1'
            },
            {
                content: '4'
            }
        ]
    } as SelectTi<string>,
    {
        type: 'select',
        title: '10>()',
        options: [
            {
                content: '1',
                right: true
            },
            {
                content: '12',
            },
            {
                content: '5',
                right: true
            },
            {
                content: '10'
            }
        ]
    } as SelectTi<string>,
    {
        type: 'judge',
        title: '3>2',
        right: false
    } as JudgeTi
] as const

const tiI = ref(0)
const confirm = ref(false)
const tiCard = ref<SelectCardExpose>()

function reset() {
    tiCard.value!.reset()
}

function goTi(di: number) {
    let i = tiI.value + di
    if (i < 0)
        i = 0
    else if (i >= tis.length)
        i = tis.length - 1
    tiI.value = i
}

</script>
