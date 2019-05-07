<template>
  <div class="dashboard-editor-container">
    <el-card class="box-card" shadow="hover">
      <div class="clearfix">
        <pan-thumb :image="avatar" style="float: left;">
          <!-- 你的职位是:
          <span
            v-for="item in roles"
            :key="item"
            class="pan-info-roles"
            style="color:red"
          >{{ item }}</span>-->
          <el-button
            type="primary"
            icon="upload"
            style="margin-top:35px;margin-left:-2px"
            size="mini"
            @click="imagecropperShow=true"
          >点我，更换头像</el-button>
        </pan-thumb>
        <!-- 上传头像的组件 -->
        <image-cropper
          v-show="imagecropperShow"
          field="file"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="imgUrl"
          :params="PeronForm"
          lang-type="zh"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
        <div class="info-container">
          <span class="display_name1" style="margin-top:25px">
            欢迎您 ：
            <span class="_top">
              <mallki class-name="mallki-text" :text="PeronForm.realName"/>
            </span>
          </span>
        </div>
        <div class="self-info">
          <div class="one-line">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  用户名 ：
                  <mallki class-name="mallki-text" :text="PeronForm.realName"/>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div class="grid-content bg-purple">
                    电话号码 ：
                    <mallki class-name="mallki-text" :text="PeronForm.phoneNumber"/>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="one-line">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div class="grid-content bg-purple">
                    职位 ：
                    <mallki class-name="mallki-text" :text="PeronForm.position"/>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div class="grid-content bg-purple">
                    email ：
                    <mallki class-name="mallki-text" :text="PeronForm.email"/>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="one-line">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  出生日期 ：
                  <mallki class-name="mallki-text" :text="PeronForm.birthday"/>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div class="grid-content bg-purple">
                    家庭住址 ：
                    <mallki class-name="mallki-text" :text="PeronForm.address"/>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="one-line">
            <el-row v-if="adminVisible">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  我的班级 ：
                  <mallki class-name="mallki-text" :text="PeronForm.myClass"/>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div class="grid-content bg-purple">
                    所属学院 ：
                    <mallki class-name="mallki-text" :text="PeronForm.college"/>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="one-line">
            <el-row>
               <el-col :span="12">
                <div class="grid-content bg-purple">
                  qq号 ：
                  <mallki class-name="mallki-text" :text="PeronForm.qq"/>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div class="grid-content bg-purple">
                    性别 ：
                    <mallki class-name="mallki-text" :text="PeronForm.sex"/>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="one-line">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  个人简介 ：
                  <mallki class-name="mallki-text" :text="PeronForm.introduction"/>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple" v-if="adminVisible">
                  所属社团 ：
                  <mallki class-name="mallki-text" :text="PeronForm.userAssocs[0].assocName"/>
                </div>
              </el-col>
               <el-col :span="12">
                <div class="grid-content bg-purple" v-if="!adminVisible">
                  &nbsp;
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- Form -->
      <el-button
        type="primary"
        icon="el-icon-edit"
        @click="modify()"
        style="margin:20px 30px 20px 0px;float:right"
      >修改个人信息</el-button>

      <el-dialog
        title="个人信息"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="haha"
        top="2vh"
      >
        <el-form :model="PeronForm" ref="PeronForm" :rules="Rules">
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="realName">
            <el-input v-model="PeronForm.realName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" :label-width="formLabelWidth" prop="phoneNumber">
            <el-input v-model="PeronForm.phoneNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="email" :label-width="formLabelWidth" prop="email">
            <el-input v-model="PeronForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item v-if="adminVisible" label="学院" :label-width="formLabelWidth" prop="collegeId" required>
            <el-select
              v-model="PeronForm.collegeId"
              placeholder="请选择学院"
              class="box"
              @change="collegeChange(PeronForm.collegeId)"
            >
              <el-option
                v-for="college in colleges"
                :key="college.collegeId"
                :label="college.collegeName"
                :value="college.collegeId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="adminVisible" label="班级" :label-width="formLabelWidth" prop="myclassId">
            <el-select v-model="PeronForm.myclassId" class="box"  @change="myclassChange(PeronForm.myclassId)">
              <el-option
                v-for="myClass in myClasses"
                :key="myClass.classId"
                :label="myClass.className"
                :value="myClass.classId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" :label-width="formLabelWidth" prop="birthday">
            <el-date-picker
              v-model="PeronForm.birthday"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              placeholder="选择日期"
              class="box"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="家庭住址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="PeronForm.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="qq号" :label-width="formLabelWidth" prop="qq">
            <el-input v-model="PeronForm.qq" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
            <el-select v-model="PeronForm.sex" placeholder="请选择性别" class="box">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个人简介" :label-width="formLabelWidth" prop="introduction">
            <el-input v-model="PeronForm.introduction" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancl('PeronForm')">取 消</el-button>
          <el-button type="primary" @click="commit('PeronForm')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PanThumb from "@/components/PanThumb";
