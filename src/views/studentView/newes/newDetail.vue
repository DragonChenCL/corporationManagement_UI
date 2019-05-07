<template>
  <div class="container">
    <div class="img">
      <!-- <img src="../assoc/img/社团之家.png" alt width="100%" height="100px"> -->
    </div>
    <div class="assoc-main">
        <div class="assoc-category">
        <indexTitle title="图册"/>
         <img :src="newsDetail.newsImg" alt="" width="85%" style="margin-top:25px">
      </div>
      <div class="assoc-assoc">
        <indexTitle title="新闻详情"/>
        <div class="assoc">
          <el-card class="box-card-component">
            <div slot="header" class="box-card-header">
              <div class="news_title">
                <div class="title">新闻标题：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="newsDetail.newsTitle"/>
                </div>
              </div>
              <div class="news_assoc_name">
                <div class="title">所属社团：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="newsDetail.assName"/>
                </div>
              </div>
            </div>
            <div class="body">
              <div class="publish_date" style="display:flex">
                <div class="title">发布时间：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="newsDetail.publishDate"/>
                </div>
              </div>
              <div class="author common" style="display:flex">
                <div class="title">作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;者：</div>
                <div class="content">
                  <mallki class-name="mallki-text" :text="newsDetail.author"/>
                </div>
              </div>
              <div class="news_content common" style="display:flex">
                <div class="title">内&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;容：</div>
                <div class="content">
                  <quill-editor
                    v-model="newsDetail.newsContent"
                    class="editor"
                    :options="editorOption"
                    @focus="onEditorFocus($event)"
                  ></quill-editor>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    
    </div>
  </div>
</template>

<script>
import indexTitle from "../utils/indexTitle";
import { parseTime } from "@/utils/index";
import { findApplys } from "@/api/apply";
import { findNewsById } from "@/api/news";
import Mallki from "@/components/TextHoverEffect/Mallki";
import { quillEditor } from "vue-quill-editor";
import { Message } from "element-ui";

export default {
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ["clean"] // toggled buttons
            // ["blockquote", "code-block"],
            // [{ 'indent': '-1'}, { 'indent': '+1' }],
            // [{ 'direction': 'rtl' }]
          ]
        }
      },
      newsId: "",
      newsDetail: {
        newsId: "",
        assName: "",
        newsTitle: "",
        newsContent: "",
        publishDate: "",
        newsImg: "",
        author: ""
      },
      applys: []
    };
  },
  components: {
    indexTitle,
    Mallki,
    quillEditor
  },

  //时间过滤器
  filters: {
    formatDate(time) {
      return parseTime(time, "{y}/{m}/{d}");
    }
  },
  created() {
    this.newsId = this.$route.query.id;
    this.findNewsById();
  },
  methods: {
    onEditorFocus(val) {
      // 富文本获得焦点时的事件
      console.log(val); // 富文本获得焦点时的内容
      editor.enable(false); // 在获取焦点的时候禁用
    },
    findNewsById() {
      findNewsById(this.$route.query.id)
        .then(res => {
          this.newsDetail = { ...res.result };
          this.newsDetail.newsImg =
            process.env.BASE_API + this.newsDetail.newsImg;
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "获取新闻信息失败!"
          });
        });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor {
  width: 400px;
  height: 200px;
}
.img {
  width: 60px;
  height: 60px;
  margin-top: -10px;
  margin-left: 70px;
}
.common {
  margin-top: 20px;
}
.content {
  margin-top: 2px;
}
.title {
  color: #606266;
}
.news_title {
  //   margin-top: 15px;
  display: flex;
}
.news_assoc_name {
  display: flex;
  margin-left: 53%;
}
.create_apply {
  margin-top: 10px;
}
.apply {
  margin-left: 12px;
  margin-top: 10px;
}
.main {
  display: flex;
}
.main_content {
  color: #303133;
}
.main_name {
  color: #3294d0;
}
.time {
  font-size: 14px;
  margin-top: 2px;
  display: flex;
  flex-direction: row-reverse;
  margin-right: 9px;
  color: #909399;
}
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
.assoc-main {
  display: flex;
  height: 80%;
}
.assoc {
  width: 90%;
  display: flex;
  flex-wrap: wrap;
}
.assoc-category {
  width: 20%;
}
.assoc-assoc {
  //   display: flex;
  width: 80%;
}
.box-card-component {
  background: url("../newes/img/背景图.png") no-repeat;
  background-size: 100% 100%;
  // background-color: #f2f6fc;
  margin-top: 20px;
  margin-left: 85px;
  width: 90%;
  height: 500px;
  .el-card__header {
    padding: 0px !important;
  }
  .box-card-header {
    display: flex;
  }
}
</style>
