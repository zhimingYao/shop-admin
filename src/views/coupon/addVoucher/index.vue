<template>
  <div class="add-voucher">
    <div class="form">
      <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
        <el-form-item label="商店id">
          <el-input v-model="sizeForm.store_id"></el-input>
        </el-form-item>
        <el-form-item label="产品id">
          <el-input v-model="sizeForm.spu_id"></el-input>
        </el-form-item>
        <el-form-item label="优惠劵面额">
          <el-input v-model="sizeForm.deno"></el-input>
        </el-form-item>
        <el-form-item label="使用条件">
          <el-input v-model="sizeForm.condition"></el-input>
        </el-form-item>
        <el-form-item label="优惠劵名称">
          <el-input v-model="sizeForm.name"></el-input>
        </el-form-item>
        <div class="time">
          <div class="block">
            <span class="demonstration">开始时间</span>
            <el-date-picker
              v-model="sizeForm.start_time"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </div>
          <div class="block">
            <span class="demonstration">结束时间</span>
            <el-date-picker
              v-model="sizeForm.end_time"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </div>
        </div>
        <el-form-item size="large">
          <el-button type="primary" size="small" @click="onSubmit"
            >立即创建</el-button
          >
          <el-button size="small" @click="cancle()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getcookie } from "@/utils/cookiestorage.js";
export default {
  data() {
    return {
      sizeForm: {
        name: "优惠劵",
        store_id: getcookie("id"),
        spu_id: null,
        deno: 1,
        condition: 1,
        start_time: "",
        end_time: "",
      },
    };
  },
  methods: {
    onSubmit() {
      //   console.log("submit!", this.sizeForm);
      //   console.log(this.voucherData);
      this.$store
        .dispatch("voucher/addVoucher", this.voucherData)
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.$router.push("/marketing");
          }else{
            this.$message({
              type: "info",
              message: "添加失败!",
            });
          }
        })
    },
    cancle(){
        this.$router.push("/marketing");
    }
  },
  computed: {
    voucherData() {
      let res = {
        name: this.sizeForm.name,
        store_id: this.sizeForm.store_id,
        spu_id: this.sizeForm.spu_id,
        deno: this.sizeForm.deno,
        condition: this.sizeForm.condition,
        start_time: new Date(this.sizeForm.start_time).getTime(),
        end_time: new Date(this.sizeForm.end_time).getTime(),
      };

      return res;
    },
  },
};
</script>

<style lang='scss' scoped>
.add-voucher {
  padding: 0;
  margin: 0 auto;
}
.form {
  width: 700px;
  height: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #e4e4e4;
}
.time {
  display: flex;
  justify-content: space-between;
}
</style>