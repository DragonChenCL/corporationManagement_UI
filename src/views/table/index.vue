<template>
  <div class="app-container">
    <div class="block">
      <span class="demonstration">精彩瞬间</span>
      <el-carousel height="300px" type="card" interval="3000">
        <el-carousel-item v-for="item in username" :key="item">
          <img :src=url+item alt="" height="300px" width="500px">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { getAssociationInfo } from '@/api/association';
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      username : "",
      url: process.env.BASE_API
    };
  },
  created()  {
    this.getAssociationInfo1()
  },
  computed : {
    ...mapGetters(["assocId"])
  },
  methods: {
      getAssociationInfo1(){
        getAssociationInfo(this.assocId).then(response =>{
          const data = response.result
          this.username = data.momentImgs
        }).catch(error =>{
          reject(error)
        })
      }
  }
};
</script>

<style>

.block{
  width: 1000px;
  margin: auto;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: #606266;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
