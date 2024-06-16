<script setup lang="ts">
import type { Article } from '~/types/article';

const route = useRoute();
const { status } = useAuth();
const article = ref<Article | null>(null);

onMounted(async () => {
  const res: Article = await $fetch(`https://localhost:7233/api/article/${route.params.id}`);
  article.value = res;
});

const handleEdit = async () => {
  navigateTo(`/article/edit/${route.params.id}`);
};

const handleDelete = async () => {
  const response = await useFetch(`https://localhost:7233/api/article/${route.params.id}`, {
    method: 'DELETE',
  });

  if (response.status.value === 'success') {
    alert('삭제되었습니다.');
    navigateTo('/article');
  }
};
</script>

<template>
  <div class="text-2xl">{{ article?.title }}</div>
  <div class="mt-3" v-html="article?.content"></div>
  <div class="mt-3 flex items-center space-x-2">
    <button v-if="status === 'authenticated'" @click="handleEdit" class="px-5 py-2 rounded-md bg-blue-500 text-white">수정</button>
    <button v-if="status === 'authenticated'" @click="handleDelete" class="px-5 py-2 rounded-md bg-red-500 text-white">삭제</button>
  </div>
</template>
