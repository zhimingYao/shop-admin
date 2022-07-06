<template>
  <div class="shop-list">
    <div class="search">
      <div class="search-top">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div class="search-bottom">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="输入搜索：">
            <el-input v-model="form.input" placeholder="商品名称"></el-input>
          </el-form-item>
        </el-form>
        <div class="search-button">
          <button type="button" class="el-button el-button--primary el-button--small" style="float: right; "
            @click="searchShop">
            <span>查询结果</span>
          </button>
          <button type="button" class="el-button el-button--default el-button--small"
            style="float: right;  margin-right: 15px;" @click="rewrite">
            <span>重置</span>
          </button>
        </div>
      </div>
    </div>
    <div class="data-list">
      <el-card shadow="never" style="margin-top:20px;">
        <span>
          <i class="el-icon-document"></i>
          数据列表
        </span>
        <button type="button" class="el-button el-button--primary el-button--small" style="float: right; "
          @click="addShop">
          <span>添加</span>
        </button>
      </el-card>
    </div>
    <div class="table">
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column width="80" type="selection">
          </el-table-column>
          <el-table-column prop="id" label="编号" width="150">
          </el-table-column>
          <el-table-column prop="img" label="商品图片" width="150">
            <template slot-scope="scope">
              <img :src="scope.row.img" alt="" style="height: 80px">
            </template>
          </el-table-column>
          <el-table-column prop="title" label="商品名称" width="180">
          </el-table-column>

          <el-table-column prop="price" label="价格" width="180">
            <template slot-scope="scope">￥{{ scope.row.price }}
            </template>
          </el-table-column>


          <el-table-column prop="" label="SKU库存" width="150">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="kuCun(scope.row)"></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="sale" label="销量" width="150">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button plain size="small" @click="editorShop(scope.row)">编辑</el-button>
              <el-button plain size="small" @click="addCoupon(scope.row)">添加优惠卷</el-button>
              <el-button type="danger" plain size="small" @click="deleteShop(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="tableDatas.length" :page-size="20"
        @current-change="currentChange" :current-page.sync="currentPage">
      </el-pagination>
    </div>
    <div class="kucun-table">
      <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
          <el-table-column property="price" label="销售价格" width="350"></el-table-column>
          <el-table-column property="kucun" label="商品库存" width="400"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getShopList, getStock, deleteSpu, search } from '@/api/shop.js';
export default {
  name: 'ShopList',
  data() {
    return {
      // 搜索框
      form: {
        input: '',
      },
      // table总数据
      tableDatas: [],
      // table展示数据
      tableData: [],
      currentPage: 1,
      gridData: [{
        price: '',
        kucun: 0,
      },],
      dialogTableVisible: false,
    }
  },
  created() {
    // 渲染页面
    this.getShopList()
  },
  methods: {
    // 重置按钮
    rewrite() {
      this.form.input = '';
    },
    // 获取商品列表
    getShopList() {
      getShopList({ store_id: '1' }).then((res) => {
        this.tableDatas = res.data;
        this.tableData = this.tableDatas.slice(0, 19)
      }).catch((err) => {
        // console.log(err);
      })
    },
    // 点击添加 跳转添加商品界面
    addShop() {
      this.$router.push('/shop/addShop')
    },
    // 编辑商品
    editorShop(data) {
      let name = data.title;
      let brandName = data.title.slice(0, 2);
      let img = data.img;
      let price = data.price;
      this.$router.push(`/shop/addShop?name=${name}&brandName=${brandName}&img=${img}&price=${price}`)
    },
    // 删除商品
    deleteShop(data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        deleteSpu({ id: data.id }).then((res) => {
          this.getShopList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 添加优惠卷
    addCoupon(data) {
      let id = data.id;
      this.$router.push(`/marketing/addvoucher?id=${id}`)
    },
    // 根据关键字搜索商品
    searchShop() {
      let input = this.form.input;
      search({ keyword: input }).then((res) => {
        this.tableData = res.data;
      }).catch((err) => {
        // console.log(err);
      })
    },
    // 当页数变化时，页面渲染20个，（当前页数-1）*20--当前页数*20-1
    currentChange() {
      let page = this.currentPage;
      this.tableData = this.tableDatas.slice((page - 1) * 20, page * 20 - 1);
    },
    // 库存按钮
    kuCun(data) {
      this.dialogTableVisible = true;
      this.gridData[0].price = data.price;
      let category_id = data.category_id;
      console.log(category_id);
      getStock({ category_id: category_id }).then((res) => {
        this.gridData[0].kucun = res.data[0]
      })
    }
  },
  computed: {

  }
}
</script>

<style lang="scss">
.shop-list {
  width: 95%;
  margin: 0 auto;

  .search {
    width: 100%;
    border: 1px solid rgb(217, 217, 217);
    height: 125px;
    margin-top: 20px;
    border-radius: 5px;

    .search-top {
      margin: 20px 0 10px 20px;
    }

    .search-bottom {
      display: flex;
      justify-content: space-between;

      .el-form-item {
        width: 500px;
        display: flex;
        justify-content: left;
        line-height: 125px;

        .el-form-item__label {
          width: 120px !important;
        }

        .el-form-item__content {
          width: 200px;
        }
      }

      .search-button {
        margin-right: 20px;
      }
    }
  }

  .data-list {
    .el-card__body {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  .page {
    width: 100%;

    .el-pagination {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>