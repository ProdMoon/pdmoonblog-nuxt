<script setup lang="ts">
import type { Article } from '~/types/article';

const props = defineProps<{
  article?: Article;
  saveRequestFunction: (data: Article) => Promise<AsyncData<unknown, Error>>;
}>();

const title = ref(props.article?.title ?? '');
const content = ref(props.article?.content ?? '');
const currentContentViewMode = ref<'html' | 'dom'>('dom');
const apiURL = useRuntimeConfig().public.apiURL;

onMounted(() => {
  const contentEl = getContentEl();
  contentEl.innerHTML = content.value;

  document.getElementById('image-upload-input')?.addEventListener('change', handleImageUpload);
});

const getContentEl = () => {
  const el = document.getElementById('content');
  if (!el) {
    throw new Error('content element not found');
  }
  return el;
};

const handleSave = async () => {
  if (title.value.trim() === '') {
    alert('제목이 입력되지 않았습니다.');
    return;
  }

  content.value = getContentEl().innerHTML;
  if (content.value.trim() === '') {
    alert('내용이 입력되지 않았습니다.');
    return;
  }

  const data: Article = {
    id: props.article?.id,
    title: title.value,
    content: content.value,
  };

  const response = await props.saveRequestFunction(data);
  alert('저장되었습니다.');
  navigateTo('/article');
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

const handleImageUploadClick = () => {
  const file = document.getElementById('image-upload-input') as HTMLInputElement;
  file.click();
};

const handleImageUpload = async () => {
  const fileEl = document.getElementById('image-upload-input') as HTMLInputElement;
  if (!fileEl.files) return;

  const contentEl = getContentEl();

  for (const file of fileEl.files) {
    const { fileName, fileExtension } = getFileInformation(file);
    const timestamp = new Date().getTime();
    const key = `${fileName}_${timestamp}.${fileExtension}`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('key', key);
    await apiFetch('/api/file/upload', {
      method: 'POST',
      body: formData,
    });

    const imageUrl = apiURL + '/api/file/download/' + key;
    const el = document.createElement('img');
    el.src = imageUrl;
    el.alt = file.name;
    el.classList.add('w-full', 'h-auto');
    contentEl.appendChild(el);
  }
  fileEl.value = '';
  contentEl.focus();
};

const getFileInformation = (file: File) => {
  const arr = file.name.split('.');
  const fileName = arr.slice(0, -1).join('.');
  const fileExtension = arr.pop();
  return { fileName, fileExtension };
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
      <BasicButton v-if="currentContentViewMode === 'dom'" @click="handleDomToHtml">HTML 보기</BasicButton>
      <BasicButton v-else @click="handleHtmlToDom">DOM 보기</BasicButton>
      <input id="image-upload-input" type="file" accept="image/*" class="hidden" />
      <BasicButton @click="handleImageUploadClick">이미지 업로드</BasicButton>
    </div>
    <BasicButton @click="handleSave">저장</BasicButton>
  </div>
</template>
