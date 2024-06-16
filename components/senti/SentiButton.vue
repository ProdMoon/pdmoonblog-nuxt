<script setup lang="ts">
const props = defineProps<{
  href?: string;
  onClick?: () => void;
  class?: string;
}>();

const combinedClass = `px-5 py-2 border-gray-700 border-b-4 border-double font-batang font-bold ${props.class ?? ''}`;
</script>
<style scoped>
a, button {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

a::before, button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: #efefef;
  transition: left 0.6s;
}

a:hover::before, button:hover::before {
  left: 0;
}

a span, button span {
  position: relative;
  z-index: 1;
}
</style>
<template>
  <NuxtLink v-if="props.href" :to="props.href" :class="combinedClass">
    <span>
      <slot></slot>
    </span>
  </NuxtLink>
  <button v-else @click="onClick" :class="combinedClass">
    <span>
      <slot></slot>
    </span>
  </button>
</template>
