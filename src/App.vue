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
</style>

