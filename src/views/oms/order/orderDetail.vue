<template>
  <div class="order-detail">
    <div class="el-sreps">
      <el-steps :active="status + 1" align-center>
        <el-step
          title="提交订单"
        ></el-step>
        <el-step
          title="支付订单"
        ></el-step>
        <el-step
          title="平台发货"
        ></el-step>
        <el-step
          title="确认收货"
        ></el-step>
      </el-steps>
    </div>
    <el-card class="el-card" shadow="never">
      <div class="card-header">
        <div class="text">
          <i class="el-icon-warning" style="margin-left: 20px"></i
          >当前订单状态：
          <span v-show="status == 0">待支付</span>
          <span v-show="status == 1">待发货</span>
          <span v-show="status == 2">已发货</span>
          <span v-show="status == 3">已完成</span>
        </div>
        <div class="card-button" v-if="status == 1">
          <el-button size="mini">订单发货</el-button>
        </div>
        <div class="card-button" v-if="status == 2">
          <el-button size="mini">订单跟踪</el-button>
        </div>
        <div class="card-button" v-if="status == 3">
          <el-button size="mini" @click="handleDeleteOrder">删除订单</el-button>
        </div>
      </div>

      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>

      <div class="table-layout" style="margin-top: 20px">
        <el-row>
          <el-col :span="8" class="table-cell-title">订单编号</el-col>
          <el-col :span="8" class="table-cell-title">订单流水号</el-col>
          <el-col :span="8" class="table-cell-title">支付方式</el-col>
        </el-row>
        <el-row>
          <!-- {{order.id}} {{order.code}} {{order.payment_type|formatPayment|formatNudefined}} -->
          <el-col :span="8" class="table-cell">{{ orderId }}</el-col>
          <el-col :span="8" class="table-cell">{{ tableData_1.code||'数据错误' }}</el-col>
          <el-col
            :span="8"
            class="table-cell"
            v-if="tableData_1.payment_type == 1"
            >微信</el-col
          >
          <el-col
            :span="8"
            class="table-cell"
            v-if="tableData_1.payment_type == 2"
            >支付宝</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="8" class="table-cell-title">配送方式</el-col>
          <el-col :span="8" class="table-cell-title">物流单号</el-col>
          <el-col :span="8" class="table-cell-title">自动确认收货时间</el-col>
        </el-row>
        <el-row>
          <!-- {{order.ecp|formatNudefined}}  {{order.postid|formatNudefined}}-->
          <el-col :span="8" class="table-cell">2</el-col>
          <el-col :span="8" class="table-cell">2</el-col>
          <el-col :span="8" class="table-cell">15天</el-col>
        </el-row>
      </div>

      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">收货人信息</span>
      </div>

      <div class="table-layout" style="margin-top: 20px">
        <el-row>
          <el-col :span="8" class="table-cell-title">收货人</el-col>
          <el-col :span="8" class="table-cell-title">手机号</el-col>
          <el-col :span="8" class="table-cell-title">收货地址</el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="table-cell">{{ tableData_1.name||'数据错误' }}</el-col>
          <el-col :span="8" class="table-cell">{{ tableData_1.tel||'数据错误' }}</el-col>
          <el-col :span="8" class="table-cell">{{
            tableData_1.address||'数据错误'
          }}</el-col>
        </el-row>
      </div>

      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">商品信息</span>
      </div>

      <div class="table-layout" style="margin-top: 20px">
        <el-row>
          <el-col :span="3" class="table-cell-title">商品编号</el-col>
          <el-col :span="4" class="table-cell-title">商品图片</el-col>
          <el-col :span="4" class="table-cell-title">商品名称</el-col>
          <el-col :span="3" class="table-cell-title">商品单价</el-col>
          <el-col :span="4" class="table-cell-title">商品参数</el-col>
          <el-col :span="3" class="table-cell-title">数量</el-col>
          <el-col :span="3" class="table-cell-title">总价</el-col>
        </el-row>
        <el-row v-show="shopItem_.length == 0">
          <el-col :span="24" class="table-cell">暂无数据</el-col>
        </el-row>
        <el-row
          v-show="shopItem_.length != 0"
          v-for="(item, index) in shopItem[0]"
          :key="index"
        >
          <el-col :span="3" class="table-cell">{{ item.id }}</el-col>
          <el-col :span="4" class="table-cell">
            <img :src="item.imgs[0].normal" alt="" />
          </el-col>
          <el-col :span="4" class="table-cell">{{ item.title }}</el-col>
          <el-col :span="3" class="table-cell">￥{{ item.price }}</el-col>
          <el-col :span="4" class="table-cell">{{ item.param }}</el-col>
          <el-col :span="3" class="table-cell">{{ item.num }}</el-col>
          <el-col :span="3" class="table-cell"
            >￥{{ item.num * item.price }}</el-col
          >
        </el-row>
        <el-row style="margin-top:20px;text-align: right;padding-right: 5px;">合计: ￥{{combined}}</el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getOrderDetail } from "@/api/order";
