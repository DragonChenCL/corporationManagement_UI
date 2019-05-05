<template>
  <div class="container">
    <div class="carousel">
      <el-carousel height="300px">
        <el-carousel-item>
          <img src="../dashbord/img/s1.jpg" width="100%" height="100%">
        </el-carousel-item>
        <el-carousel-item>
          <img src="../dashbord/img/s2.jpg" width="100%" height="100%">
        </el-carousel-item>
        <el-carousel-item>
          <img src="../dashbord/img/s3.jpg" width="100%" height="100%">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="mainContent">
      <div class="assoc">
        <indexTitle title="社团"/>
         <!-- 路由跳转 -->
        <!-- <router-link tag="a" :to="{path:'/stu/associations/detail',query:{id:assoc.associationId}}"> -->
        <div v-for="assoc in assocs" :key="assoc.associationId" class="oneAssoc">
            <div class="name"><router-link tag="a" :to="{path:'/stu/associations/detail',query:{id:assoc.associationId}}">{{assoc.assName}}</router-link></div>
            <div class="date">{{assoc.createdDate | formatDate}}</div>
        </div>
        <!-- </router-link> -->
      </div>
      <div class="news">
        <indexTitle title="新闻"/>
        <div v-for="news in newes" :key="news.newsId" class="oneAssoc">
          <div class="name"><router-link tag="a" :to="{path:'/stu/newes/detail',query:{id:news.newsId}}">{{news.newsTitle}}</router-link></div>
          <div class="date">{{news.publishDate | formatDate}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import indexTitle from "../utils/indexTitle";
import { parseTime } from "@/utils/index";
import { findAssociationList } from "@/api/association";
import { findNewsList } from "@/api/news";

export default {
  data() {
    return {
      assocs: [],
      newes:[],
      searchCondition: {
        currentPage: 1,
        pageSize: 10,
      }
    };
  },
  components: {
    indexTitle
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
    // 获取社团列表
    geAssociationList() {
      findAssociationList(this.searchCondition)
        .then(response => {
          this.assocs = [...response.result.contents];
        })
        .catch(error => {
          Message({
            message: "查询失败！",
            type: "error",
            duration: 3 * 1000
          });
        });
    },
     // 获取新闻列表
    findNewsList() {
      findNewsList(this.searchCondition)
        .then(response => {
          this.newes = [...response.result.content];
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
.name {
  color: #606266;
  width: 80%;
  display: flex;
  margin-left: 5%;
}
.date {
  color: #999999;
  width: 20%;
  display: flex;
}
.oneAssoc {
  margin-top: 5px;
  display: flex;
}
.container {
  margin-left: 5%;
  width: 90%;
  text-align: center;
}
.mainContent {
  display: flex;
}
.carousel {
  margin-top: 5px;
}
.assoc {
  width: 49%;
}
.news {
  margin-left: 2%;
  width: 49%;
}
</style>
