<template>
  <div class="voucher">
    <div class="coupon-search">
      <div class="title">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div class="search">
        <el-input placeholder="优惠券名称" v-model="coupon_name"></el-input>
        <el-button type="primary" size="small" @click="selectVoucher()">查询搜索</el-button>
      </div>
    </div>
    <div class="data-list">
      <div class="add-list">
        <div class="title">
          <i class="el-icon-document"></i>
          <span>数据列表</span>
        </div>
        <div class="add">
          <el-button size="small" @click="addVoucher()">添加</el-button>
        </div>
      </div>
      <div class="list">
        <el-table
          :data="coupon_Data"
          :border="true"
          style="width: 100%"
          cell-class-name="cell"
        >
          <el-table-column prop="id" label="编号" width="100">
          </el-table-column>
          <el-table-column prop="name" label="名称" width="100">
          </el-table-column>
          <el-table-column prop="deno" label="优惠劵面额(元)"></el-table-column>
          <el-table-column
            prop="condition"
            label="优惠劵满足条件(元）"
          ></el-table-column>
          <el-table-column
            prop="start_time"
            label="开始使用时间"
          ></el-table-column>
          <el-table-column
            prop="end_time"
            label="结束使用时间"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="seeVoucheer(scope.row.id)"
                >查看</el-button
              >
              <el-button type="text" @click="editVoucheer(scope.row)"
                >编辑</el-button
              >
              <el-button type="text" @click="deleteVoucher(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { setcookie } from "@/utils/cookiestorage.js";
export default {
  data() {
    return {
      coupon_name: "",
      coupon_Data: [],
    };
  },
  methods: {
    getVoucher() {
      this.$store.dispatch("voucher/getVoucher").then((res) => {
        this.coupon_Data = res.data;
      });
    },
    addVoucher() {
      this.$router.push('/marketing/addvoucher')
    },
    seeVoucheer(id) {
      this.$router.push(`/marketing/voucherdetail?id=${id}`);
    },
    editVoucheer(voucher) {
      setcookie('voucher', JSON.stringify(voucher))
      this.$router.push(`/marketing/editVoucher?id=${voucher.id}`)
    },
    deleteVoucher(id) {
      this.$store.dispatch('voucher/deleteVoucher',id).then(res=>{
        console.log(res);
        this.getVoucher();
      })
    },
    selectVoucher(){
      this.$store.dispatch('voucher/selectVoucher',this.coupon_name).then(res=>{
        // console.log(res);
        this.coupon_Data = res.res
      })
    }
  },
  created() {
    this.getVoucher();
  },
};
</script>

<style lang="scss" scoped>
.voucher {
  width: 100%;
  padding: 0;
  margin: 0 auto;
}
.coupon-search {
  margin: 20px 20px;
  border: 1px solid #e6e6e6;
  .title {
    width: 100%;
    margin: 20px 20px;
    span {
      margin-left: 10px;
    }
  }
  .search {
    width: 300px;
    display: flex;
    margin: 20px 20px;
    font-size: 12px;
    .el-button {
      margin-left: 20px;
    }
  }
}
.data-list {
  .add-list {
    margin: 20px 20px;
    border: 1px solid #e6e6e6;
    display: flex;
    .title {
      width: 100%;
      margin: 20px 20px;
      span {
        margin-left: 10px;
      }
    }
    .add {
      margin: 20px 20px;
    }
  }
  .list {
    margin: 20px 20px;
    border: 1px solid #e6e6e6;
    .cell {
      text-align: center;
      color: red;
    }
  }
}
</style>