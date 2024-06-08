<template>
  <div class="max-w-7xl">
    <div class="w-full flex items-center justify-between">
      <NuxtLink to="/" class="text-3xl">ProdMoon Blog</NuxtLink>
      <div class="flex items-center space-x-3">
        <NuxtLink to="/article/write" class="px-5 py-2 rounded-md bg-blue-500 text-white w-fit">글쓰기</NuxtLink>
        <NuxtLink to="/article" class="px-5 py-2 rounded-md bg-blue-500 text-white w-fit">글</NuxtLink>
        <NuxtLink to="/gallery" class="px-5 py-2 rounded-md bg-blue-500 text-white w-fit">갤러리</NuxtLink>
        <NuxtLink to="/music" class="px-5 py-2 rounded-md bg-blue-500 text-white w-fit">음악</NuxtLink>
      </div>
    </div>
    <slot />
  </div>
</template>
