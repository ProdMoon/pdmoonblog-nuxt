<script setup lang="ts">
const { status, signOut } = useAuth();

const signOutFunction = async () => {
  try {
    await signOut({ callbackUrl: '/' });
  } catch (error) {
    console.error(error);
  }
};

const hiddenLoginClickCount = ref(0);

const handleHiddenLogin = () => {
  if (hiddenLoginClickCount.value < 5) {
    hiddenLoginClickCount.value += 1;
  } else {
    hiddenLoginClickCount.value = 0;
    window.location.href = '/account/signin';
  }
};
</script>

<template>
  <main class="flex justify-center">
    <div class="w-full max-w-7xl">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="pl-2 font-ubuntu text-2xl md:text-3xl">pdmoonblog</NuxtLink>
        <div class="flex items-center space-x-3">
          <div v-if="status !== 'authenticated'" id="hidden-login" class="h-10 w-10" @click="handleHiddenLogin"></div>
          <SentiButton v-if="status === 'authenticated'" class="text-xs" href="/article/write">글쓰기</SentiButton>
          <SentiButton v-if="status === 'authenticated'" class="text-xs" @click="signOutFunction">로그아웃</SentiButton>
        </div>
      </div>
      <slot></slot>
    </div>
  </main>
</template>
