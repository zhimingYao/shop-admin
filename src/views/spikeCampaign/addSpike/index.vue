<template>
  <div class="addSpike">
    <el-dialog title="添加活动" :visible="isShow" :show-close="false">
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
          <el-time-picker
            v-model="form.end_time"
            placeholder="任意时间点"
          >
          </el-time-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="oncancle()"> 取 消 </el-button>
        <el-button type="primary" @click="onsubmit()">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "addSpike",
  data() {
    return {
      form: {
        active_name: "",
        spu_id:"",
        star_time: "",
        end_time: "",
      },
      formLabelWidth: "140px",
    };
  },
  props:{
    isShow:{
      type:Boolean,
      default:false,
    }
  },
  methods: {
    onsubmit(){
      this.$store.dispatch('spike/addspike',this.spikedata).then(res=>{
        this.$message({
          type:"success",
          message:"添加成功"
        })
        this.$emit('showAddSpike',false)
      })
    },
    oncancle(){
      this.$emit('showAddSpike',false)
    }
  },
  computed:{
    spikedata(){
      let res = {
        active_name: this.form.active_name,
        spu_id:this.form.spu_id,
        star_time: new Date(this.form.star_time).getTime(),
        end_time: new Date(this.form.end_time).getTime(),
      }
      return res
    }
  }
};
</script>

