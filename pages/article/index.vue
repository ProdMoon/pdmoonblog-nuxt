<script setup lang="ts">
import type { Article } from '@/types/article';
const articles = ref([] as Article[]);

onMounted(async () => {
  const res: Article[] = await $fetch('https://localhost:7233/api/article');
  articles.value = res;
});
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
