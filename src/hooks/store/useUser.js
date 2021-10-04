import { useStore } from 'vuex'
import { computed } from 'vue'
import dayjs from 'dayjs'

export default function useUser() {
  const $store = useStore()
  const userInfo = computed(() => $store.state.user.userInfo)
  const welcomeTitle = computed(() => {
    const hour = dayjs().hour()
    return `${hour < 12 ? '上午好' : (hour < 18 ? '下午好' : '晚上好')}，${userInfo.value.realName}`
  })
  const currentDate = computed(() => dayjs().format('YYYY-MM-DD'))
  return {
    userInfo,
    welcomeTitle,
    currentDate,
  }
}
