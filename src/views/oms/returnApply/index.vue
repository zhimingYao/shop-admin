<template>
  <div class="apply">
    <el-table :data="tableData" stripe style="width: 100%" empty-text="暂无数据">
      <el-table-column prop="date" label="服务单号" width="180"> </el-table-column>
      <el-table-column prop="name" label="申请时间" width="180"> </el-table-column>
      <el-table-column prop="address" label="退款金额"> </el-table-column>
      <el-table-column prop="address" label="申请状态"> </el-table-column>
      <el-table-column prop="date" label="处理时间"> </el-table-column>
      <el-table-column prop="name" label="操作">
          <el-button size="mini" type="primary">查看详情</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "returnApply",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.apply{
  margin: 20px 40px;
  border: 1px solid #eee;
}
</style>