<template>
  <div class="container">
    <div class="img">
      <!-- <img src="../events/img/社团之家.png" alt width="100%" height="100px"> -->
    </div>
    <div class="events-main">
      <div class="events-assoc">
        <indexTitle title="个人信息"/>
        <div class="events">
          <el-card class="box-card-component">
            <div slot="header" class="box-card-header">
              <div class="userinfo_realName">
                <div class="title">用户名称：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="userInfo.realName"/>
                </div>
              </div>
              <div class="userinfo_headPortrait">
                <!-- <div class="title">承办社团：</div> -->
                <pan-thumb :image="userInfo.headPortrait" width="70px" height="70px">
                  <el-button
                    type="primary"
                    icon="upload"
                    size="mini"
                    @click="imagecropperShow=true"
                    class="avatar_button"
                  >换头像</el-button>
                </pan-thumb>
                <!-- 上传头像的组件 -->
                <image-cropper
                  v-show="imagecropperShow"
                  field="file"
                  :width="300"
                  :height="300"
                  :key="imagecropperKey"
                  :url="imgUrl"
                  :params="userInfo"
                  lang-type="zh"
                  @close="close"
                  @crop-upload-success="cropSuccess"
                />
              </div>
            </div>
            <div class="body">
              <div class="username" style="display:flex">
                <div class="title">登&nbsp;&nbsp;录&nbsp;&nbsp;名：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="userInfo.username"/>
                </div>
              </div>
              <div class="phone_number common" style="display:flex">
                <div class="title">电话号码：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="userInfo.phoneNumber"/>
                </div>
              </div>
              <div class="email common" style="display:flex">
                <div class="title">邮箱地址：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="userInfo.email"/>
                </div>
              </div>
              <div class="birthday common" style="display:flex">
                <div class="title">出生日期：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="userInfo.birthday | formatDate"/>
                </div>
              </div>
              <div class="registery_date common" style="display:flex">
                <div class="title">注册日期：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="userInfo.registeryDate | formatDate"/>
                </div>
              </div>
              <div class="address common" style="display:flex">
                <div class="title">住&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="userInfo.address"/>
                </div>
              </div>
              <div class="qq common" style="display:flex">
                <div class="title">q&nbsp;&nbsp;&nbsp;q&nbsp;&nbsp;&nbsp;号：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="userInfo.qq"/>
                </div>
              </div>
              <div class="class_info common" style="display:flex">
                <div class="title">班级信息：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="classInfo"/>
                </div>
              </div>
              <div class="sex common" style="display:flex">
                <div class="title">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="userInfo.sex"/>
                </div>
              </div>
              <div class="introduction common" style="display:flex">
                <div class="title">个人简介：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="userInfo.introduction"/>
                </div>
              </div>
              <div class="change_click common" style="display:flex">
                <el-button
                  class="pan-btn"
                  type="primary"
                  style="margin-top:10px;margin-left:-2px"
                  @click="changeInfo()"
                >修改个人信息</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div class="events-category">
        <div class="assoc">
          <indexTitle title="加入的社团"/>
          <div class="assoc_detail" v-for="item in userInfo.userAssocs" :key="item.assocId">
            <div class="assoc_name">
              <router-link
                tag="a"
                :to="{path:'/stu/associations/detail',query:{id:item.assocId}}"
              >{{item.assocName}}</router-link>
            </div>
            <div class="assoc_status">
              <span v-if="item.status === '审核失败'" style="color:#F56C6C">{{item.status}}</span>
              <span v-if="item.status === '待审核'" style="color:#E6A23C">{{item.status}}</span>
            </div>
            <div class="assoc_message">
              <el-button
                v-if="item.status === '审核失败'"
                type="text"
                @click="viewClick(item.message)"
              >查看原因</el-button>
              <el-button
                v-if="item.status === '审核成功'"
                type="text"
                @click="exitAssoc(item.assocId,item.assocName)"
              >退出社团</el-button>
            </div>
          </div>
        </div>
        <div class="event">
          <indexTitle title="加入的活动"/>
          <div class="assoc_detail" v-for="item in userInfo.userEvents" :key="item.id">
            <div class="assoc_name">
              <router-link
                tag="a"
                :to="{path:'/stu/events/detail',query:{id:item.eventId}}"
              >{{item.eventName}}</router-link>
            </div>
            <div class="assoc_status">
              <span v-if="item.status === '审核失败'" style="color:#F56C6C">{{item.status}}</span>
              <span v-if="item.status === '待审核'" style="color:#E6A23C">{{item.status}}</span>
            </div>
            <div class="assoc_message" v-if="item.status === '审核失败'">
              <el-button type="text" @click="viewClick(item.message)">查看原因</el-button>
            </div>
          </div>
        </div>

        <!-- <el-button class="pan-btn" type="primary" style="margin-top:10px" @change="applyIn()">申请加入</el-button>
        <el-button class="pan-btn" type="primary" style="margin-top:10px;margin-left:-2px">提交评论</el-button>-->
      </div>
    </div>
    <div class="info-list">
      <el-dialog
        title="修改个人信息"
        :visible.sync="dialogFormVisible"
        top="6vh"
        :close-on-click-modal="closeOn"
        width="60%"
      >
        <el-form :model="Data" ref="Data" :rules="Rules">
          <el-form-item>
            <div>
              <div style="border-bottom:1px dashed #ccc;margin-top:-20px;width:100%"></div>
              <div style class="line">
                <center style="z-index:999;background:white;">个人信息</center>
              </div>
            </div>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="登录名：" :label-width="formLabelWidth" prop="username">
                <el-input v-model="Data.username" class="diaInput" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="状态：" :label-width="formLabelWidth" prop="enable">
                <el-switch
                  v-model="Data.enable"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  :disabled="disabled"
                ></el-switch>
              </el-form-item>
            </el-col>-->
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Email：" :label-width="formLabelWidth" prop="email">
                <el-input
                  v-model="Data.email"
                  autocomplete="off"
                  class="diaInput"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话：" :label-width="formLabelWidth" prop="phoneNumber">
                <el-input
                  v-model="Data.phoneNumber"
                  autocomplete="off"
                  class="diaInput"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="注册时间：" :label-width="formLabelWidth" prop="registeryDate">
                <el-date-picker
                  v-model="Data.registeryDate"
                  type="date"
                  class="date-picker diaInput"
                  disabled
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="生日：" :label-width="formLabelWidth" prop="birthday">
                <el-date-picker
                  v-model="Data.birthday"
                  type="date"
                  class="date-picker diaInput"
                  :disabled="disabled"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="住址：" :label-width="formLabelWidth" prop="address">
                <el-input
                  v-model="Data.address"
                  autocomplete="off"
                  class="diaInput"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="真实姓名：" :label-width="formLabelWidth" prop="realName">
                <el-input
                  v-model="Data.realName"
                  autocomplete="off"
                  class="diaInput"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="qq号：" :label-width="formLabelWidth" prop="qq">
                <el-input
                  v-model="Data.qq"
                  autocomplete="off"
                  class="diaInput"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别：" :label-width="formLabelWidth" prop="sex">
                <el-select
                  v-model="Data.sex"
                  autocomplete="off"
                  class="diaInput"
                  :disabled="disabled"
                >
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="学院：" :label-width="formLabelWidth" prop="college">
                <el-select
                  v-model="Data.collegeId"
                  autocomplete="off"
                  class="diaInput"
                  :disabled="disabled"
                  @change="collegeChange"
                >
                  <el-option
                    v-for="college in colleges"
                    :key="college.collegeId"
                    :label="college.collegeName"
                    :value="college.collegeId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="班级：" :label-width="formLabelWidth" prop="myClass">
                <el-select
                  v-model="Data.myclassId"
                  autocomplete="off"
                  class="diaInput"
                  :disabled="disabled"
                >
                  <el-option
                    v-for="myClass in myClasses"
                    :key="myClass.classId"
                    :label="myClass.className"
                    :value="myClass.classId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="职务：" :label-width="formLabelWidth" prop="position">
                <el-input v-model="Data.position" autocomplete="off" class="diaInput" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="个人简介：" :label-width="formLabelWidth" prop="introduction">
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="Data.introduction"
                  autocomplete="off"
                  style="width:100%"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel('Data')">取消</el-button>
          <el-button type="primary" @click="submit('Data')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import indexTitle from "../utils/indexTitle";
