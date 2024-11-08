<script setup>
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
    searchUser: Function,
    isClearShow: Boolean
})

const searchQuery = ref([])
let timeout = null;

// Небольшая задержка перед отправкой запроса (улучшает производительность), позволяя пользователю завершить ввод запроса перед его отправкой.
watch(searchQuery, () => {
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
        props.searchUser(searchQuery.value);
    }, 300);
})

watch(() => props.isClearShow, () => {
    if (!props.isClearShow) {
        searchQuery.value = ''
    }
})
</script>

<template>
    <div class="searchInput">
        <img src="@/img/search.svg" alt="Поиск">
        <input v-model="searchQuery" type="text" placeholder="Поиск по имени или e-mail" class="searchInput__input" />
    </div>
</template>

<style scoped>
.searchInput {
    width: 100%;
    border-radius: 4px;
    background: var(--background_input);
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px 3px;
}

.searchInput__input {
    width: 100%;
}

.searchInput__input::placeholder {
    color: var(--names-tablet);
}
</style>