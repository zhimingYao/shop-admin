<template>
  <div class="delive">
    <el-card class="delive_title">
      <i class="el-icon-tickets"></i>
      <span>发货列表</span>
    </el-card>
    <div class="delive-main">
      <el-table
        :border="true"
        :data="deliveList"
        stripe
        style="width: 100%; border-radius: 5px"
        empty-text="暂无数据"
      >
        <el-table-column prop="id" label="订单编号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="收货人" width="100">
        </el-table-column>
        <el-table-column prop="tel" label="手机号码"> </el-table-column>
        <el-table-column prop="address" label="收货地址" width="150">
        </el-table-column>
        <el-table-column prop="payment_type" label="配送方式">
          <el-input placeholder="请输入配送方式"></el-input>
        </el-table-column>
        <el-table-column prop="status" label="物流单号">
          <el-input placeholder="请输入物流单号"></el-input>
        </el-table-column>
      </el-table>
    </div>
    <div class="delive-foot">
      <el-button @click="goBack">取消</el-button>
      <el-button type="primary" @click="isDelive">确定</el-button>
    </div>
  </div>
</template>

<script>
import { getOrderDetail } from "@/api/order";
export default {
  name: "deliverOrderList",
  data() {
    return {
      deliveList: [],
      orderId: null,
      status: null,
    };
  },
  created() {
    this.orderId = this.$store.state.order.order_id;
    this.status = this.$store.state.order.status;
    this.getOrderDetail_();
  },
  methods: {
    getOrderDetail_() {
      let order_id = this.orderId;
      let status = this.status;
      let data = { order_id, status };
      getOrderDetail(data)
        .then((res) => {
          console.log(res.data);
          this.deliveList.push(res.data);
          console.log(this.deliveList);
        })
        .catch((req) => {
          console.log(req);
        });
    },
    // 是否确认发货
    isDelive() {
      this.$confirm("是否确认发货", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "发货成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发货",
          });
        });
    },
    goBack(){
        this.$router.back()
    }
  },
};
</script>

<style lang="scss">
.el-table .cell {
  text-align: center;
}
.delive {
  padding: 20px 40px;
  //   background-color: aqua;
  .delive_title {
    box-shadow: none;
    margin-bottom: 20px;
    span {
      margin-left: 5px;
    }
  }
  .delive-foot {
    padding-top: 20px;
    text-align: center;
  }
}
</style>