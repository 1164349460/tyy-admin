<!-- 男神女神管理 -->
<template>
  <div class="cen-male">
    <table-filter @search="getFilterList" :config="filterConfig" :searchobj.sync="filterList"></table-filter>
    <el-table :data="tableData" :header-cell-style="tabHeader" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="date" label="申请时间" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="注册城市"></el-table-column>
      <el-table-column prop="address" label="用户id" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="date" label="用户名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="性别"></el-table-column>
      <el-table-column prop="name" label="审核状态"></el-table-column>
      <el-table-column prop="date" label="审核时间" width="120px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="审核理由"></el-table-column>
      <el-table-column label="操作" width="160" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="success" v-button @click="handleEdit(scope.row.id)">详情</el-button>
          <el-button size="mini" type="warning" v-button @click="handleApprove(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Vpage :total="totalElements" :currPage="currPage" @currentChange="changePages"></Vpage>
    <el-dialog title="待审核信息" :visible.sync="dialogAdd" width="700px" center>
      <el-form :model="formAdd" label-width="150px" class="cen-form cen-editor" ref="formAdd">
        <el-form-item label="注册城市：" prop="phone">
          <el-input v-model.trim="formAdd.phone" autocomplete="off" placeholder="注册城市" maxlength="11" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户名ID：" prop="username">
          <el-input v-model.trim="formAdd.username" autocomplete="off" placeholder="用户名" maxlength="20" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户名：" prop="username">
          <el-input v-model.trim="formAdd.username" autocomplete="off" placeholder="用户名" maxlength="20" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="password">
          <el-input v-model.trim="formAdd.password" autocomplete="off" placeholder="性别" clearable></el-input>
        </el-form-item>
        <el-form-item label="申请时间：" prop="phone">
          <el-input v-model.trim="formAdd.phone" autocomplete="off" placeholder="申请时间" maxlength="11" clearable></el-input>
        </el-form-item>
        <el-form-item label="申请照片：" prop="phone">
          <img src="../../../assets/images/logo.png" class="user-img" />
          <img src="../../../assets/images/logo.png" class="user-img" />
          <img src="../../../assets/images/logo.png" class="user-img" />
        </el-form-item>
        <el-form-item label="是否通过审核：" prop="phone">
          <el-radio-group v-model="formAdd.resource">
            <el-radio label="通过"></el-radio>
            <el-radio label="不通过"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="理由" prop="phone">
          <el-input type="textarea" v-model.trim="formAdd.phone" autocomplete="off" placeholder="请填写理由" maxlength="11" style="width:220px" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" v-button @click="dialogAdd=false">取 消</el-button>
          <el-button size="medium" type="primary" v-button @click="submitForm('formAdd')">提 交</el-button>
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
      formAdd: {},
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
      }, {
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
          title: "申请时间",
          type: 'date'
        },
        {
          code: "city",
          title: "城市",
          type: 'select'
        },
        {
          code: "sex",
          title: "性别",
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
    handleApprove() {
      this.dialogAdd = true
    },
    // 点击分页
    changePages(e) { },
    // 提交审核
    submitForm(formName) { },
  }
}

</script>
<style lang='less' scoped>
.cen-form {
  .user-img {
    width: 80px;
    height: 80px;
  }
}
</style>