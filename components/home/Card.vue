<script setup lang="ts">
const props = defineProps<{
  href?: string;
  class?: string;
}>();

const combinedClass = `h-72 rounded-xl shadow-md ${props.class ?? ''}`;
</script>

<template>
  <div :class="combinedClass">
    <slot />
  </div>
</template>
