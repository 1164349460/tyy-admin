<!-- 组局失败 -->
<template>
  <div class="cen-male">
    <table-filter @search="getFilterList" :config="filterConfig" :searchobj.sync="filterList"></table-filter>
    <el-table :data="tableData" :header-cell-style="tabHeader" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="date" label="支付时间" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="用户名" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="address" label="城市" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="date" label="意向地图" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="意向时间"></el-table-column>
      <el-table-column prop="name" label="游戏人数"></el-table-column>
      <el-table-column prop="date" label="锁定角色" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="游戏类型"></el-table-column>
      <el-table-column prop="name" label="游戏费用"></el-table-column>
      <el-table-column prop="name" label="代金券金额" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="date" label="余额金额" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="支付金额"></el-table-column>
      <el-table-column prop="name" label="退款金额"></el-table-column>
      <el-table-column prop="date" label="失败时间" width="150" show-overflow-tooltip></el-table-column>
    </el-table>
    <div class="flex-between">
      <div>
        <el-tag type="success">累计支付金额：45121元</el-tag>
        <el-tag type="danger">累计退款金额：45121元</el-tag>
      </div>
      <Vpage :total="totalElements" :currPage="currPage" @currentChange="changePages"></Vpage>
    </div>
  </div>
</template>

<script>
import { tabHeader } from "@/utils/tool";
import TableFilter from '@/components/TableFilter';
import Vpage from '@/components/Vpage';
export default {
  data() {
    return {
      tabHeader,
      totalElements: 20,
      currPage: 1,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        type: '单机游戏'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        type: '单机游戏'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        type: '单机游戏'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        type: '单机游戏'
      }],
      filterList: {
        name: '',
        payforTime: '',
        city: '',
        gameType: ''
      },
      filterConfig: [
        {
          code: "payforTime",
          title: "支付时间",
          type: 'date'
        },
        {
          code: "city",
          title: "城市",
          type: 'select'
        },
        {
          code: "gameType",
          title: "游戏类型",
          type: 'select'
        },
        {
          code: "name",
          title: "用户名",
        },
      ]
    };
  },
  components: { TableFilter, Vpage },
  created() { },
  methods: {
    // 点击搜索
    getFilterList() { },
    // 点击分页
    changePages() { }
  }
}

</script>
<style lang='less' scoped>
</style>