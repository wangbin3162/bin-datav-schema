<template>
  <b-popover placement="bottom-end" width="320px" popper-class="weather-box" trigger="hover">
    <div class="global-header-trigger" flex="cross:center">
      <i :class="`qi-${current.icon}`" style="font-size: 18px" :title="current.text"></i>
    </div>
    <template #content>
      <div class="weather-content">
        <div class="city mb-5" flex="main:justify">
          <span>徐州市</span>
          <span>{{ currentDate }}</span>
        </div>
        <div class="weather-current" flex="cross:center">
          <i :class="`qi-icon qi-${current.icon}`" :title="current.text"></i>
          <div class="weather-text">
            <div class="temp">{{ current.temp }}°</div>
            <p class="weather-title">
              {{ current.text }}
              <span></span>
              {{ current.windDir }} {{ current.windScale }}级
            </p>
          </div>
          <div
            v-if="warning.typeName"
            class="warning-tag"
            :style="getWarningColor(warning.level)"
            :title="warning.text"
          >
            {{ warning.typeName }}{{ warning.level }}预警
          </div>
        </div>
        <div class="weather-air mb-5" flex="cross:center">
          空气质量指数
          <div class="air-tag" :style="getAirColor(air.aqi)">
            <i class="b-iconfont b-icon-cloud" style="font-size: 14px"></i>
            &nbsp;
            <span>{{ air.category }}</span>
            &nbsp;
            <span>{{ air.aqi }}</span>
            &nbsp;
          </div>
          PM2.5: {{ air.pm2p5 }}
        </div>
        <div class="weather-desc mb-5">
          <div v-for="(hour, index) in weather" :key="index" class="hour-item">
            <div>{{ hour.fxTime }}</div>
            <i :class="`weather-icon qi-${hour.icon}`" :title="hour.text"></i>
            <div>{{ hour.temp }}℃</div>
          </div>
        </div>
        <div class="weather-daily" v-if="daily.length > 0">
          <div v-for="(day, index) in daily" :key="index" class="daily-item">
            <div>{{ day.date }}</div>
            <div class="pl-20" flex="cross:center">
              <i :class="`weather-icon qi-${day.icon}`" style="font-size: 20px"></i>
              <div class="ml-8">{{ day.text }}</div>
            </div>
            <div class="t-right">{{ day.temp }}</div>
          </div>
        </div>
      </div>
    </template>
  </b-popover>
</template>

<script>
import { Utils } from 'bin-ui-next'
import axios from 'axios'
import { computed, ref } from 'vue'

const KEY = '9ff1ccd697f149429674a860034faf66'
const LOCATION = '101190801'
const PARAMS = { location: LOCATION, key: KEY }

/**
 * 天气组件采用新的和风天气api，默认查询地址即为徐州市,
 * 徐州市城市location:101190801
 * 需要更换城市的自行查询，或调用地址动态查询，这里暂时固定为徐州市
 * 模糊查询地址：https://geoapi.qweather.com/v2/city/lookup?location=xuzhou&key=9ff1ccd697f149429674a860034faf66
 * 天气图标使用cdn地址，这里默认设置
 */