import { parseTime } from "@/utils/index";
import { getInfo } from "@/api/login";
import Mallki from "@/components/TextHoverEffect/Mallki";
import { updateInfo } from "@/api/login";
import { Message } from "element-ui";
import PanThumb from "@/components/PanThumb";
import ImageCropper from "@/components/ImageCropper";
import { deleteUser } from "@/api/member";
import { getMyclasses } from "@/api/myclass";
import { getColleges } from "@/api/college";
import {
  checkQQ,
  checkEmail,
  checkPhone,
  checkUsername
} from "@/utils/validate";

export default {
  data() {
    return {
      disabled: false,
      formLabelWidth: "100px",
      dialogFormVisible: false,
      closeOn: false,
      imagecropperKey: 0,
      imgUrl: process.env.BASE_API + "/user/updateHeadPortrait",
      imagecropperShow: false,
      username: "",
      classInfo: "",
      colleges: [],
      myClasses: [],
      Data: {
        userId: "",
        authId: "",
        associationId: "",
        username: "",
        phoneNumber: "",
        email: "",
        birthday: "",
        headPortrait: "",
        enable: 1,
        registeryDate: "",
        address: "",
        realName: "",
        qq: "",
        college: "",
        collegeId: "",
        myClass: "",
        myclassId: "",
        sex: "",
        introduction: "",
        position: "社员"
      },
      userInfo: {
        userId: "",
        realName: "",
        phoneNumber: "",
        email: "",
        birthday: "",
        address: "",
        qq: "",
        sex: "",
        introduction: "",
        position: "",
        headPortrait: "",
        collegeId: "",
        myclassId: "",
        college: "",
        myClass: "",
        userAssocs: [],
        userEvents: []
      },
      Rules: {
        realName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 7, message: "长度在2-7个字符之间", trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, validator: checkPhone, trigger: "blur" }
        ],
        username: [
          { required: true, validator: checkUsername, trigger: "blur" }
        ],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        birthday: [
          { required: true, message: "出生日期不能为空", trigger: "blur" }
        ],
        address: [
          { required: true, message: "家庭住址不能为空", trigger: "blur" },
          { min: 2, max: 25, message: "长度在2-25个字符之间", trigger: "blur" }
        ],
        qq: [
          { required: true, validator: checkQQ, trigger: "blur" },
          ,
          { min: 2, max: 25, message: "长度在2-25个字符之间", trigger: "blur" }
        ],
        sex: [{ required: true, message: "性别不能为空", trigger: "blur" }],
        introduction: [
          { required: true, message: "简介不能为空", trigger: "blur" },
          { min: 2, max: 25, message: "长度在2-25个字符之间", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    indexTitle,
    Mallki,
    PanThumb,
    ImageCropper
  },
  //时间过滤器
  filters: {
    formatDate(time) {
      return parseTime(time, "{y}年{m}月{d}");
    }
  },
  created() {
    this.username = this.$route.query.username;
    this.getInfo();
    this.getColleges();
  },
  methods: {
    //确认修改成员信息
    submit(formname) {
      updateInfo(this.Data)
        .then(response => {
          // 修改完成后重新拉取信息
          this.getInfo();
          Message({
            message: "修改成功！",
            type: "success",
            duration: 3 * 1000
          });
        })
        .catch(error => {
          Message({
            message: "修改失败！",
            type: "error",
            duration: 3 * 1000
          });
        });
      this.dialogFormVisible = false;
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    changeInfo() {
      this.dialogFormVisible = true;
      this.Data = { ...this.userInfo };
      this.getMyclasse(this.userInfo.collegeId);
    },
    collegeChange(collegeId) {
      this.Data.myclassId = "";
      this.getMyclasse(collegeId);
    },
    // 获取指定年级的班级信息
    getMyclasse(val) {
      getMyclasses(val)
        .then(response => {
          this.myClasses = response.result;
        })
        .catch(error => {
          Message({
            message: response.message,
            type: "error",
            duration: 3 * 1000
          });
        });
    },
    // 获取所有学院信息
    getColleges() {
      getColleges()
        .then(response => {
          this.colleges = response.result;
        })
        .catch(error => {
          Message({
            message: response.message,
            type: "error",
            duration: 3 * 1000
          });
        });
    },
    exitAssoc(assocId, assocName) {
      const userId = localStorage.getItem("preUserId");
      this.$confirm("您确定退出" + assocName + "吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUser(userId, assocId)
            .then(response => {
              // 删除完成后重新拉取信息
              this.getInfo();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(error => {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    viewClick(message) {
      this.$message(message);
    },
    // 头像上传的方法
    cropSuccess(resData) {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
      this.userInfo.headPortrait = process.env.BASE_API + resData.result;
      localStorage.setItem("preAvatar", this.userInfo.headPortrait);
      Message({
        message: "头像更新成功！",
        type: "success",
        duration: 3 * 1000
      });
      this.$router.go(0);
    },
    close() {
      this.imagecropperShow = false;
    },
    getInfo() {
      getInfo(this.username)
        .then(response => {
          this.userInfo = response.result;
          this.userInfo.headPortrait =
            process.env.BASE_API + response.result.headPortrait;
          this.classInfo =
            response.result.college + " " + response.result.myClass;
        })
        .catch(error => {});
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.diaInput {
  width: 100%;
}
.change_click {
  display: flex;
  flex-direction: row-reverse;
}
.assoc_message {
  margin-left: 15px;
}
.assoc_status {
  margin-left: 15px;
  line-height: 40px;
}
.assoc_name {
  margin-left: 10px;
  line-height: 40px;
  color: #606266;
}
.assoc_detail {
  display: flex;
  margin-top: 5px;
}
.assoc {
  height: 50%;
}
.event {
  height: 50%;
}
.avatar_button {
  width: 80px;
  height: 100px;
  margin-left: -25px;
  margin-top: -35px;
}
/deep/.pan-thumb[data-v-175fbaac] {
  margin-left: -35px;
}
/deep/.pan-item[data-v-175fbaac] {
  margin-left: 420px;
}
.common {
  margin-top: 10px;
}
.content {
  margin-top: 2px;
}
.title {
  color: #606266;
}
.userinfo_realName {
  display: flex;
}
.ass_name {
  display: flex;
  margin-left: 50%;
}
.create_apply {
  margin-top: 10px;
}
.apply {
  margin-left: 12px;
  margin-top: 10px;
}
.main {
  display: flex;
}
.main_content {
  color: #303133;
}
.main_name {
  color: #3294d0;
}
.time {
  font-size: 14px;
  margin-top: 2px;
  display: flex;
  flex-direction: row-reverse;
  margin-right: 9px;
  color: #909399;
}
.page-container {
  margin-top: 30px;
  text-align: center;
  margin: auto;
}
.category {
  margin-top: 10px;
}
.pan-btn {
  height: 35px;
  line-height: 8px;
  width: 20%;
  font-size: 14px;
  color: #fff;
  padding: 14px 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  transition: 600ms ease all;
  position: relative;
  display: inline-block;
  &:hover {
    background: transparent;
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
.container {
  margin-top: 5px;
  margin-left: 5%;
  width: 90%;
  text-align: center;
}
.events-main {
  display: flex;
  height: 80%;
}
.events {
  width: 90%;
  display: flex;
  flex-wrap: wrap;
}
.events-category {
  width: 20%;
}
.events-assoc {
  //   display: flex;
  width: 80%;
}
.box-card-component {
  background: url("../events/img/背景图.png") no-repeat;
  background-size: 100% 100%;
  // background-color: #f2f6fc;
  margin-top: 20px;
  margin-left: 85px;
  width: 90%;
  height: 500px;
  .el-card__header {
    padding: 0px !important;
  }
  .box-card-header {
    display: flex;
  }
}
</style>
