<script setup lang="ts">
import type { Article } from '~/types/article';

const props = defineProps<{
  article?: Article;
  saveRequestFunction: (data: Article) => Promise<AsyncData<unknown, Error>>;
}>();

const title = ref(props.article?.title ?? '');
const content = ref(props.article?.content ?? '');
const currentContentViewMode = ref<'html' | 'dom'>('dom');

onMounted(() => {
  const contentEl = getContentEl();
  contentEl.innerHTML = content.value;
});

const getContentEl = () => {
  const el = document.getElementById('content');
  if (!el) {
    throw new Error('content element not found');
  }
  return el;
};

const handleSave = async () => {
  content.value = getContentEl().innerHTML;

  const data: Article = {
    id: props.article?.id,
    title: title.value,
    content: content.value,
  };

  const response = await props.saveRequestFunction(data);

  if (response.status.value === 'success') {
    alert('저장되었습니다.');
    navigateTo('/article');
  }
};

const handleDomToHtml = () => {
  currentContentViewMode.value = 'html';
  const contentEl = getContentEl();
  contentEl.innerText = contentEl.innerHTML;
  contentEl.style.fontFamily = 'monospace';
};

const handleHtmlToDom = () => {
  currentContentViewMode.value = 'dom';
  const contentEl = getContentEl();
  contentEl.innerHTML = contentEl.innerText;
  contentEl.style.fontFamily = 'inherit';
};
</script>

<template>
  <div>
    <input
      v-model="title"
      type="text"
      class="w-full p-2 border border-gray-300 rounded-md"
      placeholder="제목을 입력하세요"
    />
  </div>
  <div id="content" contenteditable class="w-full min-h-72 border p-4"></div>
  <div class="flex justify-between">
    <div class="flex items-center">
      <button v-if="currentContentViewMode === 'dom'" @click="handleDomToHtml">HTML 보기</button>
      <button v-else @click="handleHtmlToDom">DOM 보기</button>
    </div>
    <button @click="handleSave" class="px-5 py-2 rounded-md bg-blue-500 text-white">저장</button>
  </div>
</template>
