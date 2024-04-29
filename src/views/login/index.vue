<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <h1 class="brand-info__text"><b>毕业设计答辩系统</b></h1>
          <p class="brand-info__intro">祝您毕业顺利</p>
        </div>
        <div class="login-main">
          <h1 class="login-title" style="margin-bottom: 10%">WELCONE</h1>
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
          >
            <el-form-item prop="account">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="account"
                v-model="loginForm.account"
                placeholder="账号"
                name="account"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="密码"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>

            <div
              class="user-type"
              id="user-type"
              style="width: 90%; margin-bottom: 30px"
            >
              <el-radio-group v-model="loginForm.type">
                <el-radio label="Student">学生</el-radio>
                <el-radio label="Teacher">教师</el-radio>
                <el-radio label="Admin">管理员</el-radio>
              </el-radio-group>
            </div>

            <el-button
              :loading="loading"
              type="primary"
              style="width: 100%; margin-bottom: 20px"
              @click.native.prevent="handleLogin"
              ><b>登录</b></el-button
            >
          </el-form>
          <router-link to="/register">
            <el-button :loading="loading" type="info" plain style="width: 100%"
              ><b>注册</b></el-button
            >
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        account: "admin",
        password: "123456",
        type: "Student",
      },
      loginRules: {
        account: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        type: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },

      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        console.log(this.loginForm);
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleRegister() {
      console.log("注册");
    },
  },
};
</script>

<style lang="scss">
.site-wrapper.site-page--login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(38, 50, 56, 0.6);
  overflow: hidden;
  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: "";
    background-image: url(~@/assets/qlu.jpg);
    background-size: cover;
  }
  .site-content__wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: transparent;
  }
  .site-content {
    min-height: 100%;
    padding: 30px 500px 30px 30px;
  }
  .brand-info {
    margin: 150px 100px 0 90px;
    color: #fff;
  }
  .brand-info__text {
    margin: 0 0 22px 0;
    font-size: 48px;
    font-weight: 400;
    text-transform: uppercase;
  }
  .brand-info__intro {
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.58;
    opacity: 0.6;
  }
  .login-main {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10% 60px;
    width: 450px;
    min-height: 100%;
    opacity: 0.9;
    background-color: #fff;

    .el-input {
      display: inline-block;
      height: 45px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: black;
        height: 45px;
        caret-color: black;
      }
    }
    .el-form-item {
      border: 1px solid rgba(0, 0, 0, 0.692);
      border-radius: 4px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      cursor: pointer;
      user-select: none;
    }
  }

  .login-btn-submit {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
