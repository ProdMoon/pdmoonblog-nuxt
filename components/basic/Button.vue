<script setup lang="ts">
const props = defineProps<{
  href?: string;
  class?: string;
  disabled?: boolean;
}>();

const combinedClass = `px-5 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-400 inline-block disabled:bg-gray-100 disabled:text-gray-400 ${props.class ?? ''}`;
</script>
<template>
  <NuxtLink v-if="props.href" :to="props.href" :class="combinedClass">
    <span>
      <slot></slot>
    </span>
  </NuxtLink>
  <button :disabled="props.disabled" v-else :class="combinedClass">
    <span>
      <slot></slot>
    </span>
  </button>
</template>
