<template>
  <div class="attachment-container">
    <el-card class="box-card" shadow="hover">
      <title-box titleValue="社团分类-管理"></title-box>
      <div class="base-attachment-container">
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
                    <center style="z-index:999;background:white;">分类管理</center>
                  </div>
                </div>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="分类名称：" :label-width="formLabelWidth" prop="categoryName">
                    <el-input
                      v-model="Data.categoryName"
                      class="diaInput"
                      :disabled="disabled"
                      placeholder="请输入分类名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="状态：" :label-width="formLabelWidth" prop="status">
                    <el-switch
                      v-model="Data.status"
                      active-text="启用"
                      inactive-text="禁用"
                      active-value="1"
                      inactive-value="0"
                    ></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button v-if="title == '新增分类信息'" @click="createCategory()" type="primary">确认</el-button>
              <el-button v-if="title == '编辑分类信息'" @click="editCategory()" type="primary">确认</el-button>
            </div>
          </el-dialog>
          <div class="addButton">
            <el-button type="primary" @click="addCategory()">新增分类</el-button>
          </div>
          <div class="list">
            <el-table :data="showData" style="width: 100%" size="small" border stripe>
              <el-table-column align="center" prop="categoryName" label="分类名称"></el-table-column>
              <el-table-column align="center" prop="status" label="分类状态">
                <template slot-scope="scope">
                  <div v-if="scope.row.status == '0'" style="color:#F56C6C">禁用</div>
                  <div v-if="scope.row.status == '1'" style="color:#61BAA4">启用</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" min-width="90px" fixed="right">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    @click="del(scope.row)"
                    style="color:#F56C6C"
                  >删除</el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click="edit(scope.row)"
                    style="color:#67C23A"
                  >编辑</el-button>
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
import {
  deleteCategory,
  createCategory,
  editCategory,
  findAllByPage
} from "@/api/category";
import { parseTime } from "@/utils/index";

export default {
  data() {
    return {
      //总页数
      total: 40,
      title: "",
      disabled: false,
      closeOn: false,
      totalSum: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      showData: [],
      searchConditions: {
        currentPage: 1,
        pageSize: 5
      },
      Data: {
        categoryId: "",
        categoryName: "",
        status: "1"
      },
      ResetData: {
        categoryId: "",
        categoryName: "",
        status: "1"
      }
    };
  },
  created() {
    //页面加载时查询数据
    this.getAllByPage();
  },
  //时间过滤器
  filters: {
    formatDate(time) {
      return parseTime(time, "{y}-{m}-{d}");
    }
  },
  methods: {
    createCategory() {
      createCategory(this.Data)
        .then(response => {
          if (response.message == "新增成功") {
            this.$message({
              type: "success",
              message: "新增成功!"
            });
            this.getAllByPage();
          } else {
            this.$message({
              type: "error",
              message: response.message
            });
          }
          this.dialogFormVisible = false;
        })
        .catch(error => {
          this.$message({
            type: "success",
            message: "新增成功!"
          });
        });
    },
    editCategory() {
      editCategory(this.Data)
        .then(response => {
          if (response.message == "编辑成功") {
            this.$message({
              type: "success",
              message: response.message
            });
          } else {
            this.$message({
              type: "error",
              message: response.message
            });
          }
          this.getAllByPage();
          this.dialogFormVisible = false;
        })
        .catch(error => {
          this.$message({
            type: "success",
            message: "编辑成功!"
          });
        });
    },
    addCategory() {
      this.dialogFormVisible = true;
      this.title = "新增分类信息";
      this.Data = this.ResetData;
    },
    edit(row) {
      this.dialogFormVisible = true;
      this.title = "编辑分类信息";
      this.Data = { ...row };
    },
    del(row) {
      this.$confirm("此操作将永久删除改账单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteCategory(row.categoryId)
            .then(response => {
              if (response.message == "分类下有社团，无法删除") {
                this.$message({
                  type: "error",
                  message: response.message
                });
              } else {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
              // 删除完成后重新拉取信息
              this.getAllByPage();
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
    getAllByPage() {
      findAllByPage(this.searchConditions)
        .then(response => {
          console.log("xxxx");
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
