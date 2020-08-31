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

<style lang="less">
@import url(./assets/css/base.css);
@import url(./assets/css/common.css);
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  font-size: 14px;
  background-color: #f5f5f5;
}

.el-table th.is-leaf,
.el-table td {
  text-align: center;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-select,.el-textarea,.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100%;
}

.el-dialog__header {
  text-align: center;
  font-weight: 700;
  font-size: 20px;
}

.cen-editor.el-form{
  background-color: #f5f5f5;
  padding:20px 0;
  .el-input{
    width: 220px;
  }
}

.el-input__inner{
  height: 35px;
  line-height: 35px;
}
</style>
