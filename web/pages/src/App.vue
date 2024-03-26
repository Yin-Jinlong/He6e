<template>
    <div data-fill-size data-flex style="min-width: 700px;">
        <div data-flex-column style="width: 30%;min-width: 300px;max-height: 100%">
            <h-card>
                <template #header>
                    设置
                </template>
                <template #default>
                    <div class="box">
                        <h-check-box v-model="dark" @click="changeTheme">
                            暗色
                        </h-check-box>
                    </div>
                    <div class="box">
                        <h-check-box v-model="confirm">
                            确认提交
                        </h-check-box>
                    </div>
                    <div class="box">
                        <h-button
                                :color="'danger'"
                                :disabled="tis.length<1"
                                :type="'primary'"
                                @click="reset">
                            重置
                        </h-button>
                        <h-button
                                :for="'file'"
                                :type="'primary'"
                                @click="load">
                            <input ref="fileInput" style="display: none" type="file" @change="onChangeFile">
                            加载题目
                        </h-button>
                    </div>
                </template>
            </h-card>
            <div v-if="tis.length" class="ti-indexes-box">
                <div v-for="i in tis.length">
                    <h-button
                            :border="true"
                            :type="(tiI+1)===i?'primary':''"
                            style="box-sizing: border-box;border-width: 2px"
                            @click="tiI=i-1">
                        {{ i }}
                    </h-button>
                </div>
            </div>
        </div>
        <div v-if="tis.length"
             data-flex-column-center style="width: 70%;padding-right: 1em;justify-content: start">
            <select-card
                    ref="tiCard"
                    :confirm="confirm"
                    :ti="tis[tiI]"
                    data-fill-width/>
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
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ti-indexes-box {
  align-items           : start;
  background-color      : var(--h-color-background-simple);
  border-radius         : 10px;
  box-shadow            : 0 0 10px rgba(128, 128, 128, 0.2);
  display               : grid;
  flex                  : 1;
  gap                   : 5px;
  grid-template-columns : repeat(auto-fill, minmax(60px, auto));
  justify-content       : space-around;
  justify-items         : center;
  margin                : 5px;
  overflow-y            : auto;
  padding               : 5px;
}

.box {
  margin : 0.5em 0;
}

</style>

<script lang="ts" setup>

import {reactive, ref} from "vue"
import {SelectCard, SelectCardExpose} from "@components/select-card"
import {parseTi, Ti, TiJson} from "@/types"

import {HButton, HCard, HCheckBox} from 'h-ui'

const tis = reactive<Ti[]>([])

const tiI = ref(0)
const confirm = ref(false)
const dark = ref(false)
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


function change() {
    const root = document.documentElement
    let isDark = root.hasAttribute('dark')
    if (isDark)
        root.removeAttribute('dark')
    else
        root.setAttribute('dark', '')
    dark.value = !isDark
}

function changeTheme(e: MouseEvent) {
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
    )

    if (document.startViewTransition) {
        const transition = document.startViewTransition(change)
        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];
            document.documentElement.animate(
                {
                    clipPath: clipPath,
                },
                {
                    duration: 400,
                    easing: "ease-out",
                    pseudoElement: "::view-transition-new(root)",
                }
            )
        })
    } else {
        change()
    }
}

</script>
