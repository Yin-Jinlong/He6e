<template>
    <select-card :confirm="false"
                 :ti="ti"
                 type="radio"/>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>

import {SelectCard} from "@components/select-card";
import {SelectTi} from "@/types";

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

</script>
