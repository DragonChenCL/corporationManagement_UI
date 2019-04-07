<template>
  <div class="attachment-container">
    <el-card class="box-card" shadow="hover">
      <title-box titleValue="财政管理-出账"></title-box>
      <div class="base-attachment-container">
        <div class="form-container">
          <el-form :model="searchConditions" label-width="90px">
            <el-row>
              <el-col :span="6">
                <el-form-item label=" 收入理由：">
                  <el-input v-model="searchConditions.reason" placeholder="请填写收入理由" class="input"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="收入时间：">
                  <el-date-picker
                    v-model="searchConditions.startDate"
                    clearable
                    placeholder="请选择收入时间"
                    class="input"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
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
            <el-form :model="Data" ref="Data" :rules="Rules">
              <el-form-item>
                <div>
                  <div style="border-bottom:1px dashed #ccc;margin-top:-20px;width:100%"></div>
                  <div style class="line">
                    <center style="z-index:999;background:white;">财政详情</center>
                  </div>
                </div>
              </el-form-item>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="收入理由：" :label-width="formLabelWidth" prop="reason">
                    <el-input
                      v-model="Data.reason"
                      class="diaInput"
                      :disabled="disabled"
                      placeholder="请输入收入理由"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="收入时间：" :label-width="formLabelWidth" prop="startDate">
                    <el-date-picker
                      v-model="Data.startDate"
                      autocomplete="off"
                      class="diaInput"
                      :disabled="disabled"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择收入时间"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="收入金额：" :label-width="formLabelWidth" prop="money">
                    <el-input
                      v-model="Data.money"
                      autocomplete="off"
                      class="diaInput"
                      :disabled="disabled"
                      placeholder="请输入金额"
                      onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button @click="createFinance()" type="primary">确认</el-button>
            </div>
          </el-dialog>
          <div class="addButton">
            <el-button type="primary" @click="dialogFormVisible = true">新增出账</el-button>
          </div>
          <div class="list">
            <el-table :data="showData" style="width: 100%" size="small" border stripe>
              <el-table-column align="center" prop="reason" label="收入理由"></el-table-column>
              <el-table-column align="center" prop="startDate" label="收入时间">
                <template slot-scope="scope">
                  <!-- 使用时间过滤器 -->
                  <div>{{scope.row.startDate | formatDate}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="money" label="收入金额"></el-table-column>
              <el-table-column align="center" label="操作" min-width="90px" fixed="right">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    @click="del(scope.row)"
                    style="color:#F56C6C"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
      <div class="totalSum">
        <span>总支出为：</span>
        <span style="color:red">{{ totalOutSum }}</span>
        <span>元</span>
      </div>
      <div class="totalSum">
        <span>总剩余：</span>
        <span style="color:red">{{ totalMoney }}</span>
        <span>元</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import titleBox from "@/components/titleBox/titleBox";
import { Message } from "element-ui";
import {
  getOutFinance,
  getInFinance,
  createFinance,
  getFinance,
  delFinance
} from "@/api/finance";
import { parseTime } from "@/utils/index";

export default {
  data() {
    return {
      //总页数
      total: 40,
      title: "",
      disabled: false,
      closeOn: false,
      totalOutSum: "",
      totalInSum: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      showData: [],
      searchConditions: {
        associationId: "",
        reason: "",
        startDate: "",
        currentPage: 1,
        pageSize: 5,
        type: "支出"
      },
      Data: {
        reason: "",
        startDate: "",
        money: "",
        associationId: "",
        type: "支出"
      },
      ResetData: {}
    };
  },
  created() {
    //页面加载时查询数据
    this.getFinance();
    this.getOutFinance();
    this.getInFinance();
  },
  //时间过滤器
  filters: {
    formatDate(time) {
      return parseTime(time, "{y}-{m}-{d}");
    }
  },
 computed :{
     totalMoney:function(){
         return this.totalInSum - this.totalOutSum
     }
 },
  methods: {
    getInFinance() {
      getInFinance()
        .then(response => {
          this.totalInSum = response.result;
        })
        .catch(error => {
          Message({
            message: "获取金额失败！",
            type: "error",
            duration: 3 * 1000
          });
        });
    },
    del(row) {
      this.$confirm("此操作将永久删除改账单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delFinance(row.financeId)
            .then(response => {
              // 删除完成后重新拉取信息
              this.getFinance();
              this.getOutFinance();
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
    createFinance() {
      this.Data.associationId = sessionStorage.getItem("assocId");
      createFinance(this.Data)
        .then(response => {
          Message({
            message: "新增出账成功！",
            type: "success",
            duration: 3 * 1000
          });
          this.getFinance();
          this.getOutFinance();
          this.dialogFormVisible = false;
        })
        .catch(error => {
          Message({
            message: "新增出账失败！",
            type: "error",
            duration: 3 * 1000
          });
        });
    },
    getOutFinance() {
      getOutFinance()
        .then(response => {
          this.totalOutSum = response.result;
        })
        .catch(error => {
          Message({
            message: "获取金额失败！",
            type: "error",
            duration: 3 * 1000
          });
        });
    },
    getFinance() {
      this.searchConditions.associationId = sessionStorage.getItem("assocId");
      getFinance(this.searchConditions)
        .then(response => {
          this.showData = response.result.content;
          this.total = response.result.totalElements;
        })
        .catch(error => {
          Message({
            message: "获取列表失败！",
            type: "error",
            duration: 3 * 1000
          });
        });
    },
    //手动点击查询
    query() {
      this.getFinance();
      Message({
        message: "查询成功！",
        type: "success",
        duration: 3 * 1000
      });
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
  text-align: right;
  margin: 20px;
}
</style>
