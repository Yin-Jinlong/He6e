<template>
    <yjl-card>
        <template #header>
            基础用法和颜色
        </template>
        <template #default>
            <div>
                <yjl-button>
                    没有样式
                </yjl-button>
            </div>
            <div>
                <span>边框</span>
                <input v-model="border" type="checkbox">
            </div>
            <div v-for="(type,ti) in types" class="grid">
                <yjl-button
                        v-for="(color,i) in colors"
                        :key="type"
                        :border="border"
                        :color="color"
                        :type="type">
                    {{ i === 0 ? typeTexts[ti] : colorTexts[i] }}
                </yjl-button>
            </div>
        </template>
    </yjl-card>
    <yjl-card>
        <template #header>
            尺寸
        </template>
        <template #default>
            <div>
                <span>边框</span>
                <input v-model="border" type="checkbox">
            </div>
            <div v-for="type in types">
                <yjl-button v-for="size in sizes"
                            :key="size"
                            :border="border"
                            :size="size"
                            :type="type">按钮
                </yjl-button>
            </div>
        </template>
    </yjl-card>
</template>

<style lang="scss" scoped>
div + div {
  margin-top : 1em;
}

.grid {
  display               : grid;
  grid-template-columns : repeat(7, 1fr);
}

</style>

<script lang="ts" setup>
import {YjlButton, YjlButtonSize, YjlButtonType, YjlCard} from '@ui'
import {DefinedNamedColor} from "@ui/components/types";
import {ref} from "vue";

const sizes: YjlButtonSize[] = ['small', 'default', 'large', 'xlarge']
const types: YjlButtonType[] = ['primary', 'plain', 'text']
const typeTexts: YjlButtonType[] = ['主要', '普通', '文字']
const colors: DefinedNamedColor[] = ['primary', 'success', 'warning', 'danger', 'info', 'emphasize', '#39e']
const colorTexts: YjlButtonType[] = ['主要', '成功', '警告', '危险', '信息', '强调', '自定义']

const border = ref(false)

</script>
