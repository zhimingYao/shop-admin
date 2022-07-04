<template>
  <div class="delive">
    <el-card class="delive_title">
      <i class="el-icon-tickets"></i>
      <span>发货列表</span>
    </el-card>
    <div class="order-main">
      <el-table
        :border="true"
        :data="deliveList"
        stripe
        style="width: 100%; border-radius: 5px"
        empty-text="暂无数据"
      >
        <el-table-column prop="id" label="订单编号" width="100"> </el-table-column>
        <el-table-column prop="code" label="收货人"> </el-table-column>
        <el-table-column :prop="deliveList.tel" label="手机号码"> </el-table-column>
        <el-table-column :prop="deliveList.address" label="收获地址" width="150">
        </el-table-column>
        <el-table-column prop="payment_type" label="配送方式" width="150">
          <el-input placeholder="请输入配送方式"></el-input>
        </el-table-column>
        <el-table-column prop="status" label="物流单号">
          <el-input placeholder="请输入物流单号"></el-input>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getOrderDetail } from '@/api/order';
export default {
  name: "deliverOrderList",
  data(){
    return {
        deliveList:[],
        orderId:null,
        status:null
    }
  },
  created(){
    this.orderId = this.$store.state.order.order_id
    this.status = this.$store.state.order.status
    this.getOrderDetail_();
  },
  methods:{
    getOrderDetail_(){
        let order_id = this.orderId
        let status = this.status
        let data={order_id,status}
        getOrderDetail(data).then(res=>{
            console.log(res);
            
        }).catch(req=>{
            console.log(req);
        })
    }
  }
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
}
</style>