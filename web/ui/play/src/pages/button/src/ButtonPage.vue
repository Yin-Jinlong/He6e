<template>
    <yjl-card>
        <template #header>
            基础用法
        </template>
        <template #default>
            <yjl-button v-for="(type,i) in types"
                        :key="type"
                        :type="type">
                {{ typesTexts[i] }}
            </yjl-button>
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

const sizes: YjlButtonSize[] = ['small', 'default', 'large', 'xlarge']
const types: YjlButtonType[] = ['default', 'success', 'warning', 'danger', 'info', 'emphasize']
const typesTexts: YjlButtonType[] = ['按钮', '成功', '警告', '危险', '信息', '强调']

</script>
