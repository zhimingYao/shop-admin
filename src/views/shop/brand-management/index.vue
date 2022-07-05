<template>
  <div class="brand-management">
    <div class="data-list">
      <el-card shadow="never" style="margin-top:20px;">
        <span>
          <i class="el-icon-document"></i>
          数据列表
        </span>
        <button type="button" class="el-button el-button--primary el-button--small" style="float: right; "
          @click="addBrand">
          <span>添加</span>
        </button>
      </el-card>
    </div>
    <!-- <div class="table"> -->
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="name" label="LOGO" width="200">
          <template slot-scope="scope">
            <img :src="scope.row.image" alt="" style="height:60px">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="品牌名称" width="380">
        </el-table-column>
        <el-table-column prop="letter" label="品牌首字母" width="380">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button plain size="small" @click="editorShop(scope.row)">更新</el-button>
            <el-button type="danger" plain size="small" @click="deleteShop(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
  <!-- </div> -->
</template>

<script>
import { getBrands, deleteBrand } from '@/api/brand'
export default {
  name: 'BrandManagement',

  data() {
    return {
      tableData: []
    };
  },

  mounted() {

  },
  created() {
    // 渲染页面
    this.getBrands()
  },
  methods: {
    // 点击添加
    addBrand() {
      this.$router.push('/shop/addBrand')
    },
    // 渲染页面
    getBrands() {
      getBrands({ store_id: this.$store.state.user.id }).then((res) => {
        console.log(res);
        this.tableData = res.data;
      }).catch((err)=>{
        console.log(err);
      })
    },
    // 更新
    editorShop(data) {
      let name = data.name;
      this.$router.push(`/shop/addBrand?name=${name}`)
    },
    // 删除
    deleteShop(data) {
      deleteBrand({ id: data.id }).then((res) => {
        console.log(res);
        this.$message('删除成功');
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.brand-management {
  width: 95%;
  margin: 20px auto;
}
</style>