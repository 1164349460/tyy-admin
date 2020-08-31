<!-- 提现管理 -->
<template>
  <div class="cen-male">
    <table-filter @search="getFilterList" :config="filterConfig" :searchobj.sync="filterList"></table-filter>
    <el-table :data="tableData" :header-cell-style="tabHeader" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="date" label="提现时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="支付单号"></el-table-column>
      <el-table-column prop="address" label="用户名" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="date" label="历史累计提现金额" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="提现金额"></el-table-column>
      <el-table-column prop="name" label="提现状态"></el-table-column>
      <el-table-column prop="date" label="提现前余额" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="当前余额"></el-table-column>
      <el-table-column label="操作" width="170" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="success" v-button @click="handleEdit(scope.row.id)">审核通过</el-button>
          <el-button size="mini" type="danger" v-button @click="handleReject(scope.row.id)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Vpage :total="totalElements" :currPage="currPage" @currentChange="changePages"></Vpage>
    <el-dialog title="提现审核" :visible.sync="dialogAdd" width="700px" center>
      <el-form :model="formData" label-width="150px" class="cen-form cen-editor" ref="formData">
        <el-form-item label="用户Id：" prop="phone">
          <el-input v-model.trim="formData.userId" autocomplete="off" placeholder="用户Id" readonly clearable></el-input>
        </el-form-item>
        <el-form-item label="提现金额：" prop="username">
          <el-input v-model.trim="formData.inforMoney" autocomplete="off" placeholder="用户名" readonly clearable></el-input>
        </el-form-item>
        <el-form-item label="当前余额：" prop="username">
          <el-input v-model.trim="formData.nowMoney" autocomplete="off" placeholder="用户名" readonly clearable></el-input>
        </el-form-item>
        <el-form-item label="历史累计体现：" prop="password">
          <el-input v-model.trim="formData.allMoney" autocomplete="off" placeholder="性别" readonly clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" v-button @click="dialogAdd=false">取 消</el-button>
          <el-button size="medium" type="primary" v-button @click="submitForm('formData')">同意提现</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      dialogAdd: false,
      formData: {
        userId: '66666',
        inforMoney: '200',
        nowMoney: '300',
        allMoney: '400'
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
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
    // 审核通过
    handleEdit() {
      this.dialogAdd = true
      // this.$confirm('此操作将通过该笔订单的提现, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      //   center: true
      // }).then(() => {

      // })
    },
    // 拒绝  
    handleReject() {
      this.$message.success('您已成功拒绝该笔订单的提现')
    },
    // 点击分页
    changePages() { },
    // 同意体现
    submitForm() { 
      this.dialogAdd = false
    }
  }
}

</script>
<style lang='less' scoped>
</style>