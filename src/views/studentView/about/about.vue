<template>
  <div class="container">
    <div class="img">
      <!-- <img src="../associations/img/社团之家.png" alt width="100%" height="100px"> -->
    </div>
    <div class="associations-main">
      <div class="associations-assoc">
        <div style="width:80%;margin:auto">
           <h2 id="aboutme">关于我们</h2>
           <hr>
        <p style="text-indent:2em;font-size:20px">
          社团网申系统主要为学生提供社团，学生可通过该系统查看了解社团情况，并可通过该系统申请加入社。
          管理者可通过该系统对社团信息、成员等进行管理...社联以主席团为中心，
          在主席团的带领下，各职能部和专职类的积极配合，紧密围绕校团委在各个时期的中心任务，本着立足社团、服务社团的精神，
          发扬民主，协调管理，指导各学生社团活动的开展，在服务上，社联努力为各学生社团解决一些后顾之忧，
          使各社团能够将全部精力投入到工作中，同时社联会集中力量对优势活动、精品活动展开全方位立体式宣传。
          在管理上，社联以社团工作更加完整化、规范化为目的，建立一套相对完善的管理体制，实施规范化管理。
        </p>
        <h2 id="joinus">社联章程</h2>
        <hr>
        <h4>第一章 总则</h4>

        <p style="font-size:20px">
          <strong>第一条</strong> 学生社团作为高等学校学生综合素质培养的一个重要载体，
          在校园文化建设中发挥着不可替代的作用。为了健全和完善我校学生社团的管理体制，
          促进和保障学生社团积极健康的发展，进一步活跃校园文化生活，培养综合素质全方面发展的跨世纪人才，特制订本章程。
        </p>

        <p style="font-size:20px">
          <strong>第二条</strong>
          学生社团是在校团委领导下由我校在籍本、专科生、研究生按照自愿的原则组织和参加的群众性学生组织。
        </p>

        <p style="font-size:20px">
          <strong>第三条</strong> 学生社团应在坚持四项基本原则，遵守国家法律、法规和校纪、校规的基础上，
          以丰富校园文化生活，弘扬校园主旋律为根本宗旨，利用课余时间，创造性的开展理论教育，
          科技创新，文化体育等丰富多彩的活动，按照自我教育、
          自我管理、自我服务的要求，突出思想性、学术性、知识性、趣味性。提高大学生综合素质， 为同学的全面成才服务。
        </p>
        <h2 id="address">联系方式</h2>
        <hr>
        <p style="font-size:20px">地址：大学生社团联合会</p>
        <p style="font-size:20px">E-mail：chenlong_qrr@163.com</p>
        <p style="font-size:20px">电话：010-88888888</p>
        <p style="font-size:20px">宗旨：服务·指导·监督</p>
        </div>
      </div>
      <div class="associations-category">
        <indexTitle title="目录"/>
        <el-button class="pan-btn" type="primary"  style="margin-top:10px;margin-left:10px">关于我们</el-button>
        <el-button class="pan-btn" type="primary"  style="margin-top:10px">社联章程</el-button>
        <el-button class="pan-btn" type="primary"  style="margin-top:10px">联系方式</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import indexTitle from "../utils/indexTitle";
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
  created() {},
  methods: {
    tiaozhuan(){
      location = '#joinus';
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
