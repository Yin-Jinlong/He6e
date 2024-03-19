<template>
    <yjl-card>
        <template #header>
            基础用法
        </template>
        <template #default>
            <yjl-button>
                没有样式
            </yjl-button>
            <yjl-button
                    v-for="(type,i) in types"
                    :key="type"
                    :type="type">
                {{ typeTexts[i] }}
            </yjl-button>
        </template>
    </yjl-card>
    <yjl-card>
        <template #header>
            颜色
        </template>
        <template #default>
            <div v-for="type in types">
                <yjl-button v-for="(color,i) in colors"
                            :key="color"
                            :color="color"
                            :type="type">
                    {{ colorTexts[i] }}
                </yjl-button>
            </div>
        </template>
    </yjl-card>
    <yjl-card>
        <template #header>
            尺寸
        </template>
        <template #default>
            <div v-for="type in types">
                <yjl-button v-for="size in sizes"
                            :key="size"
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
</style>

<script lang="ts" setup>
import {YjlButton, YjlButtonSize, YjlButtonType, YjlCard} from '@ui'
import {DefinedNamedColor} from "@ui/components/types";

const sizes: YjlButtonSize[] = ['small', 'default', 'large', 'xlarge']
const types: YjlButtonType[] = ['primary', 'plain', 'text']
const typeTexts: YjlButtonType[] = ['主要','普通', '文字']
const colors: DefinedNamedColor[] = ['primary', 'success', 'warning', 'danger', 'info', 'emphasize', '#39e']
const colorTexts: YjlButtonType[] = ['主要', '成功', '警告', '危险', '信息', '强调', '自定义']

</script>
