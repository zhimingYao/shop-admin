<template>
  <div class="order">
    <el-card class="order_title">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="order-main">
      <el-table
        :border="isBorder"
        :data="tableData"
        stripe
        style="width: 100%; border-radius: 5px"
        empty-text="暂无数据"
      >
        <el-table-column prop="id" label="编号" width="100"> </el-table-column>
        <el-table-column prop="code" label="订单编号"> </el-table-column>
        <el-table-column prop="create_time" label="提交时间"> </el-table-column>
        <el-table-column prop="money" label="订单金额" width="150">
        </el-table-column>
        <el-table-column prop="payment_type" label="支付方式" width="150">
          <template slot-scope="scope">
            <span v-show="scope.row.payment_type == 1">微信</span>
            <span v-show="scope.row.payment_type == 2">支付宝</span>
            <span v-show="scope.row.payment_type == 0">暂无</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态" width="150">
          <template slot-scope="scope">
            <span v-show="scope.row.status == 0">待支付</span>
            <span v-show="scope.row.status == 1">待发货</span>
            <span v-show="scope.row.status == 2">已发货</span>
            <span v-show="scope.row.status == 3">已完成</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
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
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getOrder, deleteOrder } from "@/api/order";
export default {
  name: "order",
  data() {
    return {
      tableData: [],
      isBorder: true,
      currentPage: 1,
      pageSize: 20,
    };
  },
  methods: {
    // 获取订单数据
    getOrder_() {
      let store_id = 1;
      let count = this.pageSize;
      let page = this.currentPage;
      let data = { store_id, count, page };
      getOrder(data)
        .then((res) => {
          this.tableData = res.data[0];
          // console.log(res.data[0]);
        })
        .catch((req) => {
          console.log(req);
        });
    },
    // 查看订单
    handleViewOrder(str) {
      // console.log(str);
      this.$store.dispatch("order/getOrderDetail", str);
      // this.$router.push(`orderDetail/${str.id}/${str.status}`);
      this.$router.push(`orderDetail?order_id=${str.id}&status=${str.status}`);
      // /:/:
    },
    // 订单发货
    handleDeliverOrder(str) {
      console.log(str);
      this.$store.dispatch("order/getDeliveList", str);
      this.$router.push(`deliverOrderList?str_id=${str.id}`);
    },
    // 删除订单
    handleDeleteOrder(str) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteOrder({ id: str.id })
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              }
            })
            .catch((rej) => {
              console.log(rej);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.getOrder_();
  },
  watch: {},
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
    span {
      margin-left: 5px;
    }
  }
}
</style>