<template>
    <h-card class="card">
        <template #header>
            {{ ti.title }}
        </template>
        <template #default>
            <div class="select-box"
                 data-fill-width
                 data-flex>
                <select-button v-for="(o,i) in ti.options"
                               :i="i"
                               :status="toStatus(o)"
                               :text="o.content"
                               @click="addSelect(o)"/>
            </div>
        </template>
        <template #footer>
            <div>
                <h-button v-if="confirm&&type!=='multi'&&!show"
                          :border="true"
                          :type="'plain'"
                          @click="show=true"
                          data-fill-width>
                    <span>确定</span>
                </h-button>
            </div>
        </template>
    </h-card>
</template>

<style lang="scss" scoped>
.card {
  width : 600px;
}

.select-box {
  flex-direction : column;

  & > div {
    margin : 5px 0;
  }

}
</style>

<script lang="ts" setup>

import {HButton, HCard} from 'h-ui'
import {SelectCardProps} from "./select-card"
import {SelectButton, SelectButtonStatus} from "@components/select-button";
import {ref} from "vue";
import {TiOption} from "@/types";

const props = defineProps<SelectCardProps>()
const show = ref(false)
const selects = ref<Set<TiOption<string>>>(new Set())

function toStatus(o: TiOption<string>): SelectButtonStatus {
    if (!show.value) {
        return selects.value.has(o) ? 'selected' : ''
    }
    if (o.right)
        return 'success'
    else if (selects.value.has(o))
        return 'failed'
    return ''
}

function addSelect(o: TiOption<string>) {
    if (show.value)
        return
    if (props.type === 'radio')
        selects.value.clear()
    selects.value.add(o)
    if (!props.confirm)
        show.value = true
}

</script>