export default {
  name: "Detail",
  data() {
    return {
      status: null,
      tableData: [],
      orderId: null,
      shopItem: [],
      combined:0
    };
  },
  created() {
    this.status = this.$store.state.order.status;
    this.orderId = this.$store.state.order.order_id;
    this.getOrderDetail_();
  },
  methods: {
    // 获取订单详情
    getOrderDetail_() {
      let order_id = this.orderId;
      let status = this.status;
      let data = { order_id, status };
      getOrderDetail(data)
        .then((res) => {
          // console.log(res.data.sku);
          this.tableData.push(res.data);
          this.shopItem.push(res.data.skus);
          console.log(this.shopItem);
        })
        .catch((req) => {
          console.log(req);
        });
    },
    // 删除订单
    handleDeleteOrder(str) {
      // console.log(str);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.$router.push(`/oms/order`);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  computed: {
    tableData_1() {
      let res = this.tableData[0] || {};
      return res;
    },
    shopItem_(){
      let res = this.shopItem[0] || []
      res.filter(item=>{
        item.imgs=JSON.parse(item.imgs)
        // return item
        this.combined += item.price * item.num
      })
      console.log(res);
      return res
    }
  },
};
</script>

<style lang="scss" scoped>
.order-detail {
  width: 80%;
  margin: 0 auto;
  padding: 20px 40px;
  .el-sreps {
    margin: 50px 0px;
  }
  .marker {
    padding-right: 10px;
  }
  .el-card {
    border: 1px solid #ebeef5;
    background-color: #fff;
    color: #303133;
    transition: 0.3s;
    .card-header {
      display: flex;
      justify-content: space-between;
      background: #f2f6fc;
      height: 80px;
      align-items: center;
      margin: -20px -20px 0 -20px;
      .text {
        background: #f2f6fc;
        // background: #2a5faf;
        color: #f56c6c;
        i {
          color: red !important;
          padding-right: 10px;
        }
      }
      .card-button {
        padding-right: 10px;
      }
    }
    .table-layout {
      margin-top: 20px;
      border-left: 1px solid #dcdfe6;
      border-top: 1px solid #dcdfe6;
      .table-cell-title {
        border-right: 1px solid #dcdfe6;
        border-bottom: 1px solid #dcdfe6;
        padding: 10px;
        background: #f2f6fc;
        text-align: center;
        font-size: 14px;
        color: #303133;
      }
      .table-cell {
        height: 50px;
        line-height: 33px;
        border-right: 1px solid #dcdfe6;
        border-bottom: 1px solid #dcdfe6;
        padding: 10px;
        font-size: 14px;
        color: #606266;
        text-align: center;
        overflow: hidden;
        position: relative;
        img{
          position: absolute;
          top: 0px;
          left: 30%;
          width: 50px;
          padding: 4px;
        }
      }
    }
  }
}
.font-small{
  padding-left: 5px;
}
</style>