<template>
  <div class="attachment-container">
    <title-box titleValue="成员管理-成员列表"></title-box>
    <div class="base-attachment-container">
      <div class="form-container">
        <el-form :inline="true" :model="searchConditions">
          <el-form-item label="姓名：">
            <el-input v-model="searchConditions.realName" placeholder="请填写姓名" class="input"></el-input>
          </el-form-item>
          <el-form-item label="学院：">
            <el-input v-model="searchConditions.college" placeholder="请填写学院" class="input"></el-input>
          </el-form-item>
          <el-form-item label="班级：">
            <el-input v-model="searchConditions.myClass" placeholder="请填写班级" class="input"></el-input>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select
              v-model="searchConditions.enable"
              placeholder="请选择状态"
              class="input"
              clearable
            >
              <el-option value="0" label="禁用"></el-option>
              <el-option value="1" label="启用"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="注册日期：">
            <el-date-picker
              v-model="searchConditions.registeryDate"
              type="date"
              placeholder="选择注册日期"
              class="date-picker"
              style="width:150px"
            ></el-date-picker>
          </el-form-item>-->
          <el-form-item>
            <el-button class="searchButton" type="primary" @click="query()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="info-list">
        <div class="addMember">
          <el-button class="searchButton" type="primary" @click="addMember()">添加成员</el-button>
        </div>
        <el-dialog
          :title="title"
          :visible.sync="dialogFormVisible"
          top="6vh"
          :close-on-click-modal="closeOn"
          width="60%"
        >
          <el-form :model="Data">
            <el-form-item>
              <div>
                <div style="border-bottom:1px dashed #ccc;margin-top:-20px;width:100%"></div>
                <div style class="line">
                  <center style="z-index:999;background:white;">成员基础信息</center>
                </div>
              </div>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="登录名：" :label-width="formLabelWidth">
                  <el-input v-model="Data.username" class="diaInput" :disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态：" :label-width="formLabelWidth">
                  <el-switch
                    v-model="Data.enable"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="1"
                    :inactive-value="0"
                    :disabled="disabled"
                  ></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="Email：" :label-width="formLabelWidth">
                  <el-input
                    v-model="Data.email"
                    autocomplete="off"
                    class="diaInput"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话：" :label-width="formLabelWidth">
                  <el-input
                    v-model="Data.phoneNumber"
                    autocomplete="off"
                    class="diaInput"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="注册时间：" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model="Data.registeryDate"
                    type="date"
                    class="date-picker"
                    :disabled="disabled"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="生日：" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model="Data.birthday"
                    type="date"
                    class="date-picker"
                    :disabled="disabled"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="住址：" :label-width="formLabelWidth">
                  <el-input
                    v-model="Data.address"
                    autocomplete="off"
                    class="diaInput"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="真实姓名：" :label-width="formLabelWidth">
                  <el-input
                    v-model="Data.realName"
                    autocomplete="off"
                    class="diaInput"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="qq号：" :label-width="formLabelWidth">
                  <el-input
                    v-model="Data.qq"
                    autocomplete="off"
                    class="diaInput"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别：" :label-width="formLabelWidth">
                  <el-select
                    v-model="Data.sex"
                    autocomplete="off"
                    class="diaInput"
                    :disabled="disabled"
                  >
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学院：" :label-width="formLabelWidth">
                  <el-input
                    v-model="Data.college"
                    autocomplete="off"
                    class="diaInput"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="班级：" :label-width="formLabelWidth">
                  <el-select
                    v-model="Data.myClass"
                    autocomplete="off"
                    class="diaInput"
                    :disabled="disabled"
                  ></el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="职务：" :label-width="formLabelWidth">
                  <el-input
                    v-model="Data.position"
                    autocomplete="off"
                    class="diaInput"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="个人简介：" :label-width="formLabelWidth">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="Data.introduction"
                    autocomplete="off"
                    style="width:100%"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel('Data')">取 消</el-button>
            <el-button type="primary" @click="submit('Data')">确 定</el-button>
          </div>
        </el-dialog>
        <div class="list">
          <el-table :data="showData" style="width: 100%" size="small" border stripe>
            <el-table-column align="center" prop="username" label="登录名"></el-table-column>
            <el-table-column align="center" prop="realName" label="真实姓名"></el-table-column>
            <el-table-column align="center" prop="college" label="学院"></el-table-column>
            <el-table-column align="center" prop="myClass" label="班级"></el-table-column>
            <el-table-column align="center" prop="registeryDate" label="注册日期">
              <template slot-scope="scope">
                <!-- 使用时间过滤器 -->
                <div>{{scope.row.registeryDate | formatDate}}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="enable" label="状态">
              <template slot-scope="scope">
                <div v-if="scope.row.enable == '0'" style="color:#F56C6C">禁用</div>
                <div v-if="scope.row.enable == '1'" style="color:#61BAA4">启用</div>
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
                <el-button type="text" size="mini" @click="update(scope.row,scope.$index)">编辑</el-button>
                <el-button type="text" size="mini" style="color:#F56C6C" @click="del(scope.row)">删除</el-button>
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
  </div>