export default {
  name: 'Weather',
  setup() {
    const weather = ref([])
    const air = ref({
      aqi: '', // 空气质量指数
      level: '', // 空气质量指数
      category: '', // 空气质量指数级别
      primary: '', // 空气质量的主要污染物，空气质量为优时，返回值为NA
      pm2p5: '', // PM2.5,
    })
    const daily = ref([]) // 3天预报 tempMax,tempMin,iconDay,textDay
    const warning = ref({})
    const current = computed(() => weather.value[0] || {})

    // 初始化城市及天气信息
    async function initData() {
      await getCityWeather()
      await getCityAir()
      await get3DayWeather()
      await getWarning()
    }

    // 获取城市Weather
    async function getCityWeather() {
      try {
        const { data } = await axios.get('https://devapi.qweather.com/v7/weather/24h', { params: PARAMS })
        const { hourly, code } = data
        if (code === '200') {
          weather.value = hourly.slice(0, 6).map(v => ({
            ...v,
            fxTime: Utils.util.parseTime(new Date(v.fxTime), '{h}:{i}'),
          }))
        }
      } catch (e) {
        console.log(e)
      }
    }

    // 获取城市空气质量
    async function getCityAir() {
      try {
        const { data } = await axios.get('https://devapi.qweather.com/v7/air/now', { params: PARAMS })
        const { now, code } = data
        if (code === '200') {
          air.value = { ...now }
        }
      } catch (e) {
        console.log(e)
      }
    }

    // 三天天气预报
    async function get3DayWeather() {
      try {
        const { data } = await axios.get('https://devapi.qweather.com/v7/weather/3d', { params: PARAMS })
        if (data.code === '200') {
          daily.value = data.daily.map((i, index) => ({
            date: index === 0 ? '今天' : index === 1 ? '明天' : Utils.util.parseTime(i.fxDate, '周{a}'),
            icon: i.iconDay,
            text: i.textDay,
            temp: `${i.tempMin}°/${i.tempMax}°`,
          }))
        }
      } catch (e) {
        console.log(e)
      }
    }

    // 灾害预警
    async function getWarning() {
      try {
        const { data } = await axios.get('https://devapi.qweather.com/v7/warning/now', { params: PARAMS })
        if (data.code === '200' && data.warning.length > 0) {
          const warn = data.warning[0]
          if (['蓝色', '黄色', '橙色', '红色'].includes(warn.level)) {
            warning.value = { ...data.warning[0] }
          }
        }
      } catch (e) {
        console.log(e)
      }
    }

    // 获取空气质量颜色
    function getAirColor(aqi) {
      const num = +aqi
      if (num <= 50) {
        return { background: '#52c41a', color: '#fff' }
      } else if (num <= 100) {
        return { background: '#ffff00', color: '#666' }
      } else if (num <= 150) {
        return { background: '#fa8c16', color: '#fff' }
      } else if (num <= 200) {
        return { background: '#f5222d', color: '#fff' }
      } else if (num <= 300) {
        return { background: '#722ed1', color: '#fff' }
      }
      return { background: '#93141b', color: '#fff' }
    }

    // 根据预警颜色返回样式
    function getWarningColor(level) {
      if (level === '蓝色') {
        return { background: 'rgba(64,161,255,0.8)', color: '#fff' }
      } else if (level === '黄色') {
        return { background: 'rgba(255,255,0,0.8)', color: '#666' }
      } else if (level === '橙色') {
        return { background: 'rgba(251,163,69,0.8)', color: '#fff' }
      } else if (level === '红色') {
        return { background: 'rgba(247,78,87,0.8)', color: '#fff' }
      } else {
        return { background: 'transparent', color: 'rgba(255,255,255,0.7)' }
      }
    }

    initData()

    return {
      current,
      weather,
      air,
      daily,
      warning,
      getAirColor,
      getWarningColor,
      currentDate: Utils.util.parseTime(new Date(), '{y}-{m}-{d} 周{a}'),
    }
  },
}
</script>

<style lang="stylus">
@import "../../../assets/stylus/base/qweather-icons.styl"
.weather-content {
  font-size: 12px;
  .weather-desc {
    padding: 5px 0;
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, .4);
    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
    }
  }
  .weather-text {
    flex: 1;
    .temp {
      font-size: 18px;
      line-height: 24px;
    }
  }
  .weather-title {
    height: 20px;
    span {
      position: relative;
      margin: 0 4px;
      display: inline-block;
      height: 1em;
      width: 1px;
      vertical-align: middle;
      background-color: #fa8c16;
      top: -1px;
    }
  }
  .weather-current {
    > .qi-icon {
      font-size: 48px;
      color: var(--bin-color-primary);
      margin-right: 16px;
    }
  }
  .air-tag {
    display: inline-block;
    vertical-align: middle;
    margin: 0 8px;
    padding: 0 6px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    height: 18px;
    line-height: 18px;
    border-radius: 2px;
    white-space: nowrap;
  }
  .warning-tag {
    display: inline-block;
    vertical-align: middle;
    color: #fff;
    font-size: 12px;
    padding: 0 6px;
    width: 90px;
    text-align: center;
    height: 20px;
    line-height: 20px;
    border-radius: 2px;
    white-space: nowrap;
  }
  .weather-icon {
    font-size: 24px;
    color: var(--bin-color-primary);
  }
  .weather-daily {
    width: 100%;
    padding: 4px 8px;
    .daily-item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div {
        flex: 1;
      }
    }
  }
}
</style>
