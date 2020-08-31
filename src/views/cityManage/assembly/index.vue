<!-- 城市集结点 -->
<template>
  <div class="cen-male">
    <table-filter @search="getFilterList" :config="filterConfig" :searchobj.sync="filterList"></table-filter>
    <el-table :data="tableData" :header-cell-style="tabHeader" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="date" label="新增时间" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="所属城市"></el-table-column>
      <el-table-column prop="address" label="所属地图" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="date" label="集结点名称" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="位置坐标"></el-table-column>
      <el-table-column prop="name" label="关联描述"></el-table-column>
      <el-table-column prop="date" label="关联图片" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="success" v-button @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" v-button @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex-between">
      <el-button type="warning" icon="el-icon-circle-plus-outline" @click="handleAdd" size="small" plain>新增集结点</el-button>
      <Vpage :total="totalElements" :currPage="currPage" @currentChange="changePages"></Vpage>
    </div>
    <!-- 添加集结点 -->
    <add-city ref="addDom"></add-city>
  </div>
</template>

<script>
import { tabHeader } from "@/utils/tool";
import TableFilter from '@/components/TableFilter';
import Vpage from '@/components/Vpage';
import AddCity from './components/AddCity'
export default {
  data() {
    return {
      tabHeader,
      totalElements: 20,
      currPage: 1,
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
        name: '',
        city: '',
        map: ''
      },
      filterConfig: [
        {
          code: "city",
          title: "城市",
          type: 'select'
        },
        {
          code: "map",
          title: "地图",
          type: 'select'
        },
        {
          code: "name",
          title: "集结点名称",
        },
      ]
    };
  },
  components: { TableFilter, Vpage, AddCity },
  created() { },
  methods: {
    // 点击搜索
    getFilterList() { },
    handleEdit() {
      this.$refs.addDom.dialogAdd = true
    },
    // 新增集结点
    handleAdd() {
      this.$refs.addDom.dialogAdd = true
    },
    handleDelete() {
      this.$confirm('此操作将删除该集结点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'warning'
      })
    },
    // 点击分页
    changePages() { }
  }
}

</script>
<style lang='less' scoped>
</style>