<template>
  <div class="order">
    <el-card class="order_title">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="order-main">
      <el-table
        :border="isBorder"
        fit
        :data="tableData"
        stripe
        style="width: 100%; border-radius: 5px"
        empty-text="暂无数据"
      >
        <el-table-column prop="date" label="编号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="订单编号"> </el-table-column>
        <el-table-column prop="address" label="提交时间"> </el-table-column>
        <el-table-column prop="address" label="订单金额"> </el-table-column>
        <el-table-column prop="date" label="支付方式">
          <!-- <template slot-scope="scope">
            <span v-show="scope.row.payment_type == 1">微信</span>
            <span v-show="scope.row.payment_type == 2">支付宝</span>
            <span v-show="scope.row.payment_type == 0">暂无</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="date" label="订单状态">
          <!-- <template slot-scope="scope">
            <span v-show="scope.row.status == 0">待支付</span>
            <span v-show="scope.row.status == 1">待发货</span>
            <span v-show="scope.row.status == 2">已发货</span>
            <span v-show="scope.row.status == 3">已完成</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="name" label="操作">
          <el-button size="mini">查看订单</el-button>
          <!-- <el-button size="mini" type="danger">删除订单</el-button> -->
          <el-button size="mini">订单发货</el-button>
          <!-- <template slot-scope="scope">
            <el-button size="mini" @click="handleViewOrder(scope.row)"
              >查看订单</el-button
            >
            <el-button
              size="mini"
              v-show="scope.row.status == 1"
              @click="handleDeliverOrder(scope.row)"
              >订单发货</el-button
            >
            <el-button size="mini" v-show="scope.row.status == 2"
              >订单跟踪</el-button
            >
            <el-button
              size="mini"
              v-show="scope.row.status == 3"
              type="danger"
              @click="handleDeleteOrder(scope.row)"
              >删除订单</el-button
            >
          </template> -->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import { getOrder } from "@/api/orderDetail";
export default {
  name: "order",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      isBorder: true,
      currentPage: 1,
      pageSize: 20,
    };
  },
  methods: {
    getOrder_() {
      //store_id 店铺id  count 请求的件数  page 请求的页数
      console.log("1111");
      let store_id = 87;
      let count = this.pageSize;
      let page = this.currentPage;
      // getOrder({ store_id, count, page }).then((data) => {
      //   console.log(data);
      // });
    },
  },
  created() {
    this.getOrder_();
  },
};
</script>

<style lang="scss">
.el-table .cell {
  text-align: center;
}
.order {
  padding: 20px 40px;
  //   background-color: aqua;
  .order_title {
    box-shadow: none;
    margin-bottom: 20px;
  }
}
</style>