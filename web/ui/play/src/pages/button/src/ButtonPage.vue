<template>
    <yjl-card>
        <template #header>
            基础用法
        </template>
        <template #default>
            <yjl-button>按钮</yjl-button>
            <yjl-button type="success">成功</yjl-button>
        </template>
    </yjl-card>
    <yjl-card>
        <template #header>
            尺寸
        </template>
        <template #default>
            <div>
                <yjl-button size="small">按钮</yjl-button>
                <yjl-button>按钮</yjl-button>
                <yjl-button size="large">按钮</yjl-button>
                <yjl-button size="xlarge">按钮</yjl-button>
            </div>
            <div>
                <yjl-button size="small" type="success">按钮</yjl-button>
                <yjl-button type="success">按钮</yjl-button>
                <yjl-button size="large" type="success">按钮</yjl-button>
                <yjl-button size="xlarge" type="success">按钮</yjl-button>
            </div>
        </template>
    </yjl-card>
</template>

<style scoped lang="scss">
div+div{
  margin-top: 1em;
}
</style>

<script setup lang="ts">
import {YjlButton, YjlCard} from '@ui'
</script>
