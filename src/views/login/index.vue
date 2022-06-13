<template>
  <div class="login">
    <el-form
      class="login-form"
      label-position="top"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
        class="login-btn"
        type="primary"
        :loading="isLoginLoading"
        @click="onSubmit"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'
import qs from 'qs'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      isLoginLoading: false
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 1.表单验证
        await (this.$refs.form as Form).validate()

        // 登录按钮loading
        this.isLoginLoading = true

        // 2. 验证通过，提交表单
        const { data } = await login(this.form)
        console.log(data)
        // 3.处理请求结果
        //  失败：给出提示
        if (data.state === 1) {
          // 1.登录成功，记录登录状态，状态需要能够全局访问（放到Vuex容器中）
          this.$store.commit('setUser', data.content)
          // 2.然后再访问需要登录的页面的时候，判断有没有登录状态（路由拦截器）
          // 成功：跳转到首页
          this.$router.push(this.$route.query.redirect as string || '/')
          // this.$router.push({
          //   name: 'home'
          // })
          this.$message.success('登录成功')
        } else {
          this.$message.error(data.message)
        }
      } catch (error) {
        console.log('失败!', error)
      }
      // 登录结束按钮loading
      this.isLoginLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-form{
    width: 300px;
    background: #ffffff;
    padding: 20px;
    border-radius: 5px;
  }
  .login-btn{
    width: 100%;
  }
}
</style>
