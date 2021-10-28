<template>
  <div class="page-login">
    <!--背景-->
    <div class="layer area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <!--登录框-->
    <div class="layer">
      <div class="content" flex="dir:top main:center cross:center">
        <div class="main" flex="dir:top main:center cross:center">
          <!-- logo -->
          <div class="page-login--logo">
            <img src="@/assets/images/logo/logo.png" alt="logo">
            <span>{{ $store.state.app.projectName }}</span>
          </div>
          <!-- 表单 -->
          <div class="form">
            <b-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin" size="large">
              <b-form-item prop="username">
                <b-input
                  type="text"
                  v-model="formLogin.username"
                  placeholder="用户名[admin,wang]"
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
                  placeholder="密码[admin,123456]"
                  @keydown.enter="submit"
                >
                  <template #prefix>
                    <b-icon name="lock" size="16"></b-icon>
                  </template>
                </b-input>
              </b-form-item>
              <b-form-item prop="captcha">
                <b-input
                  type="text"
                  v-model="formLogin.captcha"
                  placeholder="- - - -"
                  style="width: 68%;"
                  @keydown.enter="submit"
                >
                  <template #prefix>
                    <b-icon name="bulb" size="16"></b-icon>
                  </template>
                </b-input>
                <span class="login-code"><img src="@/assets/images/login-code.png" alt="code"></span>
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

<script>
import { login } from '@/api/modules/login.api'
import { throwError } from '@/utils/util'

export default {
  name: 'Login',
  data() {
    return {
      // 表单
      formLogin: {
        username: 'admin',
        password: 'admin',
        captcha: 'v9am',
      },
      loading: false,
      // 校验
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
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
  background-color: #F0F2F5;
  height: 100vh;
  position: relative;
  background-image: url('@/assets/images/login-background.svg');
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: auto;
  }

  .area {
    overflow: hidden;
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
        width: 340px;
        height: 70px;
        margin-bottom: 1em;
        margin-top: -1em;
        img {
          width: 48px;
        }
        span {
          padding-left: 12px;
          font-size: 32px;
          font-weight: bold;
        }
      }
      .form {
        width: 340px;
        box-sizing: border-box;
        .button-login {
          width: 100%;
        }
        .login-code {
          display: inline-block;
          vertical-align: middle;
          width: 30%;
          height: 36px;
          text-align: right;
          img {
            height: 100%;
          }
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
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #FFF;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }

      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }

      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }

      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }

      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }

      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }

      &:nth-child(6) {
        left: 75%;
        width: 90px;
        height: 90px;
        animation-delay: 3s;
      }

      &:nth-child(7) {
        left: 35%;
        width: 65px;
        height: 65px;
        animation-delay: 7s;
      }

      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }

      &:nth-child(9) {
        left: 20%;
        width: 35px;
        height: 35px;
        animation-delay: 2s;
        animation-duration: 35s;
      }

      &:nth-child(10) {
        left: 85%;
        width: 70px;
        height: 70px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>
