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
        <el-table-column label="配送方式">
          <template slot-scope="scope">
            <el-select v-model="scope.row.ecp" placeholder="请选择配送方式">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="物流单号">
          <template slot-scope="scope">
            <el-input
              size="small"
              v-model="scope.row.postid"
              placeholder="请输入物流单号"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="delive-foot">
      <el-button @click="cancel">重置</el-button>
      <el-button type="primary" @click="isDelive">确定</el-button>
    </div>
  </div>
</template>

<script>
import { getOrderDetail, updateOrder } from "@/api/order";
export default {
  name: "deliverOrderList",
  data() {
    return {
      deliveList: [],
      orderId: null,
      status: null,
      postid: "",
      ecp: "",
      options: [
        {
          value: "选项1",
          label: "中国邮政",
        },
        {
          value: "选项2",
          label: "顺丰快递",
        },
        {
          value: "选项3",
          label: "申通快递",
        },
        {
          value: "选项4",
          label: "韵达快递",
        },
        {
          value: "选项5",
          label: "极兔快递",
        },
      ],
    };
  },
  created() {
    this.orderId = this.$store.state.order.order_id;
    this.status = this.$store.state.order.status;
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
          // console.log(res.data);
          this.deliveList.push(res.data);
          console.log(this.deliveList);
        })
        .catch((req) => {
          console.log(req);
        });
    },
    // 是否确认发货
    isDelive() {
      let data = Object.assign(this.deliveList[0], { status: 2 });
      console.log(data);
      this.$confirm("是否确认发货", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateOrder(data).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "发货成功!",
              });
              this.$router.push(`/oms/order`);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发货",
          });
        });
    },
    // 重置
    cancel() {
      // console.log(this.deliveList);
      let obj = this.deliveList;
      for (let item in obj) {
        this.$set(obj[item], "ecp", "");
        this.$set(obj[item], "postid", "");
      }
      // this.$router.back();
    },
  },
};
</script>

<style lang="scss">
.el-table .cell {
  text-align: center;
}
.delive {
  padding: 20px 40px;
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