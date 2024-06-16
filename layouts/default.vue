<template>
  <div class="max-w-7xl">
    <div class="w-full flex items-center justify-between">
      <NuxtLink to="/" class="text-3xl font-ubuntu">ProdMoon Blog</NuxtLink>
      <div class="flex items-center space-x-3">
        <SentiButton href="/article/write">글쓰기</SentiButton>
        <SentiButton href="/article">글</SentiButton>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
