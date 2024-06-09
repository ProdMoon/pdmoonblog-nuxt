<script setup lang="ts">
const props = defineProps<{
  href?: string;
  class?: string;
}>();
</script>

<template>
  <NuxtLink :to="href" :class="`px-5 py-2 rounded-md ${props.class}`">
    <slot></slot>
  </NuxtLink>
</template>
