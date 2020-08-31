<!-- 添加集结点 -->
<template>
  <div class="cen-add">
    <el-dialog title="添加" :visible.sync="dialogAdd" center>
      <el-form :model="formData" label-width="150px" class="cen-form cen-editor" ref="formData">
        <el-form-item label="选择城市：" prop="phone">
          <el-select v-model="formData.region" placeholder="请选择城市">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择地图：" prop="phone">
          <el-select v-model="formData.region" placeholder="请选择地图">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="集结点：" prop="phone">
          <el-input type="text" placeholder="请输入名称"></el-input>
          <el-input type="text" placeholder="地址描述"></el-input>
          <el-input type="text" placeholder="坐标"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" v-button @click="dialogAdd=false">取 消</el-button>
          <el-button size="medium" type="primary" v-button @click="submitForm('formData')">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogAdd: false,
      formData: {},
    };
  },
  components: {},
  created() { },
  methods: {
    submitForm(formName) { },
  }
}

</script>
<style lang='less' scoped>
.cen-add {
  /deep/.el-dialog {
    width: 1100px;
    max-height: 600px;
    overflow: scroll;
  }
}
</style>