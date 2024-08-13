<template>
  <div class="login-page">
    <div class="login-header flex">
      <div class="login-header__logo">
        <img src="../../assets/svg/logo.svg" />
        <span>Vue Admin</span>
      </div>
      <div class="login-header__operation">
        <!-- 主题切换 -->
        <AppDarkModeToggle />
      </div>
    </div>
    <div class="login-container">
      <img src="../../assets/svg/login-box-bg.svg" alt="">
      <div class="login-form">
        <LoginForm></LoginForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppDarkModeToggle from '@/components/Application/src/AppDarkModeToggle.vue';
import LoginForm from './LoginForm.vue'
</script>
<style scoped lang="scss">
$dark-bg: #293146;

html[data-theme='dark'] {
  .login-page {
    &::before {
      background: url('../../assets/svg/login-bg-dark.svg') no-repeat 100%;
      transform: translateX(-48%);
      background-size: auto 100%;
    }
  }
}

.login-page {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;

  &::before {
    position: absolute;
    left: 0;
    top: 0;
    content: "";
    width: 100%;
    height: 100%;
    transform: translateX(-48%);
    background: url('../../assets/svg/login-bg.svg') no-repeat 100%;
    background-size: auto 100%;
    z-index: -1;
  }

  .login-header {
    margin: 0 auto;
    margin-left: 20%;

    &__logo {
      display: flex;
      align-items: center;
      color: #fff;

      img {
        width: 60px;
        height: auto;
        margin-right: 30px;
      }

      span {
        font-size: 40px;
        font-weight: bold;
      }
    }

    &__operation {
      width: 200px;
      height: 100px;
      margin-left: auto;
      padding-top: 20px;
      box-sizing: border-box;
    }
  }

  .login-container {
    display: flex;
    justify-content: center;
    margin-top: 10%;
    box-sizing: border-box;

    img {
      width: 35%;
      pointer-events: none;
      /* transform: translateX(-40%); */
    }

    .login-form {
      width: 40%;
      margin-left: 10%;
      /* margin-left: auto; */
    }
  }
}
</style>