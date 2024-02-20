<template>
  <div class="page-login">
    <background-particles />
    <!--登录框-->
    <div class="layer">
      <div class="content" flex="dir:top main:center cross:center">
        <div class="main" flex="dir:top main:center cross:center">
          <!-- logo -->
          <div class="page-login--logo">
            <img src="@/assets/images/logo.png" alt="logo" />
            <span class="title">{{ title }}</span>
          </div>
          <!-- 表单 -->
          <div class="form">
            <b-form ref="loginFormRef" label-position="top" :rules="rules" :model="formLogin">
              <b-form-item prop="username">
                <b-input
                  type="text"
                  v-model="formLogin.username"
                  placeholder="用户名"
                  size="large"
                  @keydown.enter="submit"
                >
                  <template #prefix>
                    <b-icon name="user" size="16"></b-icon>
                  </template>
                </b-input>
              </b-form-item>
              <b-form-item prop="password">
                <b-input
                  type="password"
                  v-model="formLogin.password"
                  placeholder="密码"
                  size="large"
                  @keydown.enter="submit"
                >
                  <template #prefix>
                    <b-icon name="lock" size="16"></b-icon>
                  </template>
                </b-input>
              </b-form-item>
              <b-form-item prop="verycode">
                <div flex="main:justify cross:center">
                  <b-input
                    type="text"
                    v-model="formLogin.verycode"
                    size="large"
                    style="width: 70%"
                    @keydown.enter="submit"
                  >
                    <template #prefix>
                      <b-icon name="code" size="16"></b-icon>
                    </template>
                  </b-input>
                  <img
                    class="login-code"
                    @click="refreshVerifyCode()"
                    title="刷新"
                    :src="verifyCodeUrl"
                    alt="verycode"
                  />
                </div>
              </b-form-item>
              <b-button
                @click="submit"
                :loading="loading"
                type="primary"
                class="button-login"
                size="large"
              >
                登录
              </b-button>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getVerifyCode, login } from '@/api/modules/login.api'
import { throwError } from '@/utils/util'
import { defineAsyncComponent } from 'vue'
import { useUserStoreWithOut } from '@/store/modules/user'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import config from '../../../package.json'

defineOptions({
  name: 'Login',
})

const BackgroundParticles = defineAsyncComponent(() =>
  import('@/components/Common/BackgroundParticles/index.vue'),
)

const formLogin = ref({
  username: '',
  password: '',
  verycode: '',
  uuid: '',
})

const loading = ref(false)
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  verycode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
}

const verifyCodeUrl = ref('')

const userStore = useUserStoreWithOut()
const router = useRouter()
const route = useRoute()
const loginFormRef = ref(null)
const title = ref(config.description)

refreshVerifyCode()

// 刷新验证码
async function refreshVerifyCode() {
  try {
    const { img, uuid } = await getVerifyCode()
    verifyCodeUrl.value = 'data:image/png;base64,' + img
    formLogin.value.verycode = ''
    formLogin.value.uuid = uuid
  } catch (e) {
    throwError('login/getVerifyCode', e)
  }
}

// 提交登录信息
async function submit() {
  loginFormRef.value.validate(async valid => {
    if (valid) {
      try {
        loading.value = true
        const { data } = await login(formLogin.value)
        await loginSuccess(data)
      } catch (e) {
        throwError('login/requestFailed', e)
      }
      loading.value = false
    }
  })
}
async function loginSuccess(data) {
  if (data.code === '00') {
    const {
      data: { accessToken: token, refreshToken, expiresIn: expires },
    } = data
    await userStore.setToken({ token, refreshToken, expires })
    // 重定向对象不存在则返回顶层路径
    const redirect = route.query.redirect || '/'
    router.push({ path: redirect })
  } else {
    throwError('login/requestFailed', data)
  }
}
</script>

<style scoped>
.page-login {
  user-select: none;
  height: 100vh;
  background-image: url('@/assets/images/bg.png');
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: auto;
  }

  .content {
    height: 100%;
    min-height: 500px;

    .main {
      padding: 40px;
      border-radius: 8px;
      border: 1px solid var(--s-border-color);
      box-shadow: 0 0 20px 5px rgba(40, 40, 40, 0.3);
      backdrop-filter: blur(20px);
      background-color: rgba(35, 35, 36, 0.2);
      .page-login--logo {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 360px;
        height: 70px;
        margin-bottom: 1em;
        margin-top: -1em;
        > img {
          width: 48px;
        }
        .title {
          font-family: YouSheBiaoTiHei, PingFangSC-Medium, PingFang SC, Microsoft YaHei, Arial;
          padding-left: 8px;
          font-size: 34px;
          color: var(--s-text-color-1);
        }
      }
      .form {
        width: 340px;
        box-sizing: border-box;
        .button-login {
          width: 100%;
        }
        .login-code {
          cursor: pointer;
          width: 100px;
          height: 36px;
          text-align: right;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background-color: rgba(255, 255, 255, 0.3);
          img {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