</template>

<script>
import titleBox from "@/components/titleBox/titleBox";
import { getMemberList, deleteUser } from "@/api/member";
import { updateInfo } from "@/api/login";
import { parseTime } from "@/utils/index";
import { Message } from "element-ui";

export default {
  data() {
    return {
      //总页数
      total: 40,
      title: "",
      disabled: false,
      closeOn: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      showData: [],
      searchConditions: {
        realName: "",
        college: "",
        myClass: "",
        enable: "",
        currentPage: 1,
        pageSize: 5
      },
      Data: {
        userId: "",
        authId: "",
        associationId: "",
        username: "",
        phoneNumber: "",
        email: "",
        birthday: "",
        headPortrait: "",
        enable: "",
        registeryDate: "",
        address: "",
        realName: "",
        qq: "",
        college: "",
        myClass: "",
        sex: "",
        introduction: "",
        position: ""
      },
      ResetData: {
        userId: "",
        authId: "",
        associationId: "",
        username: "",
        phoneNumber: "",
        email: "",
        birthday: "",
        headPortrait: "",
        enable: "",
        registeryDate: "",
        address: "",
        realName: "",
        qq: "",
        college: "",
        myClass: "",
        sex: "",
        introduction: "",
        position: ""
      }
    };
  },
  watch: {
    //监听dialog的可视属性
    dialogFormVisible(newVal, oldVal) {
      if (newVal == false) {
        this.Data = JSON.parse(JSON.stringify(this.ResetData));
        this.disabled = false;
      }
    }
  },
  //时间过滤器
  filters: {
    formatDate(time) {
      return parseTime(time, "{y}-{m}-{d}");
    }
  },
  created() {
    //页面加载时查询数据
    this.getMemberList();
  },
  methods: {
    //手动点击查询
    query() {
      this.getMemberList();
      Message({
        message: "查询成功！",
        type: "success",
        duration: 3 * 1000
      });
    },
    // 获取成员列表
    getMemberList() {
      getMemberList(this.searchConditions)
        .then(response => {
          this.showData = response.result.content;
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
    addMember() {
      this.dialogFormVisible = true;
    },
    cancel(formname) {
      this.dialogFormVisible = false;
    },
    //确认修改成员信息
    submit(formname) {
      updateInfo(this.Data)
        .then(response => {
          // 修改完成后重新拉取信息
          this.getMemberList();
          Message({
            message: "修改成功！",
            type: "success",
            duration: 3 * 1000
          });
        })
        .catch(error => {
          Message({
            message: "修改失败！",
            type: "error",
            duration: 3 * 1000
          });
        });
      this.dialogFormVisible = false;
    },
    getNoticeInfo(row, index) {
      //用json转换
      this.Data = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
      this.disabled = true;
      this.title = "查看成员信息";
    },
    update(row, index) {
      this.Data = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
      this.title = "编辑成员信息";
    },
    del(row) {
      this.$confirm("此操作将永久删除改数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUser(row.userId)
            .then(response => {
              // 删除完成后重新拉取信息
              this.getMemberList();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(error => {
              this.$message({
                type: "success",
                message: "删除成功!"
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
      this.getMemberList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getMemberList();
      console.log(`当前页: ${val}`);
    }
  },
  components: {
    titleBox
  }
};
</script>

<style scoped>
.form-container {
  margin-top: 20px;
  margin-left: 30px;
}
.info-list {
  margin-top: 20px;
}
.addMember {
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
  width: 160px;
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
