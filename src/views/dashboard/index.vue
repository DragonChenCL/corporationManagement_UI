<template>
  <div class="dashboard-editor-container">
    <el-card class="box-card" shadow="hover">
<div class="clearfix">
      <pan-thumb :image="avatar" style="float: left">
        你的职位是:
        <span
          v-for="item in roles"
          :key="item"
          class="pan-info-roles"
          style="color:red"
        >{{ item }}</span>
      </pan-thumb>
      <div class="info-container">
        <span class="display_name1" style="margin-top:25px">
          欢迎您 ：
          <span class="_top">
            <mallki class-name="mallki-text" :text="realname"/>
          </span>
        </span>
      </div>
      <div class="self-info">
        <div class="one-line">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">用户名 ：
                  <mallki class-name="mallki-text" :text="realname"/>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <div class="grid-content bg-purple">电话号码 ：
                  <mallki class-name="mallki-text" :text="phoneNumber"/>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="one-line">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">所属社团 ：
                  <mallki class-name="mallki-text" :text="association"/>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <div class="grid-content bg-purple">email ：
                  <mallki class-name="mallki-text" :text="email"/>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="one-line">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">出生日期 ：
                  <mallki class-name="mallki-text" :text="birthday"/>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <div class="grid-content bg-purple">家庭住址 ：
                  <mallki class-name="mallki-text" :text="address"/>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="one-line">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">qq号 ：
                  <mallki class-name="mallki-text" :text="qq"/>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <div class="grid-content bg-purple">所属学院 ：
                  <mallki class-name="mallki-text" :text="college"/>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="one-line">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">我的班级 ：
                  <mallki class-name="mallki-text" :text="myClass"/>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <div class="grid-content bg-purple">性别 ：
                  <mallki class-name="mallki-text" :text="sex"/>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="one-line">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">个人简介 ：
                  <mallki class-name="mallki-text" :text="introduction"/>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <div class="grid-content bg-purple">职位 ：
                  <mallki class-name="mallki-text" :text="position"/>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    </el-card>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PanThumb from "@/components/PanThumb";
import { Message } from "element-ui";
import Mallki from "@/components/TextHoverEffect/Mallki";
import { parseTime } from "@/utils/index"

export default {
  name: "DashboardEditor",
  components: { PanThumb , Mallki},
  data() {
    return {
      realname: "" ,
      phoneNumber: "",
      association: "",
      email: "",
      birthday: "",
      address:"",
      qq:"",
      college:"",
      myClass:"",
      sex:"",
      introduction:"",
      position:""
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"])
  },
  mounted: function() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$store
        .dispatch("GetInfo")
        .then(res => {
          // 拉取用户信息
          const data = res.result;
          this.realname = data.realName;
          this.phoneNumber = data.phoneNumber;
          this.association = data.association;
          this.email = data.email;
          this.birthday = parseTime(data.birthday,'{y}-{m}-{d}');
          this.address = data.address;
          this.qq = data.qq;
          this.college = data.college;
          this.myClass = data.myClass;
          this.sex = data.sex;
          this.introduction = data.introduction;
          this.position = data.position;

        })
        .catch(err => {
          Message({
            message: "用户信息获取失败！",
            type: "error",
            duration: 3 * 1000
          });
        });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
._top{
  margin-top: 20px
}
.display_name1 {
  font-size: 35px;
}
.self-info {
  margin-top: 30px;
  line-height: 3;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.emptyGif {
  display: block;
  width: 45%;
  margin: 0 auto;
}

.dashboard-editor-container {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  background-color: #e3e3e3;
  min-height: 100vh;
  padding: 50px 60px 0px;
  color: #606266;
  .pan-info-roles {
    font-size: 12px;
    font-weight: 700;
    color: #333;
    display: block;
  }
  .info-container {
    position: relative;
    margin-left: 600px;
    height: 150px;
    line-height: 200px;
    .display_name {
      font-size: 48px;
      line-height: 48px;
      color: #212121;
      position: absolute;
      top: 25px;
    }
  }
}
</style>
