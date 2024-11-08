<script setup>
import { defineProps } from 'vue';

defineProps({
    clearFilter:Function
})

</script>

<template >
    <button class="clearButton flex-mx" @click="clearFilter()">
        <img src="@/img/clean.svg" alt="Очистить поиск"  class="clearButton__img">
        <p>Очистить фильтр</p>
    </button>
</template>

<style scoped>
   .clearButton{
    padding-top: 24px;
    gap: 4px;
   }
   .clearButton:hover{
    transform: var( --transform-animation-scale); 
    transition: var(--transition-animation-scale);
   }
   .clearButton__img{
    height: 16px;
   }

</style>