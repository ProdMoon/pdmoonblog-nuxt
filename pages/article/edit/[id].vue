<script setup lang="ts">
import type { Article } from '~/types/article';

definePageMeta({ middleware: 'auth' });

const route = useRoute();

const getArticle: (id: number) => Promise<Article> = async (id) => {
  return await $fetch(`/api/article/${id}`);
};

const updateArticle = async (article: Article) => {
  if (!article.id) {
    throw new Error('article id is required');
  }
  const res = await useFetch(`/api/article/${article.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: article,
  });
  return res;
};

if (Array.isArray(route.params.id)) {
  route.params.id = route.params.id[0];
}
const article = await getArticle(parseInt(route.params.id));
</script>

<template>
  <div class="text-2xl">수정</div>
  <ArticleEditor :article="article" :save-request-function="updateArticle" />
</template>
