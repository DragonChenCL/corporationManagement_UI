<template>
  <div class="attachment-container">
    <el-card class="box-card" shadow="hover">
      <title-box titleValue="活动管理-活动列表"></title-box>
      <div class="base-attachment-container">
        <div class="form-container">
          <el-form :model="searchConditions" label-width="90px">
            <el-row>
              <el-col :span="5">
                <el-form-item label="活动名称：">
                  <el-input
                    v-model="searchConditions.eventName"
                    placeholder="请填写活动名称"
                    class="input"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="社团名称：">
                  <el-select
                    v-model="searchConditions.assocId"
                    placeholder="请选择社团名称"
                    class="input"
                    clearable
                  >
                    <el-option 
                    v-for="assoc in assocOptions"
                    :key="assoc.associationId"
                    :label="assoc.assName"
                    :value="assoc.associationId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
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
              <el-col :span="5">
                <el-form-item label="状态：" label-width="60px">
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
              <el-col :span="2">
                <el-form-item label-width="15px">
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
            <el-form :model="Data" ref="Data" :rules="Rules">
              <el-form-item>
                <div>
                  <div style="border-bottom:1px dashed #ccc;margin-top:-20px;width:100%"></div>
                  <div style class="line">
                    <center style="z-index:999;background:white;">活动详情</center>
                  </div>
                </div>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="活动名称：" :label-width="formLabelWidth" prop="eventName">
                    <el-input v-model="Data.eventName" class="diaInput" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="活动地址：" :label-width="formLabelWidth" prop="address">
                    <el-input v-model="Data.address" class="diaInput" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="开始时间：" :label-width="formLabelWidth" prop="startDate">
                    <el-date-picker
                      v-model="Data.startDate"
                      autocomplete="off"
                      class="diaInput"
                      :disabled="disabled"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      value-format="yyyy-MM-dd HH:mm"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="结束时间：" :label-width="formLabelWidth" prop="endDate">
                    <el-date-picker
                      v-model="Data.endDate"
                      autocomplete="off"
                      class="diaInput"
                      :disabled="disabled"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      value-format="yyyy-MM-dd HH:mm"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="负责人：" :label-width="formLabelWidth" prop="responsiblePerson">
                    <el-input
                      v-model="Data.responsiblePerson"
                      autocomplete="off"
                      class="diaInput"
                      :disabled="disabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="活动内容：" :label-width="formLabelWidth" prop="content">
                    <el-input v-model="Data.content" class="diaInput" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="申请金额：" :label-width="formLabelWidth" prop="exceptFunds">
                    <el-input
                      v-model="Data.exceptFunds"
                      autocomplete="off"
                      class="diaInput"
                      :disabled="disabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="12" v-if="this.title == '查看活动信息'">
                  <el-form-item label="实际支出：" :label-width="formLabelWidth" prop="actualFunds">
                    <el-input
                      v-model="Data.actualFunds"
                      autocomplete="off"
                      class="diaInput"
                      :disabled="disabled"
                    ></el-input>
                  </el-form-item>
                </el-col> -->
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
            </div>
          </el-dialog>
          
          <div class="list">
            <el-table :data="showData" style="width: 100%" size="small" border stripe>
              <el-table-column align="center" prop="eventName" label="活动名称"></el-table-column>
              <el-table-column align="center" prop="assName" label="社团名称"></el-table-column>
              <el-table-column align="center" prop="address" label="活动地点"></el-table-column>
              <el-table-column align="center" prop="responsiblePerson" label="负责人"></el-table-column>
              <el-table-column align="center" prop="startDate" label="开始时间">
                <template slot-scope="scope">
                  <!-- 使用时间过滤器 -->
                  <div>{{scope.row.startDate | formatDate}}</div>
                </template>
              </el-table-column>
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
                   <el-button v-if="scope.row.status == '待审核'" type="text" size="mini" @click="pass(scope.row)">通过</el-button>
                  <el-button
                    type="text"
                    v-if="scope.row.status == '待审核'"
                    size="mini"
                    style="color:#F56C6C"
                    @click="noPass(scope.row)"
                  >不通过</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
         <el-dialog
            title="不通过理由"
            :visible.sync="eventVisiable"
            top="6vh"
            :close-on-click-modal="closeOn"
            width="60%"
          >
            <el-form :model="eventForm">
              <el-form-item label="留言" label-width="75px" prop="message" required status-icon>
                <el-input v-model="eventForm.message" placeholder="请输入不通过原因"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="eventVisiable = false">取消</el-button>
              <el-button type="primary" @click="eventStatusSubmit()">确定</el-button>
            </div>
          </el-dialog>
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
import { getEvents, applyEvents,getEventsBySys,eventStatus } from "@/api/event";
import { findAssocAll } from "@/api/association";
import { parseTime } from "@/utils/index";

export default {
  data() {
    return {
      //总页数
      total: 40,
      title: "",
      eventVisiable:false,
      disabled: false,
      closeOn: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      showData: [],
      searchConditions: {
        assocName: "",
        assocId: "",
        eventName: "",
        startDate: "",
        status: "",
        currentPage: 1,
        pageSize: 5
      },
      Data: {
        eventName: "",
        address: "",
        startDate: "",
        endDate: "",
        responsiblePerson: "",
        content: "",
        exceptFunds: "",
        actualFunds: "",
        associationId: ""
      },
       eventForm: {
        eventId: "",
        message: "",
        status: "",
      },
      ResetData: {},
      assocOptions:[]
    };
  },
  created() {
    //页面加载时查询数据
    this.getEventsBySys();
    this.getAssocAll();
  },
  //时间过滤器
  filters: {
    formatDate(time) {
      return parseTime(time, "{y}-{m}-{d} {h}:{i}");
    }
  },
  methods: {
      getAssocAll(){
          findAssocAll().then(res =>{
              this.assocOptions = [...res.result]
          }).catch(error =>{
               Message({
                message: "获取社团信息失败！",
                type: "error",
                duration: 3 * 1000
            });
          })
      },
    eventStatusSubmit(){
        this.eventStatus();
        this.getEventsBySys();
        this.eventVisiable = false;
      },
    eventStatus(){
        eventStatus(this.eventForm)
            .then(response => {
           Message({
            message: "状态更新成功！",
            type: "success",
            duration: 3 * 1000
          });
        })
        .catch(error => {
          Message({
            message: "状态更新失败！",
            type: "error",
            duration: 3 * 1000
          });
        });
    },
    pass(row){
        this.eventForm.eventId = row.eventId;
        this.eventForm.status = "审核成功";
        this.eventForm.message = "恭喜";
        this.eventStatus();
        this.getEventsBySys();
    },
    noPass(row){
        this.eventForm.eventId = row.eventId;
        this.eventForm.status = "审核失败";
        this.eventVisiable = true;
    },
    //手动点击查询
    query() {
      this.getEventsBySys();
      Message({
        message: "查询成功！",
        type: "success",
        duration: 3 * 1000
      });
    },
    // 获取活动列表
    getEventsBySys() {
      getEventsBySys(this.searchConditions)
        .then(response => {
          this.showData = [...response.result.contents];
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
      this.title = "查看活动信息";
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
.totalSum {
  display: flex;
}
</style>
