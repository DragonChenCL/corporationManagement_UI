<template>
  <div class="home-container">
    <TitleBox titleValue="人员基础信息"></TitleBox>
    <h3 class="second-title">基本设置-人员基础信息</h3>
    <div class="serach-conditions">
      <el-form :inline="true" :model="searchConditions">
        <el-form-item label="工号：">
          <el-input placeholder="请输入工号"  class="input"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input placeholder="请输入姓名"  class="input"></el-input>
        </el-form-item>
        <el-form-item label="手机：">
          <el-input placeholder="请输入手机"  class="input"></el-input>
        </el-form-item>
        <el-form-item label="Email：">
          <el-input placeholder="请输入Email"  class="input"></el-input>
        </el-form-item>
        <el-form-item label="办公电话：">
          <el-input placeholder="请输入办公电话"  class="input"></el-input>
        </el-form-item>
        <el-form-item label="部门：">
          <el-select placeholder="销售部"  class="input">
            
          </el-select>
          <el-select placeholder="销售一部"  class="input">

          </el-select>
        </el-form-item>
        <el-form-item label="员工类型：">
          <el-select placeholder="外部类型"  class="input"></el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select placeholder="在职"  class="input"></el-select>
        </el-form-item>
        <el-button type="primary"  style="margin-top:5px">查询</el-button>
      </el-form>
    </div>
    <div class="info-list">
      <div class="add-button">
        <el-button type="primary" size="mini" @click="dialogFormVisible = true">添 加 员 工</el-button>
      </div>
      <div class="list">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="id" label="工号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="sex" label="性别">
             <template slot-scope="scope">
              <span v-if="scope.row.sex=='male'">男</span>
              <span v-else>女</span>
            </template>
          </el-table-column>
          <el-table-column prop="leader" label="直属上级"></el-table-column>
          <el-table-column prop="department" label="部门"></el-table-column>
          <el-table-column prop="phone" label="手机"></el-table-column>
          <el-table-column prop="Email" label="Email"></el-table-column>
          <el-table-column prop="otherphone" label="其他联系方式"></el-table-column>
          <el-table-column prop="type" label="员工类型"></el-table-column>
          <el-table-column prop="status" label="状态" style>
            <template slot-scope="scope">
              <span v-if="scope.row.status=='在职'" style="color:#1ab394">{{ scope.row.status }}</span>
              <span v-else-if="scope.row.status=='离职'" style="color:#e71c23">{{ scope.row.status }}</span>
              <span v-else style="color:#447ed9">{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                style="color:#1ab394"
                @click="getNoticeInfo(scope.row,scope.$index)"
              >编辑</el-button>
              <el-button type="text" size="mini" style="color:#e71c23" @click="del">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300,400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>

    <el-dialog title="人员基础信息" :visible.sync="dialogFormVisible" top="0vh" :close-on-click-modal='closeOn'>
      <el-form :model="Data">
        <el-form-item label="工号：" :label-width="formLabelWidth">
          <el-input v-model="Data.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" :label-width="formLabelWidth">
          <el-input v-model="Data.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别：" :label-width="formLabelWidth">
          <el-select v-model="Data.sex" placeholder="请选择性别">
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="直属上级：" :label-width="formLabelWidth">
          <el-input v-model="Data.leader" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机：" :label-width="formLabelWidth">
          <el-input v-model="Data.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email：" :label-width="formLabelWidth">
          <el-input v-model="Data.Email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="办公电话：" :label-width="formLabelWidth">
          <el-input v-model="Data.otherphone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门：" :label-width="formLabelWidth">
          <el-select v-model="Data.department1" placeholder="请选择部门">
            <el-option label="销售部" value="shanghai"></el-option>
          </el-select>
          <el-select v-model="Data.department2" placeholder="请选择部">
            <el-option label="销售一部" value="shanghai"></el-option>
            <el-option label="销售二部" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工类型：" :label-width="formLabelWidth">
          <el-select v-model="Data.type" placeholder="请选择员工类型">
            <el-option label="员工" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-select v-model="Data.status" placeholder="请选择员工状态">
            <el-option label="在职" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('Data')">取 消</el-button>
        <el-button type="primary" @click="submit('Data')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TitleBox from "@/views/nested/menu2/titleBox.vue";
import { Message } from "element-ui";

export default {
  data() {
    return {
      closeOn:false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      currentPage: 1,
      searchConditions: {},
      test: ["id", "name"],
      Data: {
        id: "",
        name: "",
        sex: "",
        leader: "",
        department1: "",
        department2: "",
        phone: "",
        Email: "",
        otherphone: "",
        type: "",
        status: ""
      },
      tableData: [
        {
          id: 1,
          name: "张三",
          sex: "male",
          leader: "陈龙",
          department: "销售》开发一部",
          department1: "销售",
          department2: "开发一部",
          phone: "12345678",
          Email: "123@qq.com",
          otherphone: "654321",
          type: "经理",
          status: "在职"
        },
        {
          id: 2,
          name: "李四",
          sex: "male",
          leader: "陈龙",
          department: "销售》开发一部",
          department1: "销售",
          department2: "开发一部",
          phone: "12345678",
          Email: "123@qq.com",
          otherphone: "654321",
          type: "普通员工",
          status: "离职"
        },
        {
          id: 3,
          name: "王二麻",
          sex: "female",
          leader: "陈龙",
          department: "销售》开发一部",
          department1: "销售",
          department2: "开发一部",
          phone: "12345678",
          Email: "123@qq.com",
          otherphone: "654321",
          type: "副经理",
          status: "离职中"
        }
      ]
    };
  },
  components: {
    TitleBox
  },
  watch:{
    //监听dialog的可视属性
    dialogFormVisible(newVal,oldVal){
      if(newVal == false){
        this.Data = "";
      }
    }
  },
  computed: {},
  methods: {
    cancel(formname){
      this.dialogFormVisible = false;
    },
     submit(formname){
      this.dialogFormVisible = false;
    },
    getNoticeInfo(row, index) {
      console.log(row);
      console.log(index);
      this.Data = row;
      this.dialogFormVisible = true;
    },
    del() {
      this.$confirm("此操作将永久删除改数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
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
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.second-title {
  background-color: #1ab293;
  margin: 0%;
  height: 40px;
  line-height: 40px;
  padding-left: 30px;
}
.serach-conditions {
  margin-top: 20px;
  margin-left: 30px;
  display: flex;
  flex-wrap: wrap;
}
.input {
  width: 140px;
}
.info-list {
  margin-top: 30px;
}
.add-button {
  text-align: right;
  margin-right: 60px;
  margin-bottom: 20px;
}
.page-container {
  margin-top: 30px;
  text-align: center;
}
</style>

