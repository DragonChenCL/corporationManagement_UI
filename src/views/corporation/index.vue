<template>
  <div class="dashboard-editor-container">
    <el-card class="box-card" shadow="hover">
      <div class="clearfix">
        <pan-thumb :image="association.logo" style="float: left">
          <!-- <span
            v-for="item in ['祝','您','使','用','愉','快','!','!']"
            :key="item"
            class="pan-info-roles"
            style="color:red"
          >{{ item }}</span> -->
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
          :params="association"
          lang-type="zh"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
        <div class="info-container">
          <span class="display_name1" style="margin-top:25px">
            <span>您的社团 ：</span>
            <span class="_top">
              <mallki class-name="mallki-text" :text="association.assName"/>
            </span>
          </span>
        </div>
        <div class="self-info">
          <div class="one-line">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">社团名称 ：
                  <mallki class-name="mallki-text" :text="association.assName"/>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div class="grid-content bg-purple">社团地址 ：
                    <mallki class-name="mallki-text" :text="association.address"/>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="one-line">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">社团分类 ：
                  <mallki class-name="mallki-text" :text="association.category"/>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div class="grid-content bg-purple">创立时间 ：
                    <mallki class-name="mallki-text" :text="association.createdDate"/>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="one-line">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">创始人 ：
                  <mallki class-name="mallki-text" :text="association.founder"/>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div class="grid-content bg-purple">负责人 ：
                    <mallki class-name="mallki-text" :text="association.responsiblePerson"/>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="one-line">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">电话号码 ：
                  <mallki class-name="mallki-text" :text="association.phoneNumber"/>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div class="grid-content bg-purple">社团简介 ：
                    <mallki class-name="mallki-text" :text="association.description"/>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <el-button
        type="primary"
        icon="el-icon-edit"
        @click="dialogFormVisible = true"
        style="margin:20px 30px 100px 0px;float:right"
      >修改社团信息</el-button>
      <el-dialog
        title="社团信息"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="haha"
        top="8vh"
      >
        <el-form :model="association" ref="association" :rules="Rules">
          <el-form-item label="社团名称" :label-width="formLabelWidth" prop="assName">
            <el-input v-model="association.assName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="社团地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="association.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="社团分类" :label-width="formLabelWidth" prop="category">
            <el-select v-model="association.category" autocomplete="off">
              <el-option
                v-for="category in categorys"
                :key="category.categoryId"
                :label="category.categoryName"
                :value="category.categoryId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人" :label-width="formLabelWidth" prop="responsiblePerson">
            <el-input v-model="association.responsiblePerson" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" :label-width="formLabelWidth" prop="phoneNumber">
            <el-input v-model="association.phoneNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="社团简介" :label-width="formLabelWidth" prop="description">
            <el-input v-model="association.description" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancl('association')">取 消</el-button>
          <el-button type="primary" @click="commit('association')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PanThumb from "@/components/PanThumb";
import { Message } from "element-ui";
import Mallki from "@/components/TextHoverEffect/Mallki";
import { parseTime } from "@/utils/index";
import { getAssociationInfo } from "@/api/association";
import { getCatrgory } from "@/api/category";
import ImageCropper from '@/components/ImageCropper'

export default {
  name: "DashboardEditor",
  components: { PanThumb, Mallki,ImageCropper },
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      imgUrl:process.env.BASE_API+"/assoc/updateLogo", 
      categorys: ["categoryId", "categoryName"],
      haha: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "80px",
      logoname:{
        assocId: this.assocId
      },
      association: {
        assocId:"",
        momentImgs: "",
        address: "",
        assName: "",
        category: "",
        createdDate: "",
        description: "",
        founder: "",
        honor: "",
        logo: "",
        phoneNumber: "",
        responsiblePerson: ""
      },
      Rules: {
        assName: [
          { required: true, message: "请输入社团名称", trigger: "blur" },
          { min: 2, max: 7, message: "长度在2-7个字符之间", trigger: "blur" }
        ],
        responsiblePerson: [
          { required: true, message: "请输入负责人名称", trigger: "blur" },
          { min: 2, max: 7, message: "长度在2-7个字符之间", trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, validator: checkPhone, trigger: "blur" }
        ],
        description: [
          { required: true, message: "简介不能为空", trigger: "blur" },
          { min: 2, max: 25, message: "长度在2-25个字符之间", trigger: "blur" }
        ],
        category: [
          { required: true, message: "分类不能为空", trigger: "blur" }
        ],
        address: [
          { required: true, message: "地址不能为空", trigger: "blur" },
          { min: 2, max: 25, message: "长度在2-25个字符之间", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.GetAssociationInfo();
    this.GetCategorys();
  },
  computed: {
    ...mapGetters(["assocId"])
  },
  methods: {
     // 头像上传的方法
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.association.logo = process.env.BASE_API+ resData.result;
      Message({
            message: "logo更新成功！",
            type: "success",
            duration: 3 * 1000
          });
    },
    close() {
      this.imagecropperShow = false
    },
    commit(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          // this.$store
          //   .dispatch("UpdateInfo", this.PeronForm)
          //   .then(res => {
          //     this.dialogFormVisible = false;
          //     this.PeronForm.birthday = parseTime(this.PeronForm.birthday, "{y}-{m}-{d}");
          //     Message({
          //       message: "用户信息更新成功！",
          //       type: "success",
          //       duration: 3 * 1000
          //     });
          //   })
          //   .catch(err => {
          //     Message({
          //       message: "用户信息更新失败！",
          //       type: "error",
          //       duration: 3 * 1000
          //     });
          //   });
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
    GetAssociationInfo() {
      getAssociationInfo(this.assocId)
        .then(response => {
          this.association = response.result;
          this.association.logo = process.env.BASE_API + this.association.logo;
          this.association.assocId = response.result.associationId;
          this.association.createdDate = parseTime(
            response.result.createdDate,
            "{y}-{m}-{d}"
          );
        })
        .catch(error => {
          Message({
            message: "社团信息获取失败！",
            type: "error",
            duration: 3 * 1000
          });
        });
    },
    GetCategorys() {
      getCatrgory()
        .then(response => {
          this.categorys = response.result;
        })
        .catch(error => {
          Message({
            message: "社团分类获取失败！",
            type: "error",
            duration: 3 * 1000
          });
        });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
