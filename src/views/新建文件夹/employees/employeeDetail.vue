<!-- 员工信息详情 -->
<template>
  <div class="pageContainer">
    <el-page-header @back="$router.go(-1)" content="详情页面"></el-page-header>
    <div class="form-box">
      <h3>{{ isEdit? '编辑员工信息':'新增员工信息' }}</h3>
      <el-form :model="dataList" :rules="employeeRules" ref="employeeForm" size="small" label-width="100px" class="verticalForm">
        <!-- <el-form-item label="员工编号" prop="code" v-if="isEdit">
          <el-input v-model="dataList.code" readonly></el-input>
        </el-form-item> -->
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model.trim="dataList.name" maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="dataList.sex">
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age" v-if="isEdit">
          <el-input v-model="dataList.age" readonly></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input type="tel" :maxlength="11" v-model.trim="dataList.mobile"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="identityCardNo">
          <el-input type="tel" :maxlength="18" v-model.trim="dataList.identityCardNo"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankAccountNo">
          <el-input type="tel" :maxlength="19" v-model.trim="dataList.bankAccountNo"></el-input>
        </el-form-item>
        <el-form-item label="入职日期" prop="entryDate">
          <el-date-picker placeholder="选择日期" v-model="dataList.entryDate" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="合同状态" prop="contractStatus">
          <el-switch v-model="dataList.contractStatus" inactive-text="未签" active-text="已签" :inactive-value="0" :active-value="1"></el-switch>
        </el-form-item>
        <el-form-item label="所在部门" prop="departmentId">
          <el-cascader placeholder="请输入部门名称" v-model="dataList.departmentId" :options="departTree" filterable :props="departProps"></el-cascader>
        </el-form-item>
        <el-form-item label="员工标签" prop="labelList">
          <el-select v-model="dataList.labelIdList" multiple placeholder="请选择">
            <el-option v-for="item in tagsList" :key="item.id" :label="item.labelName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" v-button @click="$router.go(-1)">取 消</el-button>
          <el-button size="small" type="primary" v-button @click="submitForm('employeeForm')">提 交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { searchDepart, employeeTagSearch, employeeSave, employeeView, employeeUpdate } from '@/api/api'
import { toTree } from '@/utils/tool'
import { employeeRules } from '@/utils/valid'
export default {
  data () {
    return {
      employeeRules,
      dataList: {
        name: '',
        age: '',
        sex: 0,
        mobile: '',
        identityCardNo: '',
        bankAccountNo: '',
        entryDate: '',
        contractStatus: '',
        departmentId: '',
        labelList: []
      },
      departProps: { value: 'id', label: 'name', emitPath: false },
      departTree: [],
      tagsList: [],
      isEdit: false,
    }
  },
  created() {
    this.getDapartList();
    this.getTagsList();

    if(this.$route.query.id) {
      this.isEdit = true;
      this.dataInit(this.$route.query.id);
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(!this.isEdit) {
          
            this.$confirm('确认保存员工信息?', '保存信息', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              console.log(this.dataList);
              // return
              employeeSave({data: this.dataList}).then(res => {
                if (res.code === 0) {
                  this.$message.success('保存成功');
                  setTimeout(() => {
                    this.$router.go(-1)
                  }, 1000)
                } else {
                  this.$message.error(res.message);
                }
              })
            }).catch(() => {});
          } else {
              this.$confirm('确认修改员工信息?', '修改信息', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              
              employeeUpdate({data: this.dataList}).then(res => {
                if (res.code === 0) {
                  this.$message.success('保存成功');
                  setTimeout(() => {
                    this.$router.go(-1)
                  }, 1000)
                } else {
                  this.$message.error(res.message);
                }
              })
            }).catch(() => {});
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 部门
    getDapartList() {
      searchDepart({ data: {} }).then(res => {
        if (res.code === 0) {
          
          this.departTree = toTree(res.data);
        
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 员工标签
    getTagsList() {
      employeeTagSearch({ data: {} }).then(res => {
        if (res.code === 0) {
          this.tagsList = res.data;
        } else {
          this.$message.error(res.message)
        }
      })
    },
    dataInit(id) {
      employeeView({data:{employeeId:id}}).then(res => {
        if (res.code === 0) {
          
          this.dataList = res.data;
        
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.form-box {
  width: 480px;
  margin: 0 auto;
  margin-top: 20px;
  border: 1px solid #5895D3;
  border-radius: 6px;
  padding: 20px;
  h3 {
    font-size: 16px;
    line-height: 32px;
    text-align: center;
  }
  .el-form {
    margin: 0 auto;
    margin-top: 20px;
  }
}
</style>
