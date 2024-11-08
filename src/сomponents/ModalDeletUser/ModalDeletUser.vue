<script setup>
import { defineProps } from 'vue';
import ModalUI from '../UI/Modal/ModalUI.vue';

defineProps({
    isOpen: Boolean,
    updateOpenModal: Function
})
</script>

<template>
    <ModalUI :isOpen="isOpen" :updateOpenModal="updateOpenModal">
        <p>Вы уверены, что хотите удалить пользователя?</p>
        <div class="buttonBlock flex-mx">
            <button class="buttonBlock__agreement buttonNormal-mx" @click="updateOpenModal({ isDelet: true })">Да</button>
            <button class="buttonBlock__refusal buttonNormal-mx" @click="updateOpenModal({ isDelet: false })">Нет</button>
        </div>
    </ModalUI>
</template>

<style scoped>
.buttonBlock {
    padding-top: 24px;
    gap: 36px;
    justify-content: center;
}

.buttonBlock__agreement {
    background: var(--button-calm-variant);
    color: var(--button-calm-color);
}

.buttonBlock__refusal {
    background: var(--username);
    color: white;
}

.buttonBlock__refusal:hover,
.buttonBlock__agreement:hover {
    transform: var(--transform-animation-scale);
    transition: var(--transition-animation-scale);
}
</style>