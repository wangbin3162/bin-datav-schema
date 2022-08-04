import { useStore } from '@/pinia'

export default function useApp() {
  const { globalStore, storeToRefs } = useStore()
  const { weather } = storeToRefs(globalStore)

  function setWeather(wea) {
    weather.value = wea
  }

  return {
    weather,
    setWeather,
  }
}
