<template>
  <div class="table-header">
    <el-form :model="searchobj" inline>
      <el-form-item v-for="item in config" :key="item.code" class="table-header-item" :style="'width:'+item.width">
        <el-row v-if="item.range">
          <el-col :span="11">
            <el-select v-if="item.type==='select'" v-model="searchobj[item.code0]" :placeholder="item.title" :multiple="item.multiple?true:false" :filterable="item.filterable" collapse-tags clearable>
              <el-option v-for="option in item.options" :key="item.value?option[item.value]:option.value" :label="item.label?option[item.label]:option.label" :value="item.value?option[item.value]:option.value"></el-option>
            </el-select>
            <el-date-picker
              v-else-if="item.type==='date'"
              v-model="searchobj[item.code0]"
              :type="item.DateType||'date'"
              :placeholder="item.title"
              :clearable="item.clearable"
              :value-format="item.valueFormat||'yyyy-MM-dd'"
              :format="item.format||'yyyy-MM-dd'"
            ></el-date-picker>
            <el-input v-else v-model="searchobj[item.code0]" :placeholder="item.title" :type="item.InputType||'text'" clearable @mousewheel.native.prevent></el-input>
          </el-col>

          <el-col :span="2" style="text-align:center">
            <span>至</span>
          </el-col>

          <el-col :span="11">
            <el-select v-if="item.type==='select'" v-model="searchobj[item.code1]" :placeholder="item.title" :multiple="item.multiple?true:false" :filterable="item.filterable" collapse-tags clearable>
              <el-option v-for="option in item.options" :key="item.value?option[item.value]:option.value" :label="item.label?option[item.label]:option.label" :value="item.value?option[item.value]:option.value"></el-option>
            </el-select>
            <el-date-picker
              v-else-if="item.type==='date'"
              v-model="searchobj[item.code1]"
              :type="item.DateType||'date'"
              :placeholder="item.title"
              :clearable="item.clearable"
              :value-format="item.valueFormat||'yyyy-MM-dd'"
              :format="item.format||'yyyy-MM-dd'"
            ></el-date-picker>
            <el-input v-else v-model="searchobj[item.code1]" :placeholder="item.title" :type="item.InputType||'text'" clearable @mousewheel.native.prevent></el-input>
          </el-col>
        </el-row>

        <el-row v-else>
          <el-col :span="24">
            <el-select v-if="item.type==='select'" v-model="searchobj[item.code]" :placeholder="`请选择${item.title}`" :multiple="item.multiple?true:false" :filterable="item.filterable" collapse-tags clearable>
              <el-option v-for="option in item.options" :key="item.value?option[item.value]:option.value" :label="item.label?option[item.label]:option.label" :value="item.value?option[item.value]:option.value"></el-option>
            </el-select>
            <el-date-picker
              v-else-if="item.type==='date'"
              v-model="searchobj[item.code]"
              :type="item.DateType||'date'"
              :placeholder="`请选择${item.title}`"
              :clearable="item.clearable"
              :value-format="item.valueFormat||'yyyy-MM-dd'"
              :format="item.format||'yyyy-MM-dd'"
            ></el-date-picker>
            <el-cascader v-else-if="item.type=='cascader'" :placeholder="`请输入${item.title}`" v-model="searchobj[item.code]" :options="item.options" filterable clearable :props="item.props"></el-cascader>
            <el-input v-else v-model="searchobj[item.code]" :placeholder="`请输入${item.title}`" :type="item.InputType||'text'" clearable @mousewheel.native.prevent></el-input>
          </el-col>
        </el-row>
      </el-form-item>

      <div class="table-header-button">
        <el-button type="primary" @click="search" class="search-btn" :icon="searchStatus?'el-icon-loading':'el-icon-search'">搜 索</el-button>
        <el-button v-show="showclear" @click="reset" type="text" class="search-btn">清 空</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    config: { type: Array, default: [] },
    btnConfig: {},
    searchobj: { type: Object }
  },
  data() {
    return {
      _copy: {},
      searchStatus: false,
    };
  },
  created() {
    this._copy = Object.assign({}, this.searchobj);
  },
  methods: {
    // 查询
    search() {
      this.searchStatus = true;
      this.$emit("search", this.searchobj);
      setTimeout(() => {
        this.searchStatus = false;
      }, 600);
    },

    btn_click(functionName) {
      this.$emit(functionName);
    },

    // 清空
    reset() {
      this.$emit("update:searchobj", Object.assign({}, this._copy));
      this.search();
    }
  },
  computed: {
    showclear() {
      let flag = false;
      for (var item in this.searchobj) {
        if (this.searchobj[item] !== this._copy[item]) {
          flag = true;
        }
      }
      return flag;
    }
  }
};
</script>
<style lang="less" scoped>
.table-header {
  padding-top: 10px;
  .table-header-button {
    display: inline-block;
    margin-bottom: 12px;
    line-height: 30px;
    .search-btn {
      /**width: 70px;*/
      height: 30px;
      font-size: 12px;
      padding: 2px 12px;
    }
  }
  .table-header-item {
    width: 180px;
    font-size: 12px;
    margin-bottom: 12px;
    /deep/.el-form-item__content {
      width: 100%;
      line-height: 30px;
      .el-input {
        width: 100%;
        .el-input__inner {
          padding: 5px 10px;
          height: 30px;
          line-height: 29px;
        }
        .el-input__icon {
          line-height: 30px;
        }
      }
      .el-input--prefix .el-input__inner {
        padding-left: 30px;
      }
      .el-select {
        width: 100%;
      }
      .el-cascader {
        width: 100%;
        line-height: 30px;
      }
    }
  }
}
</style>