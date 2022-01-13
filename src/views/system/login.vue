<template>
  <div class="page-login">
    <background-particles />
    <!--登录框-->
    <div class="layer">
      <div class="content" flex="dir:top main:center cross:center">
        <div class="main" flex="dir:top main:center cross:center">
          <!-- logo -->
          <div class="page-login--logo">
            <img src="@/assets/images/logo/logo.png" alt="logo" />
            <span>{{ title }}</span>
          </div>
          <!-- 表单 -->
          <div class="form">
            <b-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin">
              <b-form-item prop="username">
                <b-input
                  type="text"
                  v-model="formLogin.username"
                  placeholder="测试用户名：admin"
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
                  placeholder="测试密码：123456"
                  size="large"
                  @keydown.enter="submit"
                >
                  <template #prefix>
                    <b-icon name="lock" size="16"></b-icon>
                  </template>
                </b-input>
              </b-form-item>
              <!--              <b-form-item prop="verycode">-->
              <!--                <div flex="main:justify cross:center">-->
              <!--                  <b-input-->
              <!--                    type="text"-->
              <!--                    v-model="formLogin.verycode"-->
              <!--                    size="large"-->
              <!--                    style="width: 73%;"-->
              <!--                    @keydown.enter="submit"-->
              <!--                  >-->
              <!--                    <template #prefix>-->
              <!--                      <b-icon name="code" size="16"></b-icon>-->
              <!--                    </template>-->
              <!--                  </b-input>-->
              <!--                  <span class="login-code"><img src="@/assets/images/login-code.png" alt="code"></span>-->
              <!--                </div>-->
              <!--              </b-form-item>-->
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
        <div class="footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/modules/login.api'
import { throwError } from '@/utils/util'
import { defineAsyncComponent } from 'vue'
import config from '../../../package.json'

export default {
  name: 'Login',
  components: {
    BackgroundParticles: defineAsyncComponent(() =>
      import('@/components/Common/BackgroundParticles/index.vue'),
    ),
  },
  data() {
    return {
      // 表单
      formLogin: {
        username: 'admin',
        password: '123456',
        verycode: '',
        uuid: '',
      },
      loading: false,
      // 校验
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        verycode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      title: config.description,
    }
  },
  methods: {
    // 提交登录信息
    submit() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true
            const { data } = await login(this.formLogin)
            await this.loginSuccess(data)
          } catch (e) {
            throwError('login/requestFailed', e)
          }
          this.loading = false
        }
      })
    },
    async loginSuccess(data) {
      if (data.code === '00') {
        const token = data.data.accessToken
        await this.$store.dispatch('user/setToken', token)
        // 重定向对象不存在则返回顶层路径
        const redirect = this.$route.query.redirect || '/'
        await this.$router.push({ path: redirect })
      } else {
        throwError('login/requestFailed', data)
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.page-login {
  user-select: none;
  height: 100vh;
  background-image: url("@/assets/images/bg/bg.png");
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
    .header {
      padding: 1em 0;
      .header-motto {
        margin: 0;
        padding: 0;
        color: #606266;
        text-align: center;
        font-size: 12px;
        span {
          color: #909399;
        }
      }
    }

    .main {
      .page-login--logo {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 360px;
        height: 70px;
        margin-bottom: 1em;
        margin-top: -1em;
        img {
          width: 48px;
        }
        span {
          font-family: YouSheBiaoTiHei, PingFangSC-Medium, PingFang SC, Microsoft YaHei, Arial, Helvetica, sans-serif;
          padding-left: 8px;
          font-size: 36px;
          color: #fff;
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
          width: 84px;
          height: 36px;
          text-align: right;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background-color: rgba(255, 255, 255, 0.3);
          img {
            height 100%;
          }
        }
        :deep(.bin-input) {
          background-color: transparent;
          font-size: 14px;
          padding-left: 34px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      }
    }
    .footer {
      padding: 1em 0;
      .footer-copyright {
        padding: 0;
        margin: 0;
        font-size: 12px;
        color: #606266;
        a {
          color: #6898f0;
        }
      }
    }
  }
}
</style>
