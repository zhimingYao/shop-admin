<template>
  <div class="backTop">
    <el-backtop 
    :style="{bottom:bottom+'px',right:right+'px',height:height+'px',width:width+'px'}">
      <div>
        {{ this.text }}
        <slot></slot>
      </div>
    </el-backtop>
  </div>
</template>

<script>
export default {
  name: "BackTop",
  props: {
    // style:{
    //     type:Object,
    //     default(){
    //         return {

    //         }
    //     }}
    // },
    width:{
      type:Number,
      default:60,
    },
    height: {
      type: Number,
      default: 60,
    },
    right: {
      type: Number,
      default: 200,
    },
    bottom: {
      type: Number,
      default: 200,
    },
    text: {
      type: String,
      default: "返回",
    },
  },
};
</script>

<style lang='scss' scoped>

</style>