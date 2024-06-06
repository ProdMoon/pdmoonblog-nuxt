<script setup lang="ts">
import type { Article } from '~/types/article';

const title = ref('');
const content = ref('');
const currentContentViewMode = ref<'html' | 'dom'>('dom');

const handleSave = async () => {
    const contentEl = document.getElementById('content');
    if (!contentEl) {
        throw new Error('content element not found');
    }
    content.value = contentEl.innerHTML;

    const data: Article = {
        title: title.value,
        content: content.value,
    };

    const response = await useFetch('https://localhost:7233/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
    });

    if (response.status.value === 'success') {
        alert('저장되었습니다.');
        title.value = '';
        content.value = '';
        contentEl.innerHTML = '';
    }
};

const handleDomToHtml = () => {
    currentContentViewMode.value = 'html';
    const contentEl = document.getElementById('content');
    if (!contentEl) {
        throw new Error('content element not found');
    }
    contentEl.innerText = contentEl.innerHTML;
    contentEl.style.fontFamily = 'monospace';
};

const handleHtmlToDom = () => {
    currentContentViewMode.value = 'dom';
    const contentEl = document.getElementById('content');
    if (!contentEl) {
        throw new Error('content element not found');
    }
    contentEl.innerHTML = contentEl.innerText;
    contentEl.style.fontFamily = 'inherit';
};

</script>

<template>
    <div class="text-2xl">글쓰기</div>
    <div>
        <input v-model="title" type="text" class="w-full p-2 border border-gray-300 rounded-md" placeholder="제목을 입력하세요">
    </div>
    <div id="content" contenteditable class="w-full min-h-72 border p-4">
    </div>
    <div class="flex justify-between">
        <div class="flex items-center">
            <button v-if="currentContentViewMode === 'dom'" @click="handleDomToHtml">HTML 보기</button>
            <button v-else @click="handleHtmlToDom">DOM 보기</button>
        </div>
        <button @click="handleSave" class="px-5 py-2 rounded-md bg-blue-500 text-white">저장</button>
    </div>
</template>