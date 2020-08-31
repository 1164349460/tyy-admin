<!-- 员工信息 -->
<template>
  <div class="pageContainer">
    <table-filter @search="getFilterList" :config="filterConfig" :searchobj.sync="filterList"></table-filter>
    <div class="table-box">
      <el-table :data="dataList" :header-cell-style="tabHeader">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="name" label="姓 名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sex" label="性 别" width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.sex | sexStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年 龄" width="60"></el-table-column>
        <el-table-column prop="departmentName" label="部 门" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mobile" label="手 机" width="160"></el-table-column>
        <el-table-column prop="contractStatus" label="合同状态" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.contractStatus | contractStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="labelList" label="员工标签" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.labelList" :key="item.id" type="danger">{{item.labelName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="entryDate" label="入职日期" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.entryDate | shorttime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="320" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="success" v-button @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="warning" v-button @click="handleLeave(scope.row)">设置离职</el-button>
            <el-button size="mini" type="danger" v-button @click="handleDelete(scope.row.id)">删除</el-button>
            <el-button v-show="scope.row.acctStatus==1" size="mini" type="danger" v-button @click="updateAcctStatus(scope.row,2)">冻结</el-button>
            <el-button v-show="scope.row.acctStatus==2" size="mini" type="success" v-button @click="updateAcctStatus(scope.row,1)">解冻</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 view-bottom-->
      <div class="flex-between">
        <div>
          <el-button type="primary" plain size="medium" icon="el-icon-plus" v-button @click="$router.push('/admin/employeeDetail')">新增</el-button>
          <a :href="importMouldUrl">
            <el-button type="primary" plain size="medium" icon="el-icon-download" style="margin-left:6px;height:35px">下载导入模板</el-button>
          </a>
          <el-button type="primary" plain size="medium" icon="el-icon-upload" style="margin-left:6px;height:35px" v-button @click="importHandle">员工信息导入</el-button>
        </div>
        <Vpage :total="totalElements" :currPage="currPage" @currentChange="changePages"></Vpage>
      </div>
    </div>

    <!-- 员工信息导入 -->
    <employee-import ref="importDom"></employee-import>

    <el-dialog title="设置离职" :visible.sync="dialogQuit" width="470px" :close-on-click-modal="false" center>
      <el-form :model="quitInfo" size="small" :rules="quitRules" label-width="150px" ref="quitForm" class="verticalForm">
        <el-form-item label="离职日期" prop="quitJobApplyTime">
          <el-date-picker value-format="yyyy-MM-dd" v-model="quitInfo.quitJobApplyTime" type="date" placeholder="选择离职日期"></el-date-picker>
        </el-form-item>
        <el-form-item class="cen-submit">
          <el-button size="mini" v-button @click="dialogQuit=false">取 消</el-button>
          <el-button size="mini" type="primary" v-button @click="submitQuit('quitForm')">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import TableFilter from '@/components/TableFilter';