import ImageCropper from "@/components/ImageCropper";
import { Message } from "element-ui";
import Mallki from "@/components/TextHoverEffect/Mallki";
import { parseTime } from "@/utils/index";
import { getMyclasses } from "@/api/myclass";
import { getColleges } from "@/api/college";
import { checkQQ, checkEmail, checkPhone } from "@/utils/validate";

export default {
  name: "DashboardEditor",
  components: { PanThumb, Mallki, ImageCropper },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      imgUrl: process.env.BASE_API + "/user/updateHeadPortrait",
      haha: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "80px",
      adminVisible:true,
      PeronForm: {
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
        college:"",
        myclass:"",
        userAssocs:[]
      },
      myClasses: [],
      colleges: [],
      Rules: {
        realName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 7, message: "长度在2-7个字符之间", trigger: "blur" }
        ],
        myclassId: [
          { required: true, message: "班级不能为空", trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, validator: checkPhone, trigger: "blur" }
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
  computed: {
    ...mapGetters(["name", "avatar", "roles"])
  },
  created: function() {
    this.getInfo();
    this.getColleges();
  },
  methods: {
    modify() {
      this.dialogFormVisible = true;
      this.getMyclasse(this.PeronForm.collegeId);
    },
    // 班级下拉框发生变化
    myclassChange(val){
 // 获取到select框的值，并且赋给所属学院
      var obj = {};
      obj = this.myClasses.find(function(myclass) {
        return myclass.classId === val;
      });
      this.PeronForm.myClass = obj.className;
    },
    // 学院下拉框发生变化
    collegeChange(val) {
      this.PeronForm.myclassId = "";
      this.getMyclasse(val);
      // 获取到select框的值，并且赋给所属学院
      var obj = {};
      obj = this.colleges.find(function(college) {
        return college.collegeId === val;
      });
      this.PeronForm.college = obj.collegeName;
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
    // 头像上传的方法
    cropSuccess(resData) {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
      this.$store.commit("SET_AVATAR", process.env.BASE_API + resData.result);
      Message({
        message: "头像更新成功！",
        type: "success",
        duration: 3 * 1000
      });
    },
    close() {
      this.imagecropperShow = false;
    },
    changeLogo() {},
    // 用户信息更新的方法
    commit(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("UpdateInfo", this.PeronForm)
            .then(res => {
              this.dialogFormVisible = false;
              this.PeronForm.birthday = parseTime(
                this.PeronForm.birthday,
                "{y}-{m}-{d}"
              );
              Message({
                message: "用户信息更新成功！",
                type: "success",
                duration: 3 * 1000
              });
            })
            .catch(err => {
              Message({
                message: "用户信息更新失败！",
                type: "error",
                duration: 3 * 1000
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancl(formname) {
      this.$refs[formname].resetFields();
      this.dialogFormVisible = false;
    },
    getInfo() {
      this.$store
        .dispatch("GetInfo")
        .then(res => {
          // 拉取用户信息
          const data = res.result;
          this.PeronForm = data;
          this.PeronForm.birthday = parseTime(data.birthday, "{y}-{m}-{d}");
          if(this.PeronForm.position == "校社联负责人"){
            this.adminVisible = false;
          }else{
            this.adminVisible = true;
          }
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
.box {
  width: 100%;
}
._top {
  margin-top: 20px;
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
