<template>
  <div class="container">
      <div class="index_title">
        <p>{{title}}</p>
        <div>❥(^_-)</div>
    </div>
  </div>
</template>
<script>
export default {
  name:"indexTitle",
  props:['title'],
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.index_title {
	border-bottom: 1px solid #ccc;
	overflow: hidden;
	padding-bottom: 5px;
	line-height: 30px;
  margin: 0;
  padding: 0;
  font-family: "微软雅黑", "黑体";
}
.index_title p {
	float: left;
	background: url(../dashbord/img/title.jpg) no-repeat left center;
	padding-left: 15px;
	color: #333;
	font-size: 16px;
	font-weight: 600;
  margin-bottom: 3px;
}
.index_title div {
	float: right;
  color: #999;
  font-size: 12px;
  margin: 15px 15px 3px 0px;
}
.index_title div a {
	font-size: 12px;
	color: #666;
}
</style>
