<script setup lang="ts">
import SentiButton from '~/components/senti/SentiButton.vue';

const { status, signOut } = useAuth();

const signOutFunction = async () => {
  try {
    await signOut({ callbackUrl: '/' });
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <main class="flex justify-center">
    <div class="w-full max-w-7xl">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl md:text-3xl pl-2 font-ubuntu">PDMoon Blog</NuxtLink>
        <div class="flex items-center space-x-3">
          <SentiButton href="/article/write">글쓰기</SentiButton>
          <SentiButton href="/article">글</SentiButton>
          <SentiButton v-if="status === 'authenticated'" @click="signOutFunction">로그아웃</SentiButton>
        </div>
      </div>
      <slot></slot>
    </div>
  </main>
</template>
