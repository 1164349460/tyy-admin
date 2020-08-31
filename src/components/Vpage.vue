<!-- 封装分页 -->
<template>
  <div class="v-page">
    <el-pagination background layout="total,prev, pager, next" :total="total" :page-size="pageSize" :current-page="currPage" @current-change="changePages"></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
    };
  },
  components: {},
  created() { },
  methods: {
    changePages(e) {
      this.$emit('currentChange', e)
    }
  }
}

</script>
<style lang='less' scoped>
.v-page {
  margin: 20px 0;
  text-align: right;
}
</style>