<!-- <script setup lang="ts">
const email = ref('');
const password = ref('');

const { signUp } = useAuth();
const signUpWithCredentials = async () => {
  const credentials = {
    email: email.value,
    password: password.value,
  };
  try {
    await signUp(credentials);
    alert('회원가입 되었습니다.');
  } catch (error) {
    console.error(error);
  }
};
</script> -->

<template>
  <div class="w-full mt-36 flex justify-center items-center">
    <!-- <form @submit.prevent="signUpWithCredentials">
      <div class="w-96 flex flex-col space-y-4">
        <input v-model="email" type="email" placeholder="이메일" class="border rounded-md px-3 py-2" />
        <input v-model="password" type="password" placeholder="비밀번호" class="border rounded-md px-3 py-2" />
        <BasicButton type="submit" class="w-full">회원가입</BasicButton>
      </div>
    </form> -->
    지금은 회원가입을 지원하고 있지 않습니다 🥲
  </div>
</template>
