<template>
  <div class="attachment-container">
    <el-card class="box-card" shadow="hover">
      <title-box titleValue="院系班级-管理"></title-box>
      <div class="base-attachment-container">
        <div class="info-list">
          <el-dialog
            :title="collegeTitle"
            :visible.sync="collegeVisible"
            top="6vh"
            :close-on-click-modal="closeOn"
            width="60%"
          >
            <el-form :model="collegeForm" ref="Data">
              <el-form-item>
                <div>
                  <div style="border-bottom:1px dashed #ccc;margin-top:-20px;width:100%"></div>
                  <div style class="line">
                    <center style="z-index:999;background:white;">院系管理</center>
                  </div>
                </div>
              </el-form-item>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="院系名称：" :label-width="formLabelWidth" prop="collegeName">
                    <el-input
                      v-model="collegeForm.collegeName"
                      class="diaInput"
                      :disabled="disabled"
                      placeholder="请输入院系名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="collegeVisible = false">取消</el-button>
              <el-button v-if="collegeTitle == '新增院系信息'" @click="createCollege()" type="primary">确认</el-button>
              <el-button v-if="collegeTitle == '编辑院系信息'" @click="editCollege()" type="primary">确认</el-button>
            </div>
          </el-dialog>

          <el-dialog
            :title="classTitle"
            :visible.sync="classVisible"
            top="6vh"
            :close-on-click-modal="closeOn"
            width="60%"
          >
            <el-form :model="classForm" ref="Data">
              <el-form-item>
                <div>
                  <div style="border-bottom:1px dashed #ccc;margin-top:-20px;width:100%"></div>
                  <div style class="line">
                    <center style="z-index:999;background:white;">班级管理</center>
                  </div>
                </div>
              </el-form-item>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="班级名称：" :label-width="formLabelWidth" prop="className">
                    <el-input
                      v-model="classForm.className"
                      class="diaInput"
                      :disabled="disabled"
                      placeholder="请输入班级名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="classVisible = false">取消</el-button>
              <el-button v-if="classTitle == '新增班级信息'" @click="createClass()" type="primary">确认</el-button>
              <el-button v-if="classTitle == '编辑班级信息'" @click="editClass()" type="primary">确认</el-button>
            </div>
          </el-dialog>
          <div class="college">
            <el-tabs
              v-model="editableTabsValue"
              type="card"
              @tab-remove="removeTab"
              addable
              closable
              @tab-add="tabAdd"
              @tab-click="tabClick"
              style="height:370px"
            >
              <el-tab-pane
                v-for="(item) in colleges"
                :key="item.collegeId"
                :label="item.collegeName"
                :name="item.collegeId"
              >
                <div class="list">
                  <el-table :data="myclasses" style="width: 100%" size="small" border stripe>
                    <el-table-column align="center" prop="className" label="班级名称"></el-table-column>
                    <el-table-column align="center" label="操作" min-width="90px" fixed="right">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          size="mini"
                          @click="del(scope.row)"
                          style="color:#F56C6C"
                        >删除</el-button>
                        <!-- <el-button
                          type="text"
                          size="mini"
                          @click="edit(scope.row)"
                          style="color:#67C23A"
                        >编辑</el-button> -->
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button class="myButton" type="myPrimary" @click="addClass">+&nbsp;添加班级</el-button>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import titleBox from "@/components/titleBox/titleBox";
import { Message } from "element-ui";
import {
  getColleges,
  deleteCollege,
  createCollege,
  editCollege
} from "@/api/college";
import { getMyclasses, deleteClass, createClass } from "@/api/myclass";
import { parseTime } from "@/utils/index";

