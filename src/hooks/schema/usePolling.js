import { onUnmounted, watch } from 'vue'

// 轮询封装
function polling(callback, interval = 1000, immediately = false) {
  if (immediately) {
    callback()
  }

  const intervalId = setInterval(() => {
    callback()
  }, interval)

  return () => clearInterval(intervalId)
}

export function usePolling(callback, dataCfg) {
  let clearFun = null

  onUnmounted(() => {
    if (clearFun) {
      clearFun()
    }
  })

  watch(
    () => dataCfg.polling,
    val => {
      if (val) {
        clearFun = polling(callback, dataCfg.pollingInterval, dataCfg.immediately)
      } else {
        if (clearFun) {
          clearFun()
        }
      }
    },
    {
      immediate: true,
    },
  )
}
