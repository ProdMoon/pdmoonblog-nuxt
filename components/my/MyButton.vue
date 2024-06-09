<script setup lang="ts">
const props = defineProps<{
  onClick?: () => void;
  class?: string;
}>();
</script>

<template>
  <button @click="onClick" :class="`px-5 py-2 rounded-md ${props.class}`">
    <slot></slot>
  </button>
</template>
