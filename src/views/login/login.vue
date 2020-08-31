<!-- 登录 -->
<template>
  <div>
    <div class="login-wrapper">
      <div class="cen-login">
        <div class="cen-box">
          <img src="../../assets/images/logo.png" alt class="cen-logo" />
          <p class="cen-article">桃夭夭 : 吃桃子游戏</p>
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input v-model.trim="ruleForm.username" auto-complete="off" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" @keyup.native.enter="login('ruleForm')" v-model.trim="ruleForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-checkbox class="view-remember" v-model="ruleForm.checked">记住密码</el-checkbox>
          <el-form-item>
            <el-button type="primary" @click="handlelogin('ruleForm')" v-button style="width:100%;">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getLogin, webLogin } from "@/api/api";
import { loginRule } from "@/utils/valid";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        checked: false,
        infoLevel: "complex"
      },
      rules: loginRule,
      redirectUrl: ""
    };
  },
  created() {
    if (this.$route.query.redirect) {
      this.redirectUrl = this.$route.query.redirect;
    }

    let loginMessage = this.$storage.getStorage("loginMessage");
    if (loginMessage) {
      this.ruleForm = JSON.parse(loginMessage);
    }
  },
  methods: {
    handlelogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$storage.setStorage("employeeId", JSON.stringify('12121212'));
          this.$storage.setCookie("token", '121135235');
          this.$router.push("/admin/employee/male")
          let params = {
            name: 'zhangsan',
            id: '123544'
          }

          // webLogin(this.ruleForm).then(res => {
          //   if (res.code === 0) {
          //     this.$storage.setStorage("employeeId", JSON.stringify(res.data));
          //     this.$storage.setCookie("token", res.data.token);
          //     this.$message.success("恭喜，登陆成功！");
          //     setTimeout(() => {
          //       this.getChecked();
          //       this.$router.push({
          //         path: this.redirectUrl ? this.redirectUrl : "/admin/employee/male"
          //       });
          //     }, 1000);
          //   } else {
          //     this.$message.error(res.message);
          //   }
          // });
        }
      });
    },
    //记住密码
    getChecked() {
      if (this.ruleForm.checked) {
        this.$storage.setStorage("loginMessage", JSON.stringify(this.ruleForm));
      } else {
        this.ruleForm.password = "";
        this.$storage.setStorage("loginMessage", JSON.stringify(this.ruleForm));
      }
    }
  },

};
</script>
<style lang="less" scoped>
.login-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: linear-gradient(#9ebcda, #5895d3);
  background: -webkit-linear-gradient(#9ebcda, #5895d3);
  background: -o-linear-gradient(#9ebcda, #5895d3);
  background: -moz-linear-gradient(#9ebcda, #5895d3);
}

.cen-login {
  width: 800px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 60px auto;
  padding-bottom: 40px;
  position: relative;
  z-index: 9;
  margin-top: 10%;
  .cen-box {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #5895d3;
    color: #fff;
    font-size: 20px;
    text-align: center;
    padding: 10px;
    .cen-logo {
      width: 40px;
      height: 40px;
      margin-right: 20px;
      border-radius: 50%;
      border: 1px solid #fff;
    }
  }
  .demo-ruleForm {
    width: 300px;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 40px 30px;
    margin: 30px auto;
  }

  .view-remember {
    margin-bottom: 20px;
  }
}
</style>
