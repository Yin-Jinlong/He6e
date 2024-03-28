<template>
    <h-card class="card">
        <template #header>
            {{ ti.title }}
        </template>
        <template #default>
            <div class="select-box"
                 data-fill-width
                 data-flex>
                <select-button
                        v-for="(o,i) in options"
                        :i="i"
                        :status="toStatus(o)"
                        :text="o.content"
                        @click="addSelect(o)"/>
            </div>
        </template>
        <template #footer>
            <div>
                <h-button v-if="(confirm||!isRadioType())&&!show"
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
  width : 100%;
}

.select-box {
  flex-direction : column;

  & > div {
    margin : 5px 0;
  }

}
</style>

<script lang="ts" setup>

import {ref, watch} from "vue"
import {HButton, HCard} from '@yin-jinlong/h-ui'
import {SelectCardExpose, SelectCardProps} from "./select-card"
import {SelectButton, SelectButtonStatus} from "@components/select-button"
import {JudgeTi, SelectTi, TiOption} from "@/types"

const props = defineProps<SelectCardProps>()
const show = ref(false)
const selects = ref<Set<TiOption<string>>>(new Set())
const options = ref<TiOption<string>[]>([])

function toStatus(o: TiOption<string>): SelectButtonStatus {
    if (!show.value) {
        return selects.value.has(o) ? 'selected' : ''
    }
    if (o.right)
        return selects.value.has(o) ? 'success' : 'half-right'
    else if (selects.value.has(o))
        return 'failed'
    return ''
}

function isRadioType(): boolean {
    let {ti} = props
    if (ti.type === 'judge')
        return true
    else if (ti.type === 'select') {
        let has = false
        for (const o of (ti as SelectTi<string>).options) {
            if (o.right) {
                if (has)
                    return false
                has = true
            }
        }
        return true
    }
    return false
}

function addSelect(o: TiOption<string>) {
    if (show.value)
        return

    if (selects.value.has(o)) {
        selects.value.delete(o)
    } else {
        if (isRadioType())
            selects.value.clear()
        selects.value.add(o)
    }
    if (!props.confirm && isRadioType())
        show.value = true
}

function reset() {
    selects.value.clear()
    show.value = false
}

defineExpose<SelectCardExpose>({
    reset
})

watch(() => props.ti, (ti) => {
    reset()
    options.value.length = 0
    switch (ti.type) {
        case "select":
            let os = (ti as SelectTi<string>).options
            os.forEach(o => {
                options.value.push(o)
            })
            break
        case "judge":
            let r = (ti as JudgeTi).right
            options.value.push({
                content: '对',
                right: r
            })
            options.value.push({
                content: '错',
                right: !r
            })
            break
    }
}, {
    immediate: true
})

</script>
