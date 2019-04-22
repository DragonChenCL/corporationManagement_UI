<template>
  <div class="attachment-container">
    <el-card class="box-card" shadow="hover">
      <title-box titleValue="社团管理-列表"></title-box>
      <div class="base-attachment-container">
        <div class="form-container">
          <el-form :model="searchConditions" label-width="75px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="社团名称：" label-width="100px">
                  <el-input v-model="searchConditions.assName" placeholder="请填写社团名称" class="input"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="分类：">
                  <el-select
                    v-model="searchConditions.categoryId"
                    clearable
                    placeholder="请选择社团分类"
                    class="input"
                  >
                    <el-option
                      v-for="category in categorys"
                      :key="category.categoryId"
                      :label="category.categoryName"
                      :value="category.categoryId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创立时间：" label-width="100px">
                  <el-date-picker
                    v-model="searchConditions.createdDate"
                    placeholder="请选择创立时间"
                    class="input"
                    clearable
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="状态：">
                  <el-select
                    v-model="searchConditions.status"
                    placeholder="请选择状态"
                    class="input"
                    clearable
                  >
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="解散" value="0"></el-option>
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
            <el-form :model="Data" ref="Data">
              <el-form-item>
                <div>
                  <div style="border-bottom:1px dashed #ccc;margin-top:-20px;width:100%"></div>
                  <div style class="line">
                    <center style="z-index:999;background:white;">社团基础信息</center>
                  </div>
                </div>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="社团名称：" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="Data.assName" class="diaInput" :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="社团地址：" :label-width="formLabelWidth" prop="enable">
                    <el-input
                      v-model="Data.address"
                      autocomplete="off"
                      class="diaInput"
                      :disabled="disabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="社团分类：" :label-width="formLabelWidth" prop="email">
                    <el-select
                      v-model="Data.categoryId"
                      autocomplete="off"
                      class="diaInput"
                      :disabled="disabled"
                    >
                      <el-option
                        v-for="category in categorys"
                        :key="category.categoryId"
                        :label="category.categoryName"
                        :value="category.categoryId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="创立时间：" :label-width="formLabelWidth" prop="phoneNumber">
                    <el-date-picker
                      v-model="Data.createdDate"
                      autocomplete="off"
                      class="diaInput"
                      :disabled="disabled"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="创始人：" :label-width="formLabelWidth" prop="registeryDate">
                    <el-input v-model="Data.founder" class="diaInput" :disabled="founderDisabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="负责人：" :label-width="formLabelWidth" prop="birthday">
                    <el-input
                      v-model="Data.responsiblePerson"
                      class="diaInput"
                      :disabled="disabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="电话号码：" :label-width="formLabelWidth" prop="address">
                    <el-input
                      v-model="Data.phoneNumber"
                      autocomplete="off"
                      class="diaInput"
                      :disabled="disabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="社团简介：" :label-width="formLabelWidth" prop="realName">
                    <el-input
                      v-model="Data.description"
                      autocomplete="off"
                      class="diaInput"
                      :disabled="disabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel('Data')">{{btnName}}</el-button>
              <el-button type="primary" v-if="title ==='编辑社团信息'" @click="submit('Data')">确 定</el-button>
              <el-button type="primary" v-if="title ==='创建社团'" @click="createAssoc('Data')">确 定</el-button>
            </div>
          </el-dialog>
          <div class="addButton">
            <el-button type="primary" @click="addAssoc()">创建社团</el-button>
          </div>
          <div class="list">
            <el-table :data="showData" style="width: 100%" size="small" border stripe>
              <el-table-column align="center" prop="assName" label="社团名称"></el-table-column>
              <el-table-column align="center" prop="category" label="社团分类"></el-table-column>
              <el-table-column align="center" prop="address" label="社团地址"></el-table-column>
              <el-table-column align="center" prop="responsiblePerson" label="负责人"></el-table-column>
              <el-table-column align="center" prop="createdDate" label="创立日期">
                <template slot-scope="scope">
                  <!-- 使用时间过滤器 -->
                  <div>{{scope.row.createdDate | formatDate}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="logo" label="社团logo">
                <template slot-scope="scope">
                  <img :src="getImgUrl(scope.row.logo)" min-width="70" height="50">
                </template>
              </el-table-column>
              <el-table-column align="center" prop="enable" label="状态">
                <template slot-scope="scope">
                  <div v-if="scope.row.status == '0'" style="color:#F56C6C">解散</div>
                  <div v-if="scope.row.status == '1'" style="color:#61BAA4">正常</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" min-width="130px" fixed="right">
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
                    @click="del(scope.row,scope.$index)"
                    style="color:#F56C6C"
                    v-if="scope.row.status == '1'"
                  >解散社团</el-button>
                  <el-button type="text" size="mini" @click="update(scope.row,scope.$index)">编辑</el-button>
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
import { getMemberList, deleteUser } from "@/api/member";
import { updateInfo } from "@/api/login";
import { parseTime } from "@/utils/index";
import { Message } from "element-ui";
import {
  updateAssociation,
  findAssociationList,
  disAssociation,
  createAssociationList
} from "@/api/association";
import { getCatrgory } from "@/api/category";

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
      founderDisabled: true,
      formLabelWidth: "100px",
      showData: [],
      searchConditions: {
        assName: "",
        categoryId: "",
        createdDate: "",
        status: "",
        currentPage: 1,
        pageSize: 5
      },
      Data: {
        associationId: "",
        categoryId: "",
        assName: "",
        founder: "",
        responsiblePerson: "",
        createdDate: "",
        status: "",
        description: "",
        phoneNumber: "",
        honors: [],
        logo: "",
        momentImgs: [],
        address: "",
        category: ""
      },
      categorys: [],
      ResetData: {
        associationId: "",
        categoryId: "",
        assName: "",
        founder: "",
        responsiblePerson: "",
        createdDate: "",
        status: "",
        description: "",
        phoneNumber: "",
        honors: [],
        logo: "",
        momentImgs: [],
        address: "",
        category: ""
      }
    };
  },
  watch: {
    //监听dialog的可视属性
    dialogFormVisible(newVal, oldVal) {
      if (newVal == false) {
        this.Data = JSON.parse(JSON.stringify(this.ResetData));
        this.disabled = false;
        this.founderDisabled = true;
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
    this.getCatrgorys();
    this.geAssociationList();
  },
  methods: {
    getImgUrl(imgUrl) {
      return process.env.BASE_API + imgUrl;
    },
    addAssoc() {
      this.dialogFormVisible = true;
      this.disabled = false;
      this.founderDisabled = false;
      this.title = "创建社团";
    },
    getCatrgorys() {
      getCatrgory()
        .then(response => {
          this.categorys = response.result;
        })
        .catch(error => {
          Message({
            message: "社团分类获取失败！",
            type: "error",
            duration: 3 * 1000
          });
        });
    },
    //手动点击查询
    query() {
      this.geAssociationList();
      Message({
        message: "查询成功！",
        type: "success",
        duration: 3 * 1000
      });
    },
    // 获取社团列表
    geAssociationList() {
      console.log("111");
      findAssociationList(this.searchConditions)
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
    addMember() {
      this.dialogFormVisible = true;
    },
    cancel(formname) {
      this.dialogFormVisible = false;
    },
    createAssoc() {
      createAssociationList(this.Data)
        .then(response => {
          // 修改完成后重新拉取信息
          this.geAssociationList();
          Message({
            message: "创建成功！",
            type: "success",
            duration: 3 * 1000
          });
        })
        .catch(error => {
          Message({
            message: "创建失败！",
            type: "error",
            duration: 3 * 1000
          });
        });
      this.dialogFormVisible = false;
    },
    //确认修改成员信息
    submit(formname) {
      updateAssociation(this.Data)
        .then(response => {
          // 修改完成后重新拉取信息
          this.geAssociationList();
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
      this.title = "查看社团信息";
      this.btnName = "关闭";
    },
    update(row, index) {
      this.Data = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
      this.title = "编辑社团信息";
      this.btnName = "取消";
    },
    del(row) {
      this.$confirm("此操作将永久解散社团, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          disAssociation(row.associationId)
            .then(response => {
              // 删除完成后重新拉取信息
              this.geAssociationList();
              this.$message({
                type: "success",
                message: "解散成功!"
              });
            })
            .catch(error => {
              this.$message({
                type: "error",
                message: "解散失败!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消解散操作"
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
