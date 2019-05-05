<template>
  <div class="container">
    <div class="img">
      <!-- <img src="../assoc/img/社团之家.png" alt width="100%" height="100px"> -->
    </div>
    <div class="assoc-main">
      <div class="assoc-assoc">
        <indexTitle title="社团详情"/>
        <div class="assoc">
          <el-card class="box-card-component">
            <div slot="header" class="box-card-header">
              <div class="assoc_name">
                <div class="title">社团名称：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="assocDetail.assName"/>
                </div>
              </div>
              <div class="assoc_logo">
                <!-- <div class="title">承办社团：</div> -->
                <div class="content">
                  <img class="img" :src="assocDetail.logo" alt>
                </div>
              </div>
            </div>
            <div class="body">
              <div class="created_date" style="display:flex">
                <div class="title">成立时间：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="assocDetail.createdDate"/>
                </div>
              </div>
              <div class="responsible_person common" style="display:flex">
                <div class="title">社&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;长：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="assocDetail.responsiblePerson"/>
                </div>
              </div>
              <div class="assoc_category common" style="display:flex">
                <div class="title">所属分类：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="assocDetail.category"/>
                </div>
              </div>
              <div class="assoc_address common" style="display:flex">
                <div class="title">社团地址：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="assocDetail.address"/>
                </div>
              </div>
              <div class="phone_number common" style="display:flex">
                <div class="title">联系方式：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="assocDetail.phoneNumber"/>
                </div>
              </div>
              <div class="description common" style="display:flex">
                <div class="title">社团简介：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="assocDetail.description"/>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div class="assoc-category">
        <indexTitle title="操作"/>
        <el-button class="pan-btn" type="primary" style="margin-top:10px" @click="applyIn()">申请加入</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import indexTitle from "../utils/indexTitle";
import { parseTime } from "@/utils/index";
import { findApplys } from "@/api/apply";
import { getAssociationInfo } from "@/api/association";
import { applyAssoc } from "@/api/member";
import Mallki from "@/components/TextHoverEffect/Mallki";
import { Message } from "element-ui";

export default {
  data() {
    return {
      applyForm: {
        userId: "",
        eventId: "",
        applyDate: "",
        // 内容
        status: ""
      },
      assocId: "",
      assocDetail: {
        associationId: "",
        category: "",
        assName: "",
        founder: "",
        responsiblePerson: "",
        createdDate: "",
        description: "",
        phoneNumber: "",
        honors: [],
        logo: "",
        address: "",
        momentImg: ""
      },
      applys: [],
      //评论搜索条件
      searchCondition: {
        currentPage: 1,
        pageSize: 100,
        eventName: ""
      }
    };
  },
  components: {
    indexTitle,
    Mallki
  },
  //时间过滤器
  filters: {
    formatDate(time) {
      return parseTime(time, "{y}/{m}/{d}");
    }
  },
  created() {
    this.assocId = this.$route.query.id;
    this.getAssociationInfo();
  },
  methods: {
    applyIn() {
      const userId = localStorage.getItem("preUserId");
      if (userId === "" || userId === null) {
        this.$message({
          type: "error",
          message: "您尚未登录!"
        });
      } else {
        applyAssoc(userId, this.assocId)
          .then(response => {
            this.$message({
              type: "success",
              message: response.message
            });
          })
          .catch(error => {
             this.$message({
              type: "error",
              message: "申请失败"
            });
          });
      }
    },
    getAssociationInfo() {
      getAssociationInfo(this.$route.query.id)
        .then(res => {
          this.assocDetail = { ...res.result };
          this.assocDetail.logo = process.env.BASE_API + this.assocDetail.logo;
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "获取社团信息失败!"
          });
        });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.img {
  width: 60px;
  height: 60px;
  margin-top: -10px;
  margin-left: 70px;
}
.common {
  margin-top: 20px;
}
.content {
  margin-top: 2px;
}
.title {
  color: #606266;
}
.assoc_name {
  margin-top: 15px;
  display: flex;
}
.assoc_logo {
  display: flex;
  margin-left: 53%;
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
  line-height: 10px;
  width: 90%;
  font-size: 14px;
  color: #fff;
  padding: 14px 36px;
  border-radius: 8px;
  border: none;
  outline: none;
  transition: 600ms ease all;
  position: relative;
  display: inline-block;
  &:hover {
    background: #fff;
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
.assoc-main {
  display: flex;
  height: 80%;
}
.assoc {
  width: 90%;
  display: flex;
  flex-wrap: wrap;
}
.assoc-category {
  width: 20%;
}
.assoc-assoc {
  //   display: flex;
  width: 80%;
}
.box-card-component {
  background: url("../associations/img/背景图.png") no-repeat;
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
