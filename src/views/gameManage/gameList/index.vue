<!-- 游戏列表 -->
<template>
  <div class="cen-male">
    <table-filter @search="getFilterList" :config="filterConfig" :searchobj.sync="filterList"></table-filter>
    <el-table :data="tableData" :header-cell-style="tabHeader" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="游戏id"></el-table-column>
      <el-table-column prop="name" label="用户姓名"></el-table-column>
      <el-table-column prop="address" label="游戏状态" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="date" label="开始时间" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="结束时间" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="城市"></el-table-column>
      <el-table-column prop="date" label="地图" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="游戏类型"></el-table-column>
      <el-table-column prop="name" label="累计游戏费用" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="累计代金券" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="date" label="累计余额金额" width="110" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="累计支付金额" width="110" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="累计奖励金额" width="110" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="success" v-button @click="handleEdit(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="游戏详情" :visible.sync="dialogAdd" width="1100px" center>
      <el-form :model="formAdd" label-width="150px" class="cen-form cen-editor" ref="formAdd">
        <el-form-item label="游戏id:" prop="username">
          <el-input v-model.trim="formAdd.username" autocomplete="off" placeholder="账号" maxlength="20" clearable></el-input>
        </el-form-item>
        <el-form-item label="游戏状态：" prop="password">
          <el-input v-model.trim="formAdd.password" autocomplete="off" placeholder="密码" clearable></el-input>
        </el-form-item>
        <el-form-item label="游戏地址：" prop="phone">
          <el-input v-model.trim="formAdd.phone" autocomplete="off" placeholder="游戏地址" maxlength="11" clearable></el-input>
        </el-form-item>
        <el-form-item label="游戏类型：" prop="phone">
          <el-input v-model.trim="formAdd.phone" autocomplete="off" placeholder="游戏类型" maxlength="11" clearable></el-input>
        </el-form-item>
        <h4 class="cen-title">玩家及交易信息：</h4>
        <el-table :data="gameList" :header-cell-style="tabHeader" show-summary>
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="date" label="玩家姓名"></el-table-column>
          <el-table-column prop="name" label="玩家角色"></el-table-column>
          <el-table-column prop="address" label="是否锁定" show-overflow-tooltip></el-table-column>
          <el-table-column prop="date" label="健康值"></el-table-column>
          <el-table-column prop="name" label="游戏结果"></el-table-column>
          <el-table-column prop="gameMoney" label="累计游戏费用" show-overflow-tooltip></el-table-column>
          <el-table-column prop="gameMoney" label="累计代金券" show-overflow-tooltip></el-table-column>
          <el-table-column prop="gameMoney" label="累计余额金额"></el-table-column>
          <el-table-column prop="gameMoney" label="累计奖励金额"></el-table-column>
        </el-table>
        <div class="cen-sum">收入：251222元</div>
      </el-form>
    </el-dialog>
    <Vpage :total="totalElements" :currPage="currPage" @currentChange="changePages"></Vpage>
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
      dialogAdd: false,
      totalElements: 20,
      currPage: 1,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      gameList: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '20',
        gameMoney: 20
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '30',
        gameMoney: 20
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '40',
        gameMoney: 20
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '60',
        gameMoney: 20
      }],
      formAdd: {},
      filterList: {
        applicateTime: '',
        city: '',
        sex: '',
        name: ''
      },
      filterConfig: [
        {
          code: "applicateTime",
          title: "支付时间",
          type: 'date'
        },
        {
          code: "city",
          title: "城市",
          type: 'select'
        },
        {
          code: "sex",
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
    handleEdit() {
      this.dialogAdd = true
    },
    // 点击分页
    changePages() { }
  }
}

</script>
<style lang='less' scoped>
.cen-form{
  .cen-title{
    margin:20px 20px 10px 20px;
    font-size: 18px;
  }
  .el-table{
    // margin:0 20px;
  }
}

.cen-sum{
  font-size:18px;
  text-align: right;
  margin-top:20px;
  padding:0 20px;
  color:#d62929;
}
</style>