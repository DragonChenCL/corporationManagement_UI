<template>
  <div class="attachment-container">
    <el-card class="box-card" shadow="hover">
      <title-box titleValue="新闻管理-列表"></title-box>
      <div class="base-attachment-container">
        <div class="form-container">
          <el-form :model="searchConditions" label-width="90px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="新闻标题 ：">
                  <el-input
                    v-model="searchConditions.newsTitle"
                    placeholder="请填写新闻标题"
                    class="input"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="发布时间：">
                  <el-date-picker
                    v-model="searchConditions.publishDate"
                    clearable
                    placeholder="请选择发布时间"
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
          <div class="list">
            <el-table :data="showData" style="width: 100%" size="small" border stripe>
              <el-table-column align="center" prop="newsTitle" label="新闻标题"></el-table-column>
              <el-table-column align="center" prop="author" label="作者"></el-table-column>
              <el-table-column align="center" prop="publishDate" label="发布时间">
                <template slot-scope="scope">
                  <!-- 使用时间过滤器 -->
                  <div>{{scope.row.publishDate | formatDate}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="newsImg" label="新闻图片">
                <template slot-scope="scope">
                  <img :src="getImgUrl(scope.row.newsImg)" min-width="70" height="50">
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
                  <el-button type="text" size="mini" @click="edit(scope.row)">编辑</el-button>
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
import { findNewsList, deleteNews } from "@/api/news";
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
        newsTitle: "",
        publishDate: "",
        currentPage: 1,
        pageSize: 5
      },
      Data: {
        newsTitle: "",
        publishDate: "",
        newsImg: "",
        associationId: ""
      },
      ResetData: {}
    };
  },
  created() {
    //页面加载时查询数据
    this.findNewsList();
  },
  //时间过滤器
  filters: {
    formatDate(time) {
      return parseTime(time, "{y}-{m}-{d}");
    }
  },
  computed: {},
  methods: {
    getImgUrl(imgUrl) {
      return process.env.BASE_API + imgUrl;
    },
    edit(row){
      sessionStorage.setItem("row",JSON.stringify(row));
      this.$router.push({ path: '/news/newNews' });
    },
    del(row) {
      this.$confirm("此操作将永久删除改记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteNews(row.newsId)
            .then(response => {
              // 删除完成后重新拉取信息
              this.findNewsList();
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
    findNewsList() {
      this.searchConditions.associationId = sessionStorage.getItem("assocId");
      findNewsList(this.searchConditions)
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
      this.findNewsList();
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
