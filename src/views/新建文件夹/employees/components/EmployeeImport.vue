<!-- 员工信息导入 -->
<template>
  <el-dialog title="员工信息导入" :visible.sync="show" width="900px" center :close-on-click-modal="false" :before-close="beforeClose" class="dialogImport">
    <div class="import-box">
      
      <el-tooltip class="item" effect="dark" content="设置部门" placement="top-start">
        <el-button type="primary" icon="el-icon-s-management" class="icon_add" @click="openDepart"></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="导入员工信息" placement="top-start">
        <el-upload action="" :auto-upload="false" :show-file-list="false" :on-change="uploadChange" accept=".xlsx" style="display:inline">
          <el-button type="primary" icon="el-icon-upload" class="icon_add"></el-button>
        </el-upload>
      </el-tooltip>
      <span class="importNotice">注意：导入数据时表格前后不要有空格，不要有标点符号或特殊字符，不规范的格式有可能导致数据无法正常读取</span>
      <el-table ref="empImport" :data="dataList" :header-cell-style="tabHeader" size="small" height="520">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="name" label="姓 名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sex" label="性 别" width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.sex | sexStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="departmentName" label="所在部门" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mobile" label="手机号" width="100"></el-table-column>
        <el-table-column prop="identityCardNo" label="身份证号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bankAccountNo" label="银行卡号" width="130" show-overflow-tooltip></el-table-column>
        <el-table-column prop="contractStatus" label="合同状态" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.contractStatus | contractStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="entryDate" label="入职日期" width="100"></el-table-column>
        <el-table-column label="操作" width="80" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="success" v-button @click="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">返 回</el-button>
      <!-- <el-button type="primary" v-button @click="submit">确 定</el-button> -->
    </span>
    <el-dialog width="350px" title="设置部门" :visible.sync="innerShow" append-to-body center :close-on-click-modal="false">
      <el-cascader placeholder="请输入部门名称" v-model="departmentId" :options="departOptions" filterable :props="departProps" ref="depart"></el-cascader>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="innerShow=false">取 消</el-button>
        <el-button size="small" type="primary" v-button @click="setDepart">确 定</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { tabHeader, toTree, contractStatus, sexStatus } from "@/utils/tool";
import { excelToArray } from "@/utils/excel";
import { employeeImport } from "@/api/api";
import { filterTime } from "@/utils/tool";
export default {
  data () {
    return {
      tabHeader,
      show: false,
      innerShow: false,
      departmentId: '',
      departProps: { value: 'id', label: 'name', emitPath: false },
      dataList: [],
    }
  },
  methods: {
    // 导入
    uploadChange(file){
      let obj = {
        name: '员工姓名',
        sex: '性别',
        mobile: '手机号',
        identityCardNo: '身份证号',
        bankAccountNo: '银行卡号',
        contractStatus: '合同状态',
        entryDate: '入职日期'
      }
      excelToArray(file.raw, obj).then(res => {
        // console.log(res);
        res.map(item => {
          item.sex = sexStatus(item.sex);
          item.contractStatus = contractStatus(item.contractStatus);
          item.entryDate = filterTime(item.entryDate);
          item.departmentId = '';
          item.departmentName = '';
        })
        this.dataList = res;
      })
    },
    beforeClose(done) {
      let emptyName = '';
      // 检查表格中有没有未设置部门的员工
      let emptyDapart =  this.dataList.some(item => {
        if(item.departmentId === ''){
          emptyName = item.name;
          return true;
        }
        
      })
      console.log(emptyDapart)
      if(emptyDapart){

        // this.$message.warning(`员工${emptyName}未设置部门`);
        // return
        this.$confirm(`员工【${emptyName}】未设置部门,确认关闭?`, '确认关闭导入', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.show = false;
          this.$parent.dataInit();
          done()
        }).catch(() => {});

      }else {
        this.show = false;
        this.$parent.dataInit();
        done()
      }
      
    },
    openDepart() {
      if(this.$refs.empImport.selection.length<=0){
        this.$message.warning('未选择人员');
        return
      }
      this.innerShow = true;
    },
    setDepart() {
      let departArr = this.$refs.depart.inputValue.split(this.$refs.depart.separator);
      this.$refs.empImport.selection.map(item => {
        item.departmentId = this.departmentId;
        item.departmentName = departArr[departArr.length-1];
        item.isSelected = true;
      })
      this.$confirm('确认保存员工信息?', '保存信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        console.log(this.$refs.empImport.selection);
        // return
        employeeImport({data: this.$refs.empImport.selection}).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功');
            this.dataList = this.dataList.filter(item => {
              return !item.isSelected
            })
            this.innerShow = false;
          } else {
            this.$message.error(res.message);
          }
        })
      }).catch(() => {});
      
    },
    handleDelete(index) {
      this.dataList.splice(index,1);
    },
    cancel() {
      this.show=false;
      this.$parent.dataInit();
    }
  },
  computed: {
    departOptions(){
      return this.$parent.departTree
    }
  },
  watch: {
    show(val) {
      if(!val) {
        this.dataList=[];
        this.departmentId = '';
      }
    }
  }
}
</script>

<style lang='less' scoped>
.dialogImport{
  .import-box {
    height: 565px;
    .el-cascader {
      width: 260px;
      height: 35px;
      /deep/.el-input {
        height: 100%;
        .el-input__inner {
          height: 100%;
        }
      }
    }
    .el-table {
      margin-top: 20px;
    }
    .importNotice {
      margin-left: 10px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
