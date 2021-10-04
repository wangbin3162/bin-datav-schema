<template>
  <b-popover placement="bottom" width="200px" popper-class="weather-box" trigger="hover">
    <div class="global-header-trigger">
      <img :src="weather.icon" alt="" width="24">
    </div>
    <template #content>
      <div class="weather-content">
        <p class="mb-5">{{ currentDate }}</p>
        <p class="mb-5" flex="cross:center" style="font-size: 16px">
          <img :src="weather.iconColor" alt="" width="64" class="pl-8 pr-8">
          <span>{{ weather.wea }}</span>
        </p>
        <p class="mb-5">
          <b-tag type="primary" :tag-style="{fontSize:'14px'}">{{ weather.city }}</b-tag>
          <b-tag type="info" :tag-style="{fontSize:'14px'}">{{ weather.current }}</b-tag>
        </p>
        <p class="mb-5 t-center">{{ weather.tem }}</p>
        <p class="mb-5 t-center">{{ weather.wind }}</p>
        <p>
          <span>空气指数：</span>
          <b-tag :tag-style="{backgroundColor:weather.airColor,border:'none',color:'#fff'}">
            <span>{{ weather.air }}</span>&nbsp;
            <span>{{ weather.airText }}</span>
          </b-tag>
        </p>
      </div>
    </template>
  </b-popover>
</template>

<script>
import useWeather from '@/hooks/store/useWeather'

export default {
  name: 'Weather',
  setup() {
    const { weather, currentDate } = useWeather()
    return {
      weather,
      currentDate,
    }
  },
}
</script>
