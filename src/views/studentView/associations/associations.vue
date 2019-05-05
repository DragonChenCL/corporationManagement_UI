<template>
  <div class="container">
    <div class="img">
      <!-- <img src="../associations/img/社团之家.png" alt width="100%" height="100px"> -->
    </div>
    <div class="associations-main">
      <div class="associations-assoc">
        <indexTitle title="社团之家"/>
        <div class="associations">
          <el-card class="box-card-component" v-for="assoc in assocs " :key="assoc.associationId">
            <div slot="header" class="box-card-header">
              <router-link tag="a" :to="{path:'/stu/associations/detail',query:{id:assoc.associationId}}">
                <img :src="assoc.logo">
              </router-link>
            </div>

            <mallki class-name="mallki-text" :text="assoc.assName"/>
          </el-card>
        </div>
      </div>
      <div class="associations-category">
        <indexTitle title="社团分类"/>
        <el-button class="pan-btn" type="primary" @click="changeAssoc()" style="margin-top:10px">全部</el-button>
        <div class="category" v-for="category in categorys" :key="category.categoryId">
          <el-button
            class="pan-btn"
            type="primary"
            @click="changeAssoc(category.categoryId)"
          >{{category.categoryName}}</el-button>
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

export default {
  data() {
    return {
      assocs: [],
      categorys: [],
      searchCondition: {
        currentPage: 1,
        pageSize: 100,
        categoryId: ""
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
    this.getCatrgory();
  },
  methods: {
    changeAssoc(id) {
      this.searchCondition.categoryId = id;
      this.geAssociationList();
      Message({
        message: "查询成功！",
        type: "success",
        duration: 3 * 1000
      });
    },
    getCatrgory() {
      getCatrgory()
        .then(res => {
          this.categorys = [...res.result];
        })
        .catch(error => {});
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
.associations-main {
  display: flex;
  height: 80%;
}
.associations {
  width: 90%;
  display: flex;
  flex-wrap: wrap;
}
.associations-category {
  width: 20%;
}
.associations-assoc {
  //   display: flex;
  width: 80%;
}
.box-card-component {
  background-color: #f2f6fc;
  margin-top: 30px;
  margin-left: 65px;
  width: 150px;
  height: 180px;
  .el-card__header {
    padding: 0px !important;
  }
  .box-card-header {
    position: relative;
    img {
      width: 100px;
      height: 100px;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
}
</style>
