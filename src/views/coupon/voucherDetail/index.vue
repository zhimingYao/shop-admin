<template>
  <div class="v-detail">
    <div class="list">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="优惠劵名称"> </el-table-column>
        <el-table-column prop="voucher_class" label="优惠卷类型"> </el-table-column>
        <el-table-column prop="use_goods" label="可使用商品"></el-table-column>
        <el-table-column prop="deno" label="面值"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="start_time" label="开始时间"></el-table-column>
        <el-table-column prop="end_time" label="结束时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "voucherDetail",
  data() {
    return {
      detailData: [],
    };
  },
  methods: {
    seeVoucheer() {
      let id = this.$route.query.id;
      this.$store.dispatch("voucher/seeVoucheer", id).then((res) => {
        console.log(res);
        this.detailData = res.res;
      });
    },
  },
  created() {
    // console.log(this.$route.query.id);
    this.seeVoucheer();
  },
  computed:{
    tableData(){
       let res = this.detailData.filter(item=>{
            item.voucher_class = "全场赠劵";
            item.use_goods = "全场使用";
            let time =new Date(item.end_time).getTime() - new Date(item.start_time).getTime()
            item.status = time>0?"未过期":"过期";
            return item
        })
        console.log(res);
        return res
    }
  }
};
</script>

<style lang="scss" scoped>
.v-detail {
  padding: 0;
  margin: 0 auto;
  .list {
    margin: 20px 20px;
    border: 1px solid #e6e6e6;
  }
}
</style>