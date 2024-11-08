<script setup>
import { defineProps } from 'vue';

defineProps({
    paginationsOptins: Array,
    page:Number,
    updatePage:Function
})
</script>

<template>
    <nav>
        <ul class="paginationsBar flex-mx ">
            <li :class="['paginationsBar__item', page+1 == optin && 'paginationsBar__item-active']" v-for="optin in paginationsOptins" :key="optin" @click="updatePage(optin)">{{optin}}</li>
        </ul>
    </nav>
</template>

<style scoped>
.paginationsBar{
    color: var(--font);
    gap: 8px;
    font-weight: 700;
    justify-content: center;
    padding-top: 20px;
    font-size: 14px;
}
.paginationsBar__item:hover{
    transform: scale(1.1); 
    transition: var(--transition-animation-scale);
}
.paginationsBar__item-active{
    color: var(--username);
}
</style>