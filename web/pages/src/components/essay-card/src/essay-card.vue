<template>
    <h-card class="card">
        <template #header>
            {{ ti.title }}
        </template>
        <template #default>
            <h-button v-if="!show" class="show-btn" data-fill-width @click="show = true">
                查看答案
            </h-button>
            <ol v-else>
                <li v-for="p in ti.points">
                    {{ p }}
                </li>
            </ol>
        </template>
    </h-card>
</template>

<style lang="scss" scoped>
.card {
  width : 100%;
}

.show-btn {
  min-height : 200px;
}

@counter-style circled-num {
  system: fixed;
  symbols: ① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨ ⑩ ⑪ ⑫ ⑬ ⑭ ⑮ ⑯ ⑰ ⑱ ⑲ ⑳;
  suffix: " ";
}


ol {
  padding-left : 1em;
  list-style: circled-num;
}

</style>

<script lang="ts" setup>

import {ref, watch} from "vue"
import {HButton, HCard} from '@yin-jinlong/h-ui'
import {EssayCardProps, EssayCardExpose} from "./essay-card"

const props = defineProps<EssayCardProps>()
const show = ref(false)

function reset() {
    show.value = false
}

defineExpose<EssayCardExpose>({
    reset
})

</script>
