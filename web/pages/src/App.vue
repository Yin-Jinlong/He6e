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
            <h-button
                    :for="'file'"
                    :type="'primary'"
                    @click="load">
                <input @change="onChangeFile" ref="fileInput" style="display: none" type="file">
                加载题目
            </h-button>
        </template>
    </h-card>

    <select-card
            v-if="tis.length"
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

import {reactive, ref} from "vue"
import {SelectCard, SelectCardExpose} from "@components/select-card"
import {parseTi, Ti, TiJson} from "@/types"

import {HButton, HCard} from 'h-ui'

const tis = reactive<Ti[]>([])

const tiI = ref(0)
const confirm = ref(false)
const tiCard = ref<SelectCardExpose>()
const fileInput = ref<HTMLInputElement>()

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

function load() {
    fileInput.value?.showPicker()
}

function addTi(ti: Ti | any) {
    let t = parseTi(ti)
    if (t)
        tis.push(t)
}

function onChangeFile(e: Event) {
    const {files} = fileInput.value!
    if (!files || files.length === 0)
        return
    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file.type !== 'application/json')
            continue
        const reader = new FileReader()
        reader.onload = function (e: ProgressEvent) {
            tis.length = 0
            const tiJson = JSON.parse((e.target as FileReader).result as string) as TiJson
            if (tiJson.data && Array.isArray(tiJson.data)) {
                tiJson.data.forEach(addTi)
            }
        }
        reader.readAsText(file)
    }
}

</script>
