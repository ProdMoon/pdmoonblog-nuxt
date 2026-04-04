<script setup lang="ts">
import type { Article } from '~/types/article';

const route = useRoute();

if (Array.isArray(route.params.id)) {
  route.params.id = route.params.id[0];
}
const { data } = await useFetch<Article>(`/api/article/${route.params.id}`);
const article = data.value;

const updateArticle = async (article: Article) => {
  if (!article.id) {
    throw new Error('article id is required');
  }
  const res = await $fetch(`/api/article/${article.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: article,
  });
};
</script>

<template>
  <div class="text-2xl">수정</div>
  <ArticleEditor :article="article" :save-request-function="updateArticle" />
</template>
