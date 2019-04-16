<template>
  <div class="attachment-container">
    <el-card class="box-card" shadow="hover">
      <title-box :titleValue="title"></title-box>
      <el-form ref="postForm" :model="postForm" class="form-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.newsTitle" :maxlength="100" name="name" required>标题</MDinput>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label-width="45px" label="作者:" class="postInfo-container-item">
              <el-input v-model="postForm.author" filterable remote placeholder="填写作者"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="80px" label="发布时间:" class="postInfo-container-item">
              <el-date-picker
                v-model="postForm.publishDate"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择发布时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="height:200px">
            <quill-editor
              v-model="postForm.newsContent"
              :options="editorOption"
              style="height:200px"
            ></quill-editor>
          </el-col>
        </el-row>
      </el-form>
      <div style="margin-top:100px">
        <el-button type="primary" icon="upload" size="mini" @click="imagecropperShow=true">点我，更换图片</el-button>
      </div>
      <div style="margin-top:20px">
        <img :src="getImgUrl()" width="118px" height="118px">
      </div>
      <!-- 上传头像的组件 -->
      <image-cropper
        v-show="imagecropperShow"
        field="file"
        :width="300"
        :height="300"
        :key="imagecropperKey"
        :url="imgUrl"
        :params="postForm"
        lang-type="zh"
        @close="imagecropperShow = false"
        @crop-upload-success="cropSuccess"
      />
      <div class="footer">
        <el-button type="primary" @click="commit()">确 定</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import titleBox from "@/components/titleBox/titleBox";
import { Message } from "element-ui";
import { parseTime } from "@/utils/index";
import ImageCropper from "@/components/ImageCropper";
import MDinput from "@/components/MDinput";
import { quillEditor } from "vue-quill-editor";
import { updateNews } from "@/api/news";

export default {
  data() {
    return {
      title: "新闻管理-新增",
      editorOption: {
        // modules: {
        //   toolbar: [
        //     ["bold", "italic", "underline", "strike","blockquote","clean"], // toggled buttons
        //     ["blockquote", "code-block"],
        //     [{ 'indent': '-1'}, { 'indent': '+1' }],
        //     [{ 'direction': 'rtl' }]
        //   ]
        // }
      },
      imagecropperKey: 0,
      imagecropperShow: false,
      imgUrl: process.env.BASE_API + "/news/newsImg",
      postForm: {
        newsId: "",
        newsContent: "",
        author: "",
        newsTitle: "",
        publishDate: "",
        newsImg: "x",
        associationId: ""
      }
    };
  },
  created() {
    this.edit();
  },
  filters: {},
  mounted() {
    this.changeTitle();
  },
  methods: {
    changeTitle() {
      if (this.postForm.newsId == "") {
        this.title = "新闻管理-新增";
      } else {
        this.title = "新闻管理-修改";
      }
    },
    getImgUrl() {
      return process.env.BASE_API + this.postForm.newsImg;
    },
    commit() {
      this.updateNews();
    },
    edit() {
      if (sessionStorage.getItem("row") != null) {
        this.postForm = JSON.parse(sessionStorage.getItem("row"));
        sessionStorage.removeItem("row");
      }
    },
    updateNews() {
      this.postForm.associationId = sessionStorage.getItem("assocId");
      updateNews(this.postForm).then(response => {
        Message({
          message: "新建成功！",
          type: "success",
          duration: 3 * 1000
        });
        this.$router.push({ path: "/news/newsList" });
      });
    },
    cropSuccess(resData) {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
      this.postForm.newsImg = resData.result;
      Message({
        message: "图片上传成功！",
        type: "success",
        duration: 3 * 1000
      });
    }
  },
  components: {
    titleBox,
    MDinput,
    quillEditor,
    ImageCropper
  }
};
</script>

<style scoped>
.footer {
  text-align: right;
  margin: 20px;
}
</style>
