<template>
  <div class="addSpike">
    <el-dialog title="添加活动" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参加活动的商品id" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动开始时间" :label-width="formLabelWidth">
          <el-time-picker
            v-model="value1"
            :picker-options="{
              selectableRange: '18:30:00 - 20:30:00',
            }"
            placeholder="任意时间点"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-time-picker
            v-model="value1"
            :picker-options="{
              selectableRange: '18:30:00 - 20:30:00',
            }"
            placeholder="任意时间点"
          >
          </el-time-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取 消 </el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "addSpike",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        date1: "",
        date2: "",
      },
      formLabelWidth: "120px",
      value1: new Date(2016, 9, 10, 18, 40),
    };
  },
};
</script>

<style>
</style>