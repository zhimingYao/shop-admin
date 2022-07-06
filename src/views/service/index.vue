<template>
  <div class="service">
    <div class="cs">
      <div class="sidebar">
        <div class="search">
          <el-input
            class=""
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input"
            size="small"
          >
          </el-input>
        </div>
      </div>
      <div class="customer">
        <svg-icon icon-class="logo" style="width:160px;height:160px;filter:grayscale(100%)"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            input:"",
        }
    },
};
</script>

<style lang="scss" scoped>
.service {
  padding: 0;
  margin: 0 auto;
}
.cs {
  width: 100%;
  height: 100vh;
  background-color: #f4f4f4;
  display: flex;
  .sidebar {
    width: 25%;
    height: 100%;
    background-color: #e0e0e0;
    .search{
        width: 90%;
        padding: 10px 0;
        margin: 0 auto;
    }
  }
  .customer {
    width: 75%;
    height: 100%;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>