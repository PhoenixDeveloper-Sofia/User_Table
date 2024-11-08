<script setup>
import { defineProps } from 'vue';

defineProps({
    isOpenModal: Boolean,
    updateOpenModal:Function
})
</script>

<template>
    <div v-if="isOpenModal" class="backgroundModal flex-mx" @click="updateOpenModal({ isDelet: false })">
        <div class="modal" @click.stop >
           <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.backgroundModal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.384);
}

.modal {
    display: inline-block;
    padding: 36px 36px 32px 36px;
    background: white;
    border-radius: 7px;
    line-height: 14.5px;
}
</style>