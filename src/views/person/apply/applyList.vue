<template>
  <div class="attachment-container">
    <title-box titleValue="成员管理-成员申请"></title-box>
    <div class="base-attachment-container">
      <div class="info-list">
        <div class="addMember">
        </div>
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
                  <center style="z-index:999;background:white;">待审核成员信息信息</center>
                </div>
              </div>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="登录名：" :label-width="formLabelWidth" prop="username">
                  <el-input v-model="Data.username" class="diaInput" :disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态：" :label-width="formLabelWidth" prop="enable">
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
                <el-form-item label="Email：" :label-width="formLabelWidth" prop="email">
                  <el-input
                    v-model="Data.email"
                    autocomplete="off"
                    class="diaInput"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话：" :label-width="formLabelWidth" prop="phoneNumber">
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
                <el-form-item label="注册时间：" :label-width="formLabelWidth" prop="registeryDate">
                  <el-date-picker
                    v-model="Data.registeryDate"
                    type="date"
                    class="date-picker"
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="生日：" :label-width="formLabelWidth" prop="birthday">
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
                <el-form-item label="住址：" :label-width="formLabelWidth" prop="address">
                  <el-input
                    v-model="Data.address"
                    autocomplete="off"
                    class="diaInput"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="真实姓名：" :label-width="formLabelWidth" prop="realName">
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
                <el-form-item label="qq号：" :label-width="formLabelWidth" prop="qq">
                  <el-input
                    v-model="Data.qq"
                    autocomplete="off"
                    class="diaInput"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别：" :label-width="formLabelWidth" prop="sex">
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
                <el-form-item label="学院：" :label-width="formLabelWidth" prop="college">
                  <el-select
                    v-model="Data.college"
                    autocomplete="off"
                    class="diaInput"
                    :disabled="disabled"
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="班级：" :label-width="formLabelWidth" prop="myClass">
                  <el-select
                    v-model="Data.myClass"
                    autocomplete="off"
                    class="diaInput"
                    :disabled="disabled"
                  >
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="职务：" :label-width="formLabelWidth" prop="position">
                  <el-input v-model="Data.position" autocomplete="off" class="diaInput" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="个人简介：" :label-width="formLabelWidth" prop="introduction">
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
            <el-button @click="cancel('Data')">{{btnName}}</el-button>
            <el-button type="primary" v-if="title ==='编辑成员信息'" @click="submit('Data')">确 定</el-button>
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
                <el-button type="text" size="mini" @click="pass(scope.row,scope.$index)">通过</el-button>
                <el-button type="text" size="mini" style="color:#F56C6C" @click="noPass(scope.row)">不通过</el-button>
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
import { parseTime } from "@/utils/index";
import { Message } from "element-ui";
export default {
  data() {
    return {
      btnName: "取消",
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
        currentPage: 1,
        pageSize: 5,
        status:"待审核"
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
        position: "社员"
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
        position: "社员"
      },
    };
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
    // 获取成员列表
    getMemberList() {
      this.searchConditions.associationId = sessionStorage.getItem("assocId");
      getMemberList(this.searchConditions)
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
    cancel(formname) {
      this.dialogFormVisible = false;
    },
    getNoticeInfo(row, index) {
      //用json转换
      this.Data = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
      this.disabled = true;
      this.title = "查看成员信息";
      this.btnName = "关闭";
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
  margin-top: 50px;
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
