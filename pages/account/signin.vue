<script setup lang="ts">
const route = useRoute();
const { status, signIn } = useAuth();
const { setToken, clearToken } = useAuthState();

const email = ref('');
const password = ref('');

if (status.value === 'authenticated') {
  navigateTo(route.query.returnurl as string ?? '/');
}
const signInWithCredentials = async () => {
  const credentials = {
    email: email.value,
    password: password.value,
  };
  try {
    const data = await signIn(credentials, { callbackUrl: route.query.returnurl as string ?? '/' });
    alert('환영합니다!');
    // TODO: Save token to some storage
  } catch (error) {
    console.error(error);
    alert('아이디나 비밀번호가 맞지 않습니다.');
  }
};
</script>

<template>
  <div class="w-full mt-36 flex justify-center items-center">
    <div class="w-96">
      <form @submit.prevent="signInWithCredentials">
        <div class="w-full flex flex-col space-y-4">
          <input v-model="email" type="email" placeholder="이메일" class="border rounded-md px-3 py-2" />
          <input v-model="password" type="password" placeholder="비밀번호" class="border rounded-md px-3 py-2" />
          <BasicButton type="submit" class="w-full mt-2">로그인</BasicButton>
        </div>
      </form>
      <div class="mt-4 text-center">
        <BasicButton href="/account/signup" class="w-full">회원가입</BasicButton>
      </div>
    </div>
  </div>
</template>