export default {
  data() {
    return {
      classTitle: "",
      classVisible: false,
      editableTabsValue: 1,
      //总页数
      total: 0,
      collegeTitle: "",
      title: "",
      collegeVisible: false,
      disabled: false,
      closeOn: false,
      totalSum: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      showData: [],
      colleges: [],
      myclasses: [],
      classForm: {
        classId: "",
        collegeId: "",
        className: ""
      },
      resetClassForm: {
        classId: "",
        collegeId: "",
        className: ""
      },
      collegeForm: {
        collegeName: ""
      },
      ResetCollegeForm: {
        collegeName: ""
      }
    };
  },
  created() {
    //页面加载时查询数据
    this.getColleges();
  },
  mounted() {
    this.getFirstMyclasses();
  },
  //时间过滤器
  filters: {
    formatDate(time) {
      return parseTime(time, "{y}-{m}-{d}");
    }
  },
  methods: {
    // edit(row){
    //      this.classVisible = true;
    //     this.classForm = {...row};
    //     this.classTitle = "编辑班级信息";
    // },
    createClass() {
      this.classVisible = false;
      this.classForm.collegeId = this.editableTabsValue;
      createClass(this.classForm)
        .then(res => {
          if (res.message == "新增成功") {
            Message({
              message: "班级信息新增成功",
              type: "success",
              duration: 3 * 1000
            });
            this.getMyclasses();
          } else {
            Message({
              message: res.message,
              type: "error",
              duration: 3 * 1000
            });
          }
        })
        .catch(error => {
          Message({
            message: "班级信息新增失败",
            type: "error",
            duration: 3 * 1000
          });
        });
    },
    addClass() {
      this.classVisible = true;
      this.classForm = { ...this.resetClassForm };
      this.classTitle = "新增班级信息";
    },
    tabClick(event) {
      getMyclasses(event.name)
        .then(res => {
          this.myclasses = [...res.result];
        })
        .catch(error => {
          Message({
            message: "班级信息获取失败",
            type: "error",
            duration: 3 * 1000
          });
        });
    },
    getFirstMyclasses() {
      getMyclasses(this.editableTabsValue)
        .then(res => {
          this.myclasses = [...res.result];
        })
        .catch(error => {
          Message({
            message: "班级信息获取失败",
            type: "error",
            duration: 3 * 1000
          });
        });
    },
    createCollege() {
      createCollege(this.collegeForm)
        .then(res => {
          if (res.message == "新增成功") {
            Message({
              message: res.message,
              type: "success",
              duration: 3 * 1000
            });
          } else {
            Message({
              message: res.message,
              type: "error",
              duration: 3 * 1000
            });
          }
          this.getColleges();
          this.collegeVisible = false;
        })
        .catch(error => {});
    },
    removeTab(collegeId) {
      deleteCollege(collegeId)
        .then(response => {
          if (response.message == "删除成功") {
            Message({
              message: response.message,
              type: "success",
              duration: 3 * 1000
            });
          } else {
            Message({
              message: response.message,
              type: "error",
              duration: 3 * 1000
            });
          }
          this.getColleges();
        })
        .catch(error => {
          Message({
            message: "删除失败！",
            type: "error",
            duration: 3 * 1000
          });
        });
    },
    tabAdd() {
      this.collegeForm = { ...this.ResetCollegeForm };
      this.collegeVisible = true;
      this.collegeTitle = "新增院系信息";
    },
    getMyclasses() {
      getMyclasses(this.editableTabsValue)
        .then(res => {
          this.myclasses = [...res.result];
        })
        .catch(error => {});
    },
    getColleges() {
      getColleges()
        .then(response => {
          this.colleges = [...response.result];
          this.editableTabsValue = this.colleges[0].collegeId;
        })
        .catch(error => {
          Message({
            message: "获取列表失败！",
            type: "error",
            duration: 3 * 1000
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
      this.$confirm("此操作将永久删除该班级, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteClass(row.classId)
            .then(response => {
              if (response.message == "此班级下有人员绑定，无法删除！") {
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
              this.getMyclasses();
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
  text-align: left;
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
.myButton {
  background-color: #f2f6fc;
  color: #409eff;
  line-height: 5px;
  height: 30px;
  margin-top: 10px;
  width: 100%;
}
</style>
