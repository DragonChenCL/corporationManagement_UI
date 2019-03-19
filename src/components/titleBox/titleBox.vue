<template>
  <div class="title-box-container">
    <!-- <div class="my-box"></div> -->
    <h2 class="my-title" >{{titleValue}}</h2>
  </div>
</template>

<script>
export default {
  props: {
    titleValue: String,
  }
}
</script>

<style scoped>
  .title-box-container {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #dcdfe6;
    box-sizing: border-box;
    position: relative;
  }
  .title-box-container .my-title {
    
    height: 40px;
    line-height:40px;
    font-size: 16px;
    font-weight: 600;
    padding-left: 30px;
  }
  .title-box-container .my-title::before {
    display: inline-block;
    /* margin-top: 5px; */
    content: "";
    width: 8px;
    height: 30px;
    background-color: #4EC29B;
    position: absolute;
    left: 10px;
    top:5px;
  }
  /* .clearfix:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
    }
  .clearfix {
    zoom:1
  } */
</style>
