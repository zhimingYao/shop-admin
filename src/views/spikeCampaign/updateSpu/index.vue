<template>
  <div class="updateSpu">
    <el-dialog title="修改商品" :visible="isShow" :show-close="false">
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          {{ form.title }}
        </el-form-item>
        <el-form-item label="产品原价格" :label-width="formLabelWidth">
          {{ form.price }}元
        </el-form-item>
        <el-form-item label="秒杀优惠价格" :label-width="formLabelWidth">
          <el-input v-model="form.special_price" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="oncancle()"> 取 消 </el-button>
        <el-button type="primary" @click="onsubmit()"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSpu, updataSpu } from "@/api/shop.js";
export default {
  name: "updateSpu",
  data() {
    return {
      form: {},
      formLabelWidth: "140px",
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    spu_id: {
      type: Number,
      default: false,
    },
  },
  methods: {
    onsubmit() {
      updataSpu(this.updateData).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "更新成功",
          });
        }
        this.$emit("showUpdateSpu", false);
      });
    },
    oncancle() {
      this.$emit("showUpdateSpu", false);
    },
    getSpu() {
      let data = {
        id: this.spu_id,
      };
      //   console.log(data);
      getSpu(data)
        .then((res) => {
          //   console.log(res);
          this.form = res.data[0];
        })
        .catch((err) => {
          //   console.log(err);
        });
    },
  },
  created() {},
  watch: {
    isShow(val) {
      // console.log(val,"isShow");
      if (val) {
        this.getSpu();
      }
    },
  },
  computed: {
    updateData() {
      let res = {
        id: this.form.id,
        img: this.form.img,
        is_special: 2,
        price: 549,
        special_price: this.form.special_price,
        title: "安踏女鞋弹力胶跑鞋2021新款",
      };
      return res;
    },
  },
};
</script>

<style>
</style>