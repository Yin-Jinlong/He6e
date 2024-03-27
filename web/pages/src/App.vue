<template>
    <div data-fill-size data-flex style="min-width: 700px;">
        <div data-flex-column style="width: 30%;min-width: 300px;max-height: 100%">
            <transition name="config">
                <h-card v-if="showConfigs">
                    <template #header>
                        设置
                    </template>
                    <template #default>
                        <div v-for="c in configCheckBoxes" class="box">
                            <h-check-box v-model="configs[c.model]" @click="c.click">
                                {{ c.label }}
                            </h-check-box>
                        </div>
                    </template>
                </h-card>
            </transition>
            <h-card>
                <template #default>
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
                            @click="goTi(i-tiI-1)">
                        {{ i }}
                    </h-button>
                </div>
            </div>
        </div>
        <div v-if="tis.length"
             data-flex-column-center style="width: 70%;padding-right: 1em;justify-content: start">
            <select-card
                    ref="tiCard"
                    v-auto-height
                    :confirm="configs.confirm"
                    :ti="tis[tiI]"
                    class="ti-card"
                    data-fill-width
                    data-transition-fast
                    style="overflow: hidden"/>
            <div>
                <h-button
                        :disabled="tiI===0"
                        :type="'primary'"
                        @click="goTi(-1)">上一题
                </h-button>
                <h-button
                        :disabled="tiI>tis.length-2"
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

.ti-card {
  transform-origin            : left top;
  --card-view-transition-name : '';
  view-transition-name        : var(--card-view-transition-name);
}

.config-enter-active,
.config-leave-active {
  transition : all 0.3s ease-in-out;
}

.config-enter-from,
.config-leave-to {
  opacity   : 0;
  translate : 0 -30%;
}

</style>

<script lang="ts" setup>

import {onMounted, reactive, ref, watch} from "vue"
import {SelectCard, SelectCardExpose} from "@components/select-card"
import {parseTi, Ti, TiJson} from "@/types"

import {HButton, HCard, HCheckBox, viewTransition, vAutoHeight} from 'h-ui'

interface Configs {
    dark: boolean
    confirm: boolean
    cardAnim: boolean
}

interface ConfigCheckBox {
    label: string
    model: keyof Configs
    click?: Function
}

const configs = reactive<Configs>({
    dark: false,
    confirm: false,
    cardAnim: true,
})
const tis = reactive<Ti[]>([])

const showConfigs = ref(false)
const tiI = ref(0)
const tiCard = ref<SelectCardExpose>()
const fileInput = ref<HTMLInputElement>()

const configCheckBoxes: ConfigCheckBox[] = [
    {
        label: '暗色',
        model: 'dark',
        click: changeTheme
    },
    {
        label: '切题动画',
        model: 'cardAnim',
    },
    {
        label: '确认提交',
        model: 'confirm',
    },
]

function reset() {
    tiCard.value!.reset()
}

function changeTiI(i: number) {
    tiI.value = i
}

function startCardAnim(i: number, next: boolean) {
    let card: HTMLElement = document.querySelector('.ti-card')!
    viewTransition(async () => {
        changeTiI(i)
    }, () => {
        card.style.setProperty('--card-view-transition-name', 'card')
    }, () => {
        let ts = ['0 0', '-30% 100%', '0 0']
        let rs = ['0deg', '20deg', '0deg']
        let zs = next ? [20, 10, 0] : [10, 20, 30]
        document.documentElement.animate({
            translate: next ? ts : ts.reverse(),
            zIndex: zs,
            rotate: rs,
        }, {
            duration: 500,
            easing: 'ease-out',
            pseudoElement: `::view-transition-${next ? 'old' : 'new'}(card)`,
        })
    }, null, () => {
        card.style.setProperty('--card-view-transition-name', '')
    })
}

function goTi(di: number) {
    let i = tiI.value + di
    if (i < 0)
        i = 0
    else if (i >= tis.length)
        i = tis.length - 1
    if (tiI.value === i)
        return;
    if (configs.cardAnim) {
        startCardAnim(i, di > 0)
    } else {
        changeTiI(i)
    }
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
            tiI.value = 0
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
    configs.dark = !isDark
}

function changeTheme(e: MouseEvent) {
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
    )

    viewTransition(change, null, () => {
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
}

onMounted(() => {
    window.addEventListener('keydown', e => {
        if (e.key === '`') {
            showConfigs.value = !showConfigs.value
        }
    })
})

watch(() => configs.confirm, () => {
    if (tis.length)
        reset()
})

</script>
