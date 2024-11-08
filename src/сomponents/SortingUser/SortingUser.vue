<script setup>
import { defineProps } from 'vue';
import SORTING_OPTIONS from '@/utils/SortingOptions'

defineProps({
    sortUser: Object,
    toggleSortOption:Function
})

</script>

<template>
    <section class="sortingUser flex-mx">
        <h2>Сортировка:</h2>
        <ul class="sortingUser__options flex-mx">
            <li :class='sortUser.type == option.option ? "sortingUser__item-active " : "sortingUser__item "'
                v-for="option in SORTING_OPTIONS" :key="option.option"
                @click="toggleSortOption(option.option)">
                {{ option.title }}
            </li>
        </ul>
    </section>
</template>

<style scoped>
.sortingUser {
    gap: 8px;
    color: var(--names-tablet);
    padding-bottom: 15px;
    line-height: 14px;
}

.sortingUser__options {
    gap: 8px;
}

.sortingUser__item {
    border-bottom: 1px dashed var(--names-tablet);
}

.sortingUser__item-active {
    border-bottom: 1px dashed var(--main-text-color);
    color: var(--main-text-color);
}

.sortingUser__item:hover,
.sortingUser__item-active:hover {
    transform: var(--transform-animation-scale);
    transition: var(--transition-animation-scale);
}
</style>