<template>
  <div class="container">
    <div class="img">
      <!-- <img src="../newes/img/社团之家.png" alt width="100%" height="100px"> -->
    </div>
    <div class="newes-main">
      <div class="newes-category">
        <indexTitle title="社团"/>
        <el-button class="pan-btn" type="primary" @click="changeNews()" style="margin-top:10px">全部</el-button>
        <div class="category" v-for="assoc in assocs" :key="assoc.associationId">
          <el-button
            class="pan-btn"
            type="primary"
            @click="changeNews(assoc.associationId)"
          >{{assoc.assName}}</el-button>
        </div>
      </div>
      <div class="newes-assoc">
        <indexTitle title="新闻之家"/>
        <div class="newes">
          <el-card class="box-card-component">
            <div slot="header" class="box-card-header">
              <el-row style="color:#000000">
                <el-col :span="8">标题</el-col>
                <el-col :span="8" style="text-align:center">发布人</el-col>
                <el-col :span="8" style="text-align:center">发布时间</el-col>
              </el-row>
            </div>
          </el-card>
          <el-card class="box-card-component" v-for="news in newes " :key="news.newsId">
            <div slot="header" class="box-card-header">
                <!-- 路由跳转 -->
              <router-link tag="a" :to="{path:'/stu/newes/detail',query:{id:news.newsId}}">
                <el-row>
                  <el-col :span="8">
                    <mallki class-name="mallki-text" :text="news.newsTitle"/>
                  </el-col>
                  <el-col :span="8" style="text-align:center;color:#909399">{{news.author}}</el-col>
                  <el-col :span="8" style="text-align:center;color:#909399">{{news.publishDate | formatDate}}</el-col>
                </el-row>
              </router-link>
            </div>
          </el-card>
          <div class="page-container">
            <el-pagination
              :current-page.sync="searchConditions.currentPage"
              :page-sizes="[5, 10]"
              :page-size.sync="searchConditions.pageSize"
              layout="total, sizes, prev, pager, next"
              :total="total"
              style="margin-top:30px"
            ></el-pagination>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import indexTitle from "../utils/indexTitle";
import { parseTime } from "@/utils/index";
import { findAssociationList } from "@/api/association";
import { getCatrgory } from "@/api/category";
import Mallki from "@/components/TextHoverEffect/Mallki";
import { Message } from "element-ui";
import { findNewsList } from "@/api/news";

export default {
  data() {
    return {
      total: 0,
      assocs: [],
      categorys: [],
      newes: [],
      searchCondition: {
        currentPage: 1,
        pageSize: 100,
        categoryId: "",
        status:"1"
      },
      searchConditions: {
        currentPage: 1,
        pageSize: 100,
        associationId: "",
        
      }
    };
  },
  components: {
    indexTitle,
    Mallki
  },
  //时间过滤器
  filters: {
    formatDate(time) {
      return parseTime(time, "{y}/{m}/{d}");
    }
  },
  created() {
    this.geAssociationList();
    this.findNewsList();
  },
  methods: {
    // 获取新闻列表
    findNewsList() {
      findNewsList(this.searchConditions)
        .then(response => {
          this.newes = [...response.result.content];
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
    changeNews(id) {
      this.searchConditions.associationId = id;
      this.findNewsList();
      Message({
        message: "查询成功！",
        type: "success",
        duration: 3 * 1000
      });
    },
    // 获取社团列表
    geAssociationList() {
      findAssociationList(this.searchCondition)
        .then(response => {
          this.assocs = [...response.result.contents];
          //将社团logo网址替换
          for (let i = 0; i < this.assocs.length; i++) {
            this.assocs[i].logo = process.env.BASE_API + this.assocs[i].logo;
          }
        })
        .catch(error => {
          Message({
            message: "查询失败！",
            type: "error",
            duration: 3 * 1000
          });
        });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.page-container {
  margin-top: 30px;
  text-align: center;
  margin: auto;
}
.category {
  margin-top: 10px;
}
.pan-btn {
  height: 35px;
  line-height: 10px;
  width: 90%;
  font-size: 14px;
  color: #fff;
  padding: 14px 36px;
  border-radius: 8px;
  border: none;
  outline: none;
  transition: 600ms ease all;
  position: relative;
  display: inline-block;
  &:hover {
    background: #fff;
    color: #409eff;
    &:before,
    &:after {
      width: 100%;
      transition: 600ms ease all;
    }
  }
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    transition: 400ms ease all;
  }
  &::after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }
}
.container {
  margin-top: 5px;
  margin-left: 5%;
  width: 90%;
  text-align: center;
}
.newes-main {
  display: flex;
  height: 80%;
}
.newes {
  width: 90%;
  display: flex;
  flex-wrap: wrap;
}
.newes-category {
  width: 20%;
}
.newes-assoc {
  //   display: flex;
  width: 80%;
}
.box-card-component {
  background-color: #f2f6fc;
  margin-top: 20px;
  margin-left: 65px;
  width: 90%;
  height: 50px;
  .el-card__header {
    padding: 0px !important;
  }
  .box-card-header {
    text-align: left;
  }
}
</style>
