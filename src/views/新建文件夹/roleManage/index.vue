<!-- 角色管理 -->
<template>
  <div class="role-container">
    <table-header :searchobj.sync="searchobj" :config="headerData" @search="getList" />
    <el-table :data="tableData" style="width: 100%" :header-cell-style="tabHeader">
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="phone" label="联系方式"></el-table-column>
      <el-table-column prop="userType" label="账户类型">
        <template slot-scope="scope">{{scope.row.userType == 0 ? '管理员':'普通用户'}}</template>
      </el-table-column>
      <el-table-column prop="created" label="创建时间">
        <template slot-scope="scope">{{scope.row.created}}</template>
      </el-table-column>
      <el-table-column prop="acctStatus" label="账户状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.acctStatus === 1 ? 'success' : 'danger'" disable-transitions>{{scope.row.acctStatus | accountStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="success" v-button size="mini">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="danger" v-button size="mini">删除</el-button>
          <el-button @click="handleFreeze(scope.row,scope.$index)" :type="scope.row.acctStatus===1?'warning ':'info'" size="mini">
            <span v-if="scope.row.acctStatus == 1">冻结</span>
            <span v-else>解冻</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页-->
    <div class="flex-between">
      <el-button type="primary" plain size="medium" icon="el-icon-plus" v-button @click="handleAdd">新增</el-button>
      <Vpage :total="totalElements" :currPage="page" @currentChange="changePages"></Vpage>
    </div>

    <!-- 新增 -->
    <el-dialog title="新增用户" :visible.sync="dialogAdd" width="700px" center>
      <el-form :model="formAdd" label-width="120px" class="form" :rules="roleRule" ref="formAdd">
        <el-form-item label="账号：" prop="username">
          <el-input v-model.trim="formAdd.username" autocomplete="off" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')" placeholder="账号" maxlength="20" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model.trim="formAdd.password" autocomplete="off" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')" placeholder="密码" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone">
          <el-input v-model.trim="formAdd.phone" autocomplete="off" placeholder="联系方式" maxlength="11" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" v-button @click="handleSure('formAdd')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="用户管理" :visible.sync="dialogVisible" width="700px" center>
      <el-form :model="form" label-width="120px" class="form" ref="form" :rules="roleRule">
        <el-form-item label="账号：" prop="username">
          <el-input v-model.trim="form.username" autocomplete="off" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')" placeholder="账号" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model.trim="form.password" autocomplete="off" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')" placeholder="密码" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone">
          <el-input v-model.trim="form.phone" autocomplete="off" placeholder="联系方式" maxlength="11" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="acctStatus">
          <el-select v-model="form.acctStatus" placeholder="状态" disabled>
            <el-option v-for="(item,index) in roleList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限：" prop="userType">
          <el-select v-model="form.userType" placeholder="权限" disabled>
            <el-option v-for="(item,index) in authorityList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间：" prop="created">
          <el-input v-model="form.created" autocomplete="off" placeholder="时间" readonly></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-button @click="editSure('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableHeader from "@/components/TableFilter";
import { tabHeader } from "@/utils/tool";
import Vpage from '@/components/Vpage';
import { roleList, authorityList } from "@/utils/data";
import { roleRule } from "@/utils/valid";
import { search, create, edit, userDelete, freeze, cancelFreeze } from "@/api/api";

export default {
  data() {
    return {
      searchobj: {},
      headerData: [
        {
          code: 'username',
          title: '用户名',
        },
        {
          code: 'acctStatus',
          title: '用户状态',
          type: 'select',
          options: roleList
        },
      ],
      tabHeader,
      tableData: [],
      roleList,
      authorityList,

      dialogAdd: false,
      formAdd: {},

      dialogVisible: false,
      form: {},
      totalElements: 0,
      page: 1,
      size: 10,

      roleRule,
    }
  },
  components: {
    TableHeader,
    Vpage
  },
  created() {
    this.getList();
  },
  methods: {
    //列表
    getList() {
      let params = {
        userType: '',
        ...this.searchobj,
        page: this.page - 1,
        size: this.size,
      }
      search({ data: params }).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.content;
          this.totalElements = res.data.totalElements;
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 新增
    handleAdd() {
      this.formAdd = {};
      this.dialogAdd = true;
    },
    //新增弹窗确定
    handleSure(formAdd) {
      this.$refs[formAdd].validate((valid) => {
        if (valid) {
          let params = {
            ...this.formAdd
          }
          create({ data: params }).then(res => {
            if (res.code == 0) {
              this.$message({
                message: '新增用户成功',
                type: 'success'
              });
              this.getList();
              this.dialogAdd = false
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          return false;
        }
      });
    },
    //编辑
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true
    },
    //编辑弹窗确定
    editSure(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let params = {
            ...this.form
          }
          edit({ data: params }).then(res => {
            if (res.code == 0) {
              this.$message({
                message: '已修改',
                type: 'success'
              });
              this.getList();
              this.dialogVisible = false
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          return false;
        }
      });
    },

    //删除
    handleDelete(row) {
      if (this.tableData.length === 1) {
        this.$message.warning('至少要保留一个账号')
        return
      }
      this.$confirm(`此操作将永久删除用户${row.username}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          id: row.id
        }
        userDelete({ data: params }).then(res => {
          if (res.code == 0) {
            this.$message({
              message: `用户${row.username}已删除`,
              type: 'success'
            });
            this.getList();
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => { });

    },

    //冻结、解冻
    handleFreeze(row, index) {
      if (row.acctStatus == 1) {
        this.$confirm(`此操作将冻结用户${row.username}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: row.id,
            acctStatus: 2,
          }
          freeze({ data: params }).then(res => {
            if (res.code == 0) {
              this.$message.success({ message: `用户${row.username}已冻结`, });
              // this.getList();
              this.$set(this.tableData[index], 'acctStatus', 2);
            }
            else {
              this.$message.error(res.message)
            }
          })
        })
      }
      else {
        this.$confirm(`此操作将解冻用户${row.username}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: row.id,
            acctStatus: 1,
          }
          cancelFreeze({ data: params }).then(res => {
            if (res.code == 0) {
              this.$message.success({ message: `用户${row.username}已解冻`, });
              this.$set(this.tableData[index], 'acctStatus', 1)
              // this.getList();
            } else {
              this.$message.error(res.message)
            }
          })
        })
      }
    },

    // 翻页
    changePages(e) {
      this.page = e;
      this.getList();
    }
  }
}
</script>

<style lang="less" scoped>
.role-container {
  padding: 20px;
  .form {
    width: 350px;
    margin: 0 auto;
  }
  /deep/ .el-input.is-disabled .el-input__inner {
    background: transparent;
    color: #606266;
  }
}
</style>