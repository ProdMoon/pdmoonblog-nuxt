<script setup lang="ts">
import type { Article } from '~/types/article';

definePageMeta({ middleware: 'auth' });

const saveRequestFunction = async (data: Article) => {
  const res = await apiFetch('/api/article', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });
  return res;
};
</script>

<template>
  <div class="text-2xl">글쓰기</div>
  <ArticleEditor :save-request-function="saveRequestFunction" />
</template>
