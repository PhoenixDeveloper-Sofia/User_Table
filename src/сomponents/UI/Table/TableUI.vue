<script setup>
import { defineProps } from 'vue';


defineProps({
    headerItem:Array
})
</script>

<template>
    <section class="userTable accentBlock-mx">
        <table class='userTable__table'>
            <thead>
                <tr>
                    <th class='userTable__header' v-for="header in headerItem" :key="header">{{ header }}</th>
                </tr>
            </thead>
            <slot></slot>
        </table>
        <slot name="footerBar"></slot>
    </section>
</template>

<style scoped>
.userTable {
    padding: 16px 18px 16px 16px;
    color: var(--background);
}

.userTable__table {
    width: 100%;
    table-layout: fixed
}

.userTable__header {
    padding-bottom: 22px;
    color: var(--names-tablet);
    text-align: left;
    line-height: 14px;
}
</style>