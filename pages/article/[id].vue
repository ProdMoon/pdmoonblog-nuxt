<script setup lang="ts">
import type { Article } from '~/types/article';

const route = useRoute();
const article = ref<Article | null>(null);

onMounted(async () => {
    const res: Article = await $fetch(`https://localhost:7233/api/post/${route.params.id}`);
    article.value = res;
});

const handleDelete = async () => {
    const response = await useFetch(`https://localhost:7233/api/post/${route.params.id}`, {
        method: 'DELETE',
    });

    if (response.status.value === 'success') {
        alert('삭제되었습니다.');
        await navigateTo('/article');
    }
};
</script>

<template>
  <div v-if="article">
    <div class="text-2xl">{{ article.title }}</div>
    <div class="mt-3" v-html="article.content"></div>
    <button @click="handleDelete" class="px-5 py-2 mt-3 rounded-md bg-red-500 text-white">삭제</button>
  </div>
</template>