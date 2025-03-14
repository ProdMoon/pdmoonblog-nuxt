<script setup lang="ts">
import dayjs from 'dayjs';
import type { WebSocketMessage } from '~/types/webSocketMessage';

const apiURL = useRuntimeConfig().public.apiURL;
const connectionUrl = `wss://${apiURL.split('://')[1]}/ws`;
const myId = crypto.randomUUID();

const socket = ref<WebSocket | null>(null);
const connectionStatus = ref<'disconnected' | 'connected'>('disconnected');
const myName = ref<string>('');
const messages = ref<WebSocketMessage[]>([]);
const message = ref<string>('');
const chatBox = ref<HTMLElement | null>(null);
const isAutoScroll = ref(true);

onMounted(() => {
  chatBox.value = document.getElementById('chatbox');
});

onUnmounted(() => {
  if (socket.value?.readyState === WebSocket.OPEN) {
    socket.value.close();
  }
});

watch(
  () => messages.value,
  () => {
    if (isAutoScroll.value) autoScrollDown();
  },
  { deep: true }
);

function handleConnect() {
  if (!myName) {
    messages.value.push({
      type: 'log',
      message: '이름을 입력해주세요.',
      timestamp: dayjs().valueOf(),
    });
    return;
  }
  socket.value = new WebSocket(connectionUrl);
  socket.value.onopen = () => {
    connectionStatus.value = 'connected';
    messages.value.push({
      type: 'log',
      message: '접속 성공!',
      timestamp: dayjs().valueOf(),
    });
  };
  socket.value.onclose = (e) => {
    connectionStatus.value = 'disconnected';
    messages.value.push({
      type: 'log',
      message: `접속 종료! (${e.code}: ${e.reason})`,
      timestamp: dayjs().valueOf(),
    });
  };
  socket.value.onmessage = (e) => {
    const data = JSON.parse(e.data);
    messages.value.push({
      type: 'message',
      message: data.message,
      timestamp: data.timestamp,
      senderId: data.senderId,
      senderName: data.senderName,
    });
  };
  socket.value.onerror = () => {
    messages.value.push({
      type: 'log',
      message: '에러가 발생했습니다.',
      timestamp: dayjs().valueOf(),
    });
  };
}

function handleClose() {
  if (socket.value?.readyState === WebSocket.OPEN) {
    socket.value.close();
  }
}

function handleSend() {
  if (socket.value?.readyState !== WebSocket.OPEN) {
    messages.value.push({
      type: 'log',
      message: '연결되어 있지 않아요.',
      timestamp: dayjs().valueOf(),
    });
    return;
  }

  if (!message.value) return;

  socket.value.send(
    JSON.stringify({
      type: 'message',
      message: message.value,
      timestamp: dayjs().valueOf(),
      senderId: myId,
      senderName: myName.value,
    })
  );
  message.value = '';
}

function handleClear() {
  messages.value = [];
}

function autoScrollDown() {
  chatBox.value?.scrollIntoView({ behavior: 'smooth', block: 'end' });
}
</script>

<template>
  <div class="space-y-4 p-4">
    <div class="flex items-center justify-between">
      <div class="flex space-x-4">
        <input v-model="myName" class="w-40 rounded-md border px-2.5 py-1" placeholder="이름" />
        <BasicButton @click="handleConnect">접속</BasicButton>
        <BasicButton @click="handleClose">종료</BasicButton>
      </div>
      <div class="flex space-x-4">
        <label class="flex items-center space-x-2">
          <input v-model="isAutoScroll" type="checkbox" class="h-4 w-4" />
          <span>자동 스크롤</span>
        </label>
        <BasicButton @click="handleClear">채팅 기록 지우기</BasicButton>
      </div>
    </div>
    <div class="h-[50vh] overflow-y-auto rounded-xl border p-4 shadow">
      <div id="chatbox" class="space-y-2">
        <div v-for="msg in messages" :key="msg.timestamp" class="text-sm">
          <div v-if="msg.type === 'log'" class="text-center text-gray-500">{{ msg.message }}</div>
          <div v-else>
            <span class="mr-2 font-bold">[{{ msg.senderName }}]</span>
            <span>{{ msg.message }}</span>
          </div>
        </div>
        <div class="h-8" />
      </div>
    </div>
    <div class="flex space-x-4">
      <input v-model="message" class="flex-1 rounded-md border px-2.5 py-1 shadow" @keyup.enter="handleSend" />
      <BasicButton @click="handleSend">보내기</BasicButton>
    </div>
  </div>
</template>
