<template>
    <ul>
        <li v-for="page in pages" :key="page.name">
            <router-link :to="page.path">{{ page.name }}</router-link>
        </li>
    </ul>
</template>

<style scoped lang="scss">

</style>

<script setup lang="ts">

interface Page {
    name: string
}

const pages: Page[] = [
    {
        name: 'Button',
        path: '/button'
    },
    {
        name: 'Card',
        path: '/card'
    },
]


</script>
