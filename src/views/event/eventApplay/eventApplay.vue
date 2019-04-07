<template>
  <div class="attachment-container">
    <el-card class="box-card" shadow="hover">
      <title-box titleValue="活动管理-人员申请"></title-box>
      <div class="base-attachment-container">
        <div class="form-container">
          <el-form :model="searchConditions" label-width="90px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="活动名称：">
                  <el-input
                    v-model="searchConditions.eventName"
                    placeholder="请填写活动名称"
                    class="input"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="开始时间：">
                  <el-date-picker
                    v-model="searchConditions.startDate"
                    clearable
                    placeholder="请选择开始时间"
                    type="datetime"
                    class="input"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="状态：">
                  <el-select
                    v-model="searchConditions.status"
                    clearable
                    placeholder="请选择状态"
                    class="input"
                  >
                    <el-option label="待审核" value="待审核"></el-option>
                    <el-option label="审核成功" value="审核成功"></el-option>
                    <el-option label="审核失败" value="审核失败"></el-option>
                  </el-select> 
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item>
                  <el-button class="searchButton" type="primary" @click="query()">查询</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="info-list">
          <el-dialog
            :title="title"
            :visible.sync="dialogFormVisible"
            top="6vh"
            :close-on-click-modal="closeOn"
            width="60%"
          >
            <el-form :model="Data" ref="Data">
              <el-form-item>
                <div>
                  <div style="border-bottom:1px dashed #ccc;margin-top:-20px;width:100%"></div>
                  <div style class="line">
                    <center style="z-index:999;background:white;">成员详情</center>
                  </div>
                </div>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="电话号码" :label-width="formLabelWidth" prop="phoneNumber">
                    <el-input
                      v-model="Data.phoneNumber"
                      autocomplete="off"
                      class="diaInput"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="email" :label-width="formLabelWidth" prop="email">
                    <el-input v-model="Data.email" autocomplete="off" class="diaInput" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="学院" :label-width="formLabelWidth" prop="collegeId">
                    <el-select v-model="Data.college" placeholder="请选择学院" class="diaInput" disabled></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="班级" :label-width="formLabelWidth" prop="myclassId">
                    <el-select v-model="Data.myClass" class="diaInput" disabled></el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="出生日期" :label-width="formLabelWidth" prop="birthday">
                    <el-date-picker
                      v-model="Data.birthday"
                      type="date"
                      format="yyyy 年 MM 月 dd 日"
                      placeholder="选择日期"
                      class="diaInput"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="家庭住址" :label-width="formLabelWidth" prop="address">
                    <el-input v-model="Data.address" autocomplete="off" class="diaInput" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="qq号" :label-width="formLabelWidth" prop="qq">
                    <el-input v-model="Data.qq" autocomplete="off" class="diaInput" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                    <el-select v-model="Data.sex" placeholder="请选择性别" class="diaInput" disabled></el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="个人简介" :label-width="formLabelWidth" prop="introduction">
                    <el-input
                      v-model="Data.introduction"
                      autocomplete="off"
                      class="diaInput"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12"></el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
            </div>
          </el-dialog>
          <div class="list">
            <el-table :data="showData" style="width: 100%" size="small" border stripe>
              <el-table-column align="center" prop="eventName" label="活动名称"></el-table-column>
              <el-table-column align="center" prop="eventAddress" label="活动地点"></el-table-column>
              <el-table-column align="center" prop="startDate" label="开始时间">
                <template slot-scope="scope">
                  <!-- 使用时间过滤器 -->
                  <div>{{scope.row.startDate | formatDate}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="realName" label="用户名称"></el-table-column>
              <el-table-column align="center" prop="status" label="状态">
                <template slot-scope="scope">
                  <div v-if="scope.row.status == '审核失败'" style="color:#F56C6C">审核失败</div>
                  <div v-if="scope.row.status == '审核成功'" style="color:#61BAA4">审核成功</div>
                  <div v-if="scope.row.status == '待审核'" style="color:#909399">待审核</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" min-width="90px" fixed="right">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    @click="getNoticeInfo(scope.row,scope.$index)"
                    style="color:#67C23A"
                  >查看</el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click="pass(scope.row,scope.$index)"
                    v-if="scope.row.status == '待审核'"
                  >通过</el-button>
                  <el-button
                    type="text"
                    size="mini"
                    style="color:#F56C6C"
                    @click="noPass(scope.row)"
                    v-if="scope.row.status == '待审核'"
                  >不通过</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-dialog
            title="不通过理由"
            :visible.sync="eventVisiable"
            top="6vh"
            :close-on-click-modal="closeOn"
            width="60%"
          >
            <el-form :model="userEventForm">
              <el-form-item label="留言" label-width="75px" prop="message" required status-icon>
                <el-input v-model="userEventForm.message" placeholder="请输入不通过原因"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="eventVisiable = false">取消</el-button>
              <el-button type="primary" @click="eventSubmit()">确定</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="page-container">
          <el-pagination
            @size-change="handleSizeChange()"
            @current-change="handleCurrentChange()"
            :current-page.sync="searchConditions.currentPage"
            :page-sizes="[5, 10]"
            :page-size.sync="searchConditions.pageSize"
            layout="total, sizes, prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import titleBox from "@/components/titleBox/titleBox";
import { Message } from "element-ui";
import { getEvents, userApplyEvent, userEventStatus } from "@/api/event";
import { parseTime } from "@/utils/index";

export default {
  data() {
    return {
      //总页数
      total: 40,
      title: "",
      eventVisiable: false,
      disabled: false,
      closeOn: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "75px",
      showData: [],
      userEventForm: {
        eventId: "",
        userId: "",
        message: "",
        status: "",
        id: ""
      },
      searchConditions: {
        associationId: "",
        eventName: "",
        startDate: "",
        status: "",
        currentPage: 1,
        pageSize: 5
      },
      Data: {
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
        myclass: "",
        id: ""
      },
      ResetData: {}
    };
  },
  created() {
    //页面加载时查询数据
    this.getUserApply();
  },
  //时间过滤器
  filters: {
    formatDate(time) {
      return parseTime(time, "{y}-{m}-{d} {h}:{i}");
    }
  },

  methods: {
    eventSubmit() {
      this.UserEventStatus();
      this.getUserApply();
      this.eventVisiable = false;
    },
    UserEventStatus() {
      userEventStatus(this.userEventForm)
        .then(response => {
          Message({
            message: "状态更新成功",
            type: "success",
            duration: 3 * 1000
          });
        })
        .catch(error => {
          Message({
            message: "更新失败！",
            type: "error",
            duration: 3 * 1000
          });
        });
    },
    pass(row, index) {
      this.userEventForm.id = row.id;
      this.userEventForm.eventId = row.eventId;
      this.userEventForm.userId = row.userId;
      this.userEventForm.status = "审核成功";
      this.UserEventStatus();
      this.getUserApply();
    },
    noPass(row, index) {
      this.eventVisiable = true;
      this.userEventForm.id = row.id;
      this.userEventForm.eventId = row.eventId;
      this.userEventForm.userId = row.userId;
      this.userEventForm.status = "审核失败";
    },
    //手动点击查询
    query() {
      this.getUserApply();
      Message({
        message: "查询成功！",
        type: "success",
        duration: 3 * 1000
      });
    },
    // 获取用户申请列表
    getUserApply() {
      this.searchConditions.associationId = sessionStorage.getItem("assocId");
      userApplyEvent(this.searchConditions)
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
    getNoticeInfo(row, index) {
      //用json转换
      this.Data = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
      this.disabled = true;
      this.title = "查看成员信息";
    },

    handleSizeChange(val) {
      this.getEvents();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getEvents();
      console.log(`当前页: ${val}`);
    }
  },
  components: {
    titleBox
  }
};
</script>

<style scoped>
.attachment-container {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  background-color: #e3e3e3;
  min-height: 100vh;
  padding: 50px 60px 0px;
  color: #606266;
}
.form-container {
  margin-top: 20px;
  margin-left: 30px;
}
.info-list {
  margin-top: 20px;
}
.addButton {
  text-align: right;
  margin-right: 30px;
  margin-bottom: 10px;
}
.line {
  margin-top: -20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.input {
  width: 100%;
}
.diaInput {
  width: 100%;
}
.page-container {
  margin-top: 30px;
  text-align: center;
}
.date-picker {
  width: 285px;
}
</style>
