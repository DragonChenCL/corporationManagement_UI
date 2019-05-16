<template>
  <div class="container">
    <div class="img">
      <!-- <img src="../events/img/社团之家.png" alt width="100%" height="100px"> -->
    </div>
    <div class="events-main">
      <div class="events-category">
        <indexTitle title="操作"/>
        <el-button class="pan-btn" type="primary" style="margin-top:10px" @click="applyIn()">申请加入</el-button>
        <el-button class="pan-btn" type="primary" style="margin-top:10px;margin-left:-3px" @click="lookPerson()">查看人员</el-button>
        <el-button
          class="pan-btn"
          type="primary"
          style="margin-top:10px;margin-left:-2px"
          @click="createApply()"
        >提交评论</el-button>

        <el-dialog
          :title="title"
          :visible.sync="lookPersonVisible"
          top="6vh"
          :close-on-click-modal="closeOn"
          width="60%"
        >
           <el-table :data="showData" style="width: 100%" size="small" border stripe>
            <el-table-column align="center" prop="username" label="登录名"></el-table-column>
            <el-table-column align="center" prop="realName" label="真实姓名"></el-table-column>
            <el-table-column align="center" prop="college" label="学院"></el-table-column>
            <el-table-column align="center" prop="myClass" label="班级"></el-table-column>
            <el-table-column align="center" prop="position" label="职位"></el-table-column>
          </el-table>
         <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="lookPersonVisible = false">取消</el-button>
          </div>
        </el-dialog>


        <div class="apply" v-for="apply in applys" :key="apply.applyId">
          <div class="main">
            <div class="main_name">{{apply.realName}}：</div>
            <div class="main_content">{{apply.status}}</div>
          </div>
          <div class="time">{{apply.applyDate}}</div>
        </div>
        <div class="create_apply">
          <el-input v-model="applyForm.status" type="textarea" :rows="2" style="width:90%"></el-input>
        </div>
      </div>
      <div class="events-assoc">
        <indexTitle title="活动详情"/>
        <div class="events">
          <el-card class="box-card-component">
            <div slot="header" class="box-card-header">
              <div class="event_name">
                <div class="title">活动名称：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="eventDetail.eventName"/>
                </div>
              </div>
              <div class="ass_name">
                <div class="title">承办社团：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="eventDetail.assName"/>
                </div>
              </div>
            </div>
            <div class="body">
              <div class="start_date" style="display:flex">
                <div class="title">开始时间：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="eventDetail.startDate"/>
                </div>
              </div>
              <div class="end_date common" style="display:flex">
                <div class="title">结束时间：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="eventDetail.endDate"/>
                </div>
              </div>
              <div class="address common" style="display:flex">
                <div class="title">举办地点：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="eventDetail.address"/>
                </div>
              </div>
              <div class="responsible_person common" style="display:flex">
                <div class="title">负&nbsp;&nbsp;责&nbsp;&nbsp;人：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="eventDetail.responsiblePerson"/>
                </div>
              </div>
              <div class="contents common" style="display:flex">
                <div class="title">活动内容：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="eventDetail.content"/>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import indexTitle from "../utils/indexTitle";
import { parseTime } from "@/utils/index";
import { findApplys } from "@/api/apply";
import { getEventsBySys, eventDetail } from "@/api/event";
import { applyEvent } from "@/api/member";
import { createApply } from "@/api/apply";
import Mallki from "@/components/TextHoverEffect/Mallki";
import { Message } from "element-ui";
import { userApplyEvent } from "@/api/event";

export default {
  data() {
    return {
      showData:[],
      lookPersonVisible:false,
      applyForm: {
        userId: "",
        eventId: "",
        applyDate: "",
        // 内容
        status: ""
      },
      eventId: "",
      eventDetail: {
        eventId: "",
        associationId: "",
        eventName: "",
        startDate: "",
        endDate: "",
        address: "",
        content: "",
        status: "",
        responsiblePerson: "",
        assName: ""
      },
      applys: [],
      //评论搜索条件
      searchCondition: {
        currentPage: 1,
        pageSize: 100,
        eventName: "",
        status:"审核成功"
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
    this.eventId = this.$route.query.id;
    this.getEventDetail();
  },
  methods: {
    lookPerson(){
      this.showData = [],
      this.lookPersonVisible = true,
       userApplyEvent(this.searchCondition)
        .then(response => {
          this.showData = response.result.contents;
          this.total = response.result.totalElements;
        })
        .catch(error => {
          Message({
            message: "查询失败！",
            type: "error",
            duration: 3 * 1000
          });
        });
    },
    applyIn() {
      const userId = localStorage.getItem("preUserId");
      if (userId === "" || userId === null) {
        this.$message({
          type: "error",
          message: "您尚未登录!"
        });
      } else {
        const startTime = new Date(this.eventDetail.startDate).getTime();
        const now = new Date().getTime();
        if (startTime < now) {
          this.$message({
            type: "error",
            message: "报名时间已过!"
          });
        } else {
          applyEvent(userId, this.eventDetail.eventId)
            .then(response => {
              this.$message({
                type: "success",
                message: response.message
              });
            })
            .catch(error => {
              this.$message({
                type: "error",
                message: "报名失败!"
              });
            });
        }
      }
    },
    createApply() {
      const userId = localStorage.getItem("preUserId");
      if (userId === "" || userId === null) {
        this.$message({
          type: "error",
          message: "您尚未登录!"
        });
      } else {
        const startTime = new Date(this.eventDetail.startDate).getTime();
        const now = new Date().getTime();
        if (startTime > now) {
          this.$message({
            type: "error",
            message: "活动尚未开始，无法评价!"
          });
        } else {
          this.applyForm.userId = userId;
          this.applyForm.eventId = this.eventId;
          this.applyForm.applyDate = parseTime(new Date());
          createApply(this.applyForm)
            .then(response => {
              this.$message({
                type: "success",
                message: response.message
              });
              this.getEventDetail();
            })
            .catch(error => {
              this.$message({
                type: "error",
                message: "报名失败!"
              });
            });
        }
      }
    },
    compare() {},
    getEventDetail() {
      eventDetail(this.$route.query.id)
        .then(res => {
          this.eventDetail = { ...res.result };
          // 获取所有评论
          this.searchCondition.eventName = this.eventDetail.eventName;
          findApplys(this.searchCondition).then(response => {
            this.applys = [...response.result.contents];
          });
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
.common {
  margin-top: 20px;
}
.content {
  margin-top: 2px;
}
.title {
  color: #606266;
}
.event_name {
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
