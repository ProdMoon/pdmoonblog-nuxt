<script setup lang="ts">
import type { Article } from '@/types/article';
const articles = ref([] as Article[]);

articles.value = await apiFetch('/api/article');
</script>

<template>
  <div class="space-y-2">
    <div v-for="article in articles" :key="article.id">
      <NuxtLink :to="`/article/${article.id}`">
        <div class="border p-2 flex items-center hover:bg-blue-100">
          <div class="mr-3 text-gray-500">{{ article.id }}</div>
          <div>{{ article.title }}</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
