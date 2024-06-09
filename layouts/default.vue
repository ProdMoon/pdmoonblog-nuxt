<template>
  <div class="max-w-7xl">
    <div class="w-full flex items-center justify-between">
      <NuxtLink to="/" class="text-3xl">ProdMoon Blog</NuxtLink>
      <div class="flex items-center space-x-3">
        <MyA href="/article/write" class="bg-blue-500 text-white">글쓰기</MyA>
        <MyA href="/article" class="bg-blue-500 text-white">글</MyA>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
