<template>
  <div>
    <img src="../components/img/苏科大.jpg" alt width="100%" style="margin-bottom:-4px">
    <el-menu
      :default-active="activ"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#ecf0f1"
      text-color="#333333"
      active-text-color="#409EFF"
      router
      @select="menuSelect"
    >
      <el-row style="text-align:center">
        <el-col :span="4">
          <img
            src="../components/img/logo.jpg"
            alt
            width="100%"
            height="56px"
            style="margin-bottom:-4px"
          >
        </el-col>
        <el-col :span="3">
          <el-menu-item index="/stu/" class="item">首页</el-menu-item>
        </el-col>
        <el-col :span="3">
          <el-menu-item index="/stu/newes" class="item">新闻</el-menu-item>
        </el-col>
        <el-col :span="3">
          <el-menu-item index="/stu/associations" class="item">社团</el-menu-item>
        </el-col>
        <el-col :span="3">
          <el-menu-item index="/stu/events" class="item">活动</el-menu-item>
        </el-col>
        <el-col :span="3">
          <el-menu-item index="/stu/about" class="item">关于</el-menu-item>
        </el-col>
        <el-col :span="3" style="text-align:right" v-if="loginButtonVisiable">
          <el-button type="primary" size="small" style="margin-top:12px" @click="loginClick">登录</el-button>
        </el-col>
          <el-dropdown class="avatar-container" trigger="click" v-if="avatarVisiable">
            <div class="avatar-wrapper" style="display:flex">
              <img :src="preAvatar" class="user-avatar">
              <div class="welcome">欢迎您：{{realName}}</div>
            </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <router-link class="inlineBlock" :to="{path:'/stu/userinfo',query:{username:username}}">
                <el-dropdown-item>个人信息</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
                <span style="display:block;" @click="logout()">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </el-row>
    </el-menu>
    <div class="info-list">
      <el-dialog
        :title="title"
        :visible.sync="loginVisiable"
        top="6vh"
        :close-on-click-modal="closeOn"
      >
        <el-form :model="loginform" class="login_form">
          <el-form-item>
            <MDinput
              style="background-color:transparent"
              v-model="loginform.username"
              :maxlength="10"
              required
              placeholder="请填写用户名"
            >用户名</MDinput>
          </el-form-item>
          <el-form-item>
            <MDinput
              style="background-color:transparent"
              v-model="loginform.password"
              type="password"
              :maxlength="15"
              required
              placeholder="请填写密码"
            >密码</MDinput>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="pan-btn" type="primary" @click="loginC()">登录</el-button>
          <el-button class="pan-btn" type="primary" @click="loginVisiable = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import MDinput from "@/components/MDinput";
import { login, getInfo } from "@/api/login";
import { Message } from "element-ui";

export default {
  data() {
    return {
      loginform: {
        username: "",
        password: ""
      },
      username:"",
      loginButtonVisiable: true,
      avatarVisiable: false,
      title: "登 录",
      closeOn: false,
      realName:"",
      preAvatar:"",
      loginVisiable: false,
      activ: "/stu/",
    };
  },
  created() {
    this.activ = localStorage.getItem("activ");
    //防止页面刷新
    if(localStorage.getItem("preName") !== null && localStorage.getItem("preToken") !== ""){
      this.getUserInfo(localStorage.getItem("preName"))
    } 
  },
  components: {},
  computed: {},
  methods: {
    logout(){
      localStorage.removeItem("preToken")
      localStorage.removeItem("preName")
      localStorage.removeItem("preAvatar")
      localStorage.removeItem("preUserId")
      this.avatarVisiable = false;
      this.loginButtonVisiable = true;
      this.activ = "/stu/"
      this.$router.push("/stu/")
    },
    getUserInfo(username){
      getInfo(username).then(response =>{
            localStorage.setItem("preName",response.result.username)
            localStorage.setItem("preUserId",response.result.userId)
            localStorage.setItem("preAvatar",process.env.BASE_API + response.result.headPortrait);
            localStorage.setItem("preRealName",response.result.realName);
            this.preAvatar = process.env.BASE_API + response.result.headPortrait;
            this.realName = response.result.realName;
            this.username = response.result.username;
            this.loginButtonVisiable = false;
            this.avatarVisiable = true;
            this.loginVisiable = false;
          }).catch(error =>{
            this.$message({
            type: "error",
            message: response.message
          });
          })
    },
    loginC() {
      login(this.loginform.username,this.loginform.password).then(response =>{
        if(response.message === "用户登录成功！"){
          //存入前端登录的token
          localStorage.setItem("preToken",response.result);
          //获取用户信息
          this.getUserInfo(this.loginform.username)
        }else{
           this.$message({
            type: "error",
            message: response.message
          });
        }
      }).then(error =>{
         this.$message({
            type: "error",
            message: response.message
          });
      })
    },
    loginClick() {
      this.loginform = {}
      this.loginVisiable = true;
    },
    menuSelect(index, indexPath) {
      localStorage.setItem("activ", index);
      this.activ = localStorage.getItem("activ");
    }
  },
  components: {
    MDinput
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.welcome{
  margin:10px 10px;
  font-size: 16px;
  color: #999999;
}
.avatar-container {
    margin-top: 4px;
    margin-right: 100px;
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 10px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
/deep/.material-input__component .material-input[data-v-6bb35d14] {
  background: none;
  color: #f56c6c;
  text-indent: 0px;
  border-bottom: 1px solid #e0e0e0;
}
/deep/.el-dialog__title {
  color: #409eff;
  font-size: 22px;
}
/deep/.el-dialog__header {
  text-align: center;
}
.dialog-footer {
  text-align: center;
}
/deep/.el-dialog__body {
  padding-top: 0px;
}
/deep/.el-form-item__content {
  height: 50px;
}
/deep/.el-dialog {
  width: 500px;
  height: 300px;
  background: url("../components/img/login_back.gif") no-repeat;
  background-size: 100% 100%;
}
.item {
  font-size: 20px;
  // font-weight: 500;
}
.pan-btn {
  height: 35px;
  line-height: 10px;
  width: 15%;
  font-size: 14px;
  color: #fff;
  // padding: 14px 36px;
  border-radius: 8px;
  border: none;
  outline: none;
  transition: 600ms ease all;
  position: relative;
  display: inline-block;
  &:hover {
    background-color: transparent;
    // background: #fff;
    color: #409eff;
    &:before,
    &:after {
      width: 100%;
      transition: 600ms ease all;
    }
  }
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    transition: 400ms ease all;
  }
  &::after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }
}
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
<style>
</style>




