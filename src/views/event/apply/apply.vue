<template>
  <div class="attachment-container">
    <el-card class="box-card" shadow="hover">
      <title-box titleValue="评论管理-列表"></title-box>
      <div class="base-attachment-container">
        <div class="form-container">
          <el-form :model="searchConditions" label-width="90px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="活动名称：">
                  <el-input v-model="searchConditions.eventName" placeholder="请填写活动名称" class="input"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="评论时间：">
                  <el-date-picker
                    v-model="searchConditions.applyDate"
                    clearable
                    placeholder="请选择评论时间"
                    type="datetime"
                    class="input"
                    format="yyyy-MM-dd HH"
                    value-format="yyyy-MM-dd HH"
                  ></el-date-picker>
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
                    <center style="z-index:999;background:white;">评论详情</center>
                  </div>
                </div>
              </el-form-item>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="phoneNumber">
                    <el-input v-model="Data.realName" autocomplete="off" class="diaInput" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="活动名称" :label-width="formLabelWidth" prop="collegeId">
                    <el-select v-model="Data.eventName" class="diaInput" disabled></el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="评论时间" :label-width="formLabelWidth" prop="birthday">
                    <el-date-picker
                      v-model="Data.applyDate"
                      type="date"
                      format="yyyy-MM-dd HH:mm"
                      class="diaInput"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="评论内容" :label-width="formLabelWidth" prop="qq">
                    <el-input v-model="Data.status" autocomplete="off" class="diaInput" disabled type="textarea" :rows="4"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
            </div>
          </el-dialog>
          <div class="list">
            <el-table :data="showData" style="width: 100%" size="small" border stripe>
              <el-table-column align="center" prop="eventName" label="活动名称"></el-table-column>
              <el-table-column align="center" prop="applyDate" label="评论时间">
                <template slot-scope="scope">
                  <!-- 使用时间过滤器 -->
                  <div>{{scope.row.applyDate | formatDate}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="realName" label="用户名称"></el-table-column>
              <el-table-column align="center" label="操作" min-width="90px" fixed="right">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    @click="deleteApply(scope.row)"
                    style="color:#F56C6C"
                  >删除</el-button>
                  <el-button
                    type="text"
                    size="mini"
                    style="color:#67C23A"
                    @click="getNoticeInfo(scope.row,scope.$index)"
                  >查看</el-button>
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
    </el-card>
  </div>
</template>

<script>
import titleBox from "@/components/titleBox/titleBox";
import { Message } from "element-ui";
import { deleteApply, findApplys } from "@/api/apply";
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
      searchConditions: {
        eventName: "",
        applyDate: "",
        currentPage: 1,
        pageSize: 5
      },
      Data: {}
    };
  },
  created() {
    //页面加载时查询数据
    this.findApplys();
  },
  //时间过滤器
  filters: {
    formatDate(time) {
      return parseTime(time, "{y}-{m}-{d} {h}:{i}");
    }
  },

  methods: {
    deleteApply(row) {
      this.$confirm("此操作将永久删除改评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteApply(row.applyId)
            .then(response => {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              // 删除完成后重新拉取信息
              this.findApplys();
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
    getNoticeInfo(row, index) {
      //用json转换
      this.Data = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
      this.disabled = true;
      this.title = "查看评论信息";
    },
    findApplys() {
      findApplys(this.searchConditions)
        .then(res => {
          this.showData = [...res.result.contents];
          this.total = res.result.totalElements;
        })
        .catch(err => {
          Message({
            message: "查询失败！",
            type: "error",
            duration: 3 * 1000
          });
        });
    },
    //手动点击查询
    query() {
      this.findApplys();
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
</style>
