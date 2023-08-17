<template>
  <div style="display: flex;box-sizing: border-box;">
    <img src="https://heimahr.itheima.net/static/img/login_back.5ecbf4ab.png" style="width: 58.5%;height: 100vh;" alt="">
    <div style="width: 24%;height: 100vh;position: relative;box-sizing: border-box;padding: 10px;">

      <div
        style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 100%;box-sizing: border-box;margin-left: 210px;">
        <div style="font-weight: bold;font-size: 25px;margin-bottom: 40px;">
          登录
        </div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="mobile">
            <el-input placeholder="请输入手机号" v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="form.isAgree">用户平台使用协议</el-checkbox>
          </el-form-item>
          <el-form-item>
            <div @click="submitForm('form')"
              style="background-color: rgb(0, 98, 255);color: #fff;height: 45px;text-align: center;line-height: 45px;">
              登录</div>
          </el-form-item>
        </el-form>

        <div>

        </div>
        <div style="color: red;font-size: 15px;margin-top: 20px;">
          仅用于IT培训教学使用，为保障您的个人信息安全，请勿向平台录入任何个人敏感信息 (如手机号、身份证号等)!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  data() {

    const ischeckbox = (rule, value, callback) => {
      value ? callback() : callback(new Error('请勾选协议'))
    }

    return {
      form: {
        mobile: "13800000002",
        password: "hm#qd@23!",
        isAgree: true
      },
      // 表单验证
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6-12密码', trigger: 'blur' }
        ],
        isAgree: [
          { validator: ischeckbox, }
        ]
      }
    }
  },
  methods: {

    ...mapMutations('users', ['setToken']),
    ...mapActions('users', ['login']),
    // 点击事件
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 调用方法
          await this.login(this.form)
          // 判断是否有token
          if (this.$store.getters.token) {
            // 跳转到首页
            this.$router.push('/')
            this.$message.success('登录成功')
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
  },
  components: {

  },
  computed: {

  },
  filters: {

  },
  watch: {

  },
  created() {
    // console.log(this.store.getters.token);
  },
  mounted() {

  },
}
</script>

<style lang='scss' scoped></style>
