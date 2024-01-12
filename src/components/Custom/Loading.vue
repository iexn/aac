<template>
    <div v-loading="computedLoading" :element-loading-text="loadingText">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    loading: boolean;
    loadingText?: string;
}

const props = withDefaults(defineProps<Props>(), {
    loading: false,
    loadingText: '加载中,请稍后...'
});

const emit = defineEmits<{
    (e: 'update:loading', value: boolean): void;
}>();

const computedLoading = computed({
    get: () => props.loading,
    set: (value) => emit('update:loading', value)
});
</script>
