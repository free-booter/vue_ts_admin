<template>
  <a-form :model="formState" name="basic" :wrapper-col="{ span: 16 }" autocomplete="off"
    @finish="onFinish" @finishFailed="onFinishFailed">
    <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
      <a-input v-model:value="formState.username" placeholder="用户名" size="large">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item name="password" :rules="[{ required: true, message: '请输入密码!' }]">
      <a-input-password v-model:value="formState.password" placeholder="密码" size="large">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{span: 16 }">
      <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit" size="large" style="width: 100%;">登录</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue';
import { reactive } from 'vue';

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>