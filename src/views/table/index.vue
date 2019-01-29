<template>
  <div class="app-container">
    <div class="block">
      <span class="demonstration">精彩瞬间</span>
      <el-carousel height="200px">
        <el-carousel-item v-for="item in 2" :key="item">
          <h3>{{ username }}</h3>
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
      username : 'adasd'
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
          this.username = data.honors[0]
        }).catch(error =>{
          reject(error)
        })
      }
  }
};
</script>

<style>
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
