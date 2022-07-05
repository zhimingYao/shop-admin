<template>
  <div class="addSpike">
    <el-dialog title="编辑信息" :visible="isShow" :show-close="false">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.active_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参加活动的商品id" :label-width="formLabelWidth">
          <el-input v-model="form.spu_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动开始时间" :label-width="formLabelWidth">
          <el-time-picker
            v-model="form.star_time"
            :picker-options="{
              selectableRange: '0:00:00 - 23:59:59',
            }"
            placeholder="任意时间点"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-time-picker v-model="form.end_time" placeholder="任意时间点">
          </el-time-picker>
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
export default {
  name: "updataSpike",
  data() {
    return {
      form: {
        active_name: "",
        spu_id: "",
        star_time: "",
        end_time: "",
      },
      formLabelWidth: "140px",
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    spike_item: {
      type: Object,
      default: {},
    },
  },
  methods: {
    onsubmit() {
      console.log(this.spikedata);
      this.$store.dispatch("spike/updatespike", this.spikedata).then((res) => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "更新成功",
          });
          this.$emit("showUpdateSpike", false);
        }
      });
    },
    oncancle() {
      this.$emit("showUpdateSpike", false);
    },
  },
  computed: {
    spikedata() {
      let res = {
        id: this.form.id,
        active_name: this.form.active_name,
        spu_id: this.form.spu_id,
        star_time: new Date(this.form.star_time).getTime(),
        end_time: new Date(this.form.end_time).getTime(),
      };
      return res;
    },
  },
  watch: {
    isShow(val) {
      if (val) {
        this.form = this.spike_item;
      }
    },
  },
};
</script>

<style>
</style>