<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center p-4">
    <!-- Header -->
    <section class="max-w-md w-full mb-6 text-center">
      <h1 class="text-2xl font-bold mb-2">최고의 똥쟁이를 찾아라!</h1>
      <p class="text-base text-gray-700">
        SIPE 4기 멤버들이 들려주는 아찔한 실수 경험담!
        어떤 실수가 베스트인지, 최고의 똥쟁이(!)에게 투표해주세요!
      </p>
    </section>

    <!-- Story Cards -->
    <section class="max-w-md w-full space-y-4">
      <div v-for="story in stories" :key="story.id" class="bg-white rounded-lg shadow p-4">
        <h2 class="text-lg font-semibold mb-2">{{ story.title }}</h2>
        <p class="text-sm text-gray-600 mb-4">{{ story.content }}</p>
        <a href="https://app.sli.do/event/izF1vnfFjfjjMdkfVTLAQX" target="_blank" rel="noopener noreferrer"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-center block transition transform duration-75 active:scale-95 active:bg-blue-700">
          투표하기
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Story {
  id: string
  title: string
  content: string
}

definePageMeta({
  layout: false,
})

// 동아리 운영진용 가상 스토리 데이터
const stories = ref<Story[]>([
  {
    id: 'story1',
    title: '삭제는 빠르게, 백업은 나중에',
    content:
      '배포 자동화 스크립트를 손보다가 실수로 운영 서버의 로그 디렉토리를 통째로 삭제! "어차피 S3에 있으니까~" 했는데... 백업 설정이 꺼져 있었던 거, 알고 계셨나요?',
  },
  {
    id: 'story2',
    title: 'localhost:3000, 전 세계 개방 사건',
    content:
      '내 PC에서만 보이던 프론트엔드가 EC2에서도 떠서 좋았던 나. 근데 0.0.0.0으로 바꿨다는 걸 깜빡하고 보안그룹도 허술하게 열어둬서, 어느 날 갑자기 외부에서 API 호출이 우르르...',
  },
  {
    id: 'story3',
    title: '메일 제목: "테스트", 수신자: 전체 고객',
    content:
      '이메일 발송 테스트 중이었는데, 실서버의 고객 DB를 대상으로 잘못 눌러버림... 제목은 "테스트", 내용은 "테스트"... 팀장님 얼굴이 더 테스트되고 있었어요.',
  },
  {
    id: 'story4',
    title: 'PR 승인을 본인이!',
    content:
      '“이거 그냥 빨리 머지해도 되겠죠?”라고 생각한 나는 내 PR에 내가 승인하고 바로 머지. 리뷰 프로세스는 어디로... CTO님한테 리뷰에 대한 교육을 한 시간 동안 들었습니다.',
  },
  {
    id: 'story5',
    title: '실시간 에러 알림으로 팀 전체가 덜덜',
    content:
      '버그 하나 고친다는 게 배포 후 에러가 줄줄이 발생... Sentry 슬랙 연동 덕분에 알림이 1초마다 하나씩... “누가 배포했어?”라는 말에 제 손이 먼저 올라갔습니다.',
  },
])
</script>