import Vpage from '@/components/Vpage';
import EmployeeImport from './components/EmployeeImport';
import { tabHeader, toTree, filterTime } from "@/utils/tool";
import { employeeSearchPage, searchDepart, employeeDelete, employeesExcelUrl, employeeLeave, employeefreeze, employeeCancelFreeze } from "@/api/api";
export default {
  data() {
    return {
      tabHeader: tabHeader,
      importMouldUrl: employeesExcelUrl,
      dataList: [],
      currPage: 1, //当前页数
      totalElements: 0, //一共多少条数据
      departProps: { value: 'id', label: 'orgname', checkStrictly: true, emitPath: false },
      departTree: [],
      filterList: {
        departmentId: "",
        name: "",
        startAge: "",
        endAge: "",
        contractStatus: "",
      },
      //筛选框
      filterConfig: [
        {
          code: "departmentId",
          title: "项目名称",
          type: "cascader",
          options: [],
          props: { value: 'id', label: 'name', checkStrictly: true, emitPath: false }
        },
        {
          code: "name",
          title: "员工姓名",
        },
        { code0: 'startAge', code1: 'endAge', title: '年龄范围', InputType: 'number', range: true, width: '240px' },
        {
          code: "contractStatus",
          title: "合同状态",
          type: "select",
          options: [{ label: '未签', value: 0 }, { label: '已签', value: 1 }],
        },
      ],
      quitRules: { quitJobApplyTime: [{ required: true, message: '请输入离职日期', trigger: 'blur' }] },
      quitInfo: {
        id: '',
        status: 0,
        quitJobApplyTime: filterTime(new Date()),
        name: '',
      },
      dialogQuit: false,
    }
  },
  components: { TableFilter, Vpage, EmployeeImport },
  created() {
    this.dataInit();
    this.getDapartList();
  },
  methods: {
    dataInit() {
      let params = {
        page: this.currPage,
        size: 10,
        ...this.filterList,
      }
      employeeSearchPage({ data: params }).then(res => {
        if (res.code === 0) {
          this.dataList = res.data.content;
          this.totalElements = res.data.totalElements;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 搜索
    getFilterList(val) {
      this.currPage = 1;
      if (this.filterList.startAge) {
        this.filterList.startAge = Math.round(this.filterList.startAge);
      }
      if (this.filterList.endAge) {
        this.filterList.endAge = Math.round(this.filterList.endAge);
      }

      this.dataInit();
    },
    // 点击分页(详情)
    changePages(e) {
      this.currPage = e;
      this.dataInit();
    },
    // 员工信息导入
    importHandle() {
      console.log('员工信息导入')
      this.$refs.importDom.show = true;
    },
    // 点编辑
    handleEdit(id) {
      this.$router.push({ path: '/admin/employeeDetail', query: { id: id } })
    },
    getDapartList() {
      searchDepart({ data: {} }).then(res => {
        if (res.code === 0) {
          this.departTree = toTree(res.data);
          this.filterConfig[0].options = this.departTree;
        } else {
          this.$message.error(res.message)
        }
      })
    },
    submitQuit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          employeeLeave({ data: this.quitInfo }).then(res => {
            if (res.code === 0 && res.data === true) {
              this.$message.success(`员工${this.quitInfo.name}设置离职成功`);
              this.dialogQuit = false;
              this.dataInit();
            } else {
              this.$message.error(res.message);
            }
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    // 离职
    handleLeave(item) {
      this.quitInfo.id = item.id;
      this.quitInfo.name = item.name;
      this.quitInfo.quitJobApplyTime = filterTime(new Date());
      this.dialogQuit = true;
    },
    // 删除
    handleDelete(id) {
      this.$confirm('此操作将永久删除该员工信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        employeeDelete({ data: { employeeId: id } }).then(res => {
          if (res.code === 0 && res.data === true) {
            this.$message.success('删除成功');
            this.dataInit();
          } else {
            this.$message.error(res.message);
          }
        })
      }).catch(() => { });
    },
    // 冻结/解冻
    updateAcctStatus(item, status) {
      let flag = '冻结'
      if (status == 1) {
        flag = '解冻'
      }
      this.$confirm(`确认${flag}员工【${item.name}】的账号?`, '更新员工账号状态', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let params = {
          id: item.id,
          acctStatus: status
        }
        if (status == 2) {
          employeefreeze({ data: params }).then(res => {
            if (res.code === 0 && res.data === true) {
              this.$message.success(`员工【${item.name}】账号${flag}成功！`);
              this.dataInit();
            } else {
              this.$message.error(res.message);
            }
          })
        } else if (status == 1) {
          employeeCancelFreeze({ data: params }).then(res => {
            if (res.code === 0 && res.data === true) {
              this.$message.success(`员工${item.name}账号${flag}成功！`);
              this.dataInit();
            } else {
              this.$message.error(res.message);
            }
          })
        }

      }).catch(() => { });
    }
  }
}
</script>

<style lang='less' scoped>
.el-tag {
  height: 28px;
  line-height: 26px;
}
</style>
