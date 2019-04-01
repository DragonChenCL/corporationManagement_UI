<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
.el-input.is-disabled .el-input__inner {
background-color: #fff;
color: #606266;
}
.el-textarea.is-disabled .el-textarea__inner{
  background-color: #fff;
  color: #606266;
}
.attachment-container{
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  background-color: #e3e3e3;
  min-height: 100vh;
  padding: 50px 60px 0px;
  color: #606266;
}
</style>

