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
          <button type="button" class="el-button el-button--primary el-button--small" style="float: right; ">
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
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </el-table-column>
          <el-table-column prop="sale" label="销量" width="150">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button plain size="small" @click="editorShop(scope.row)">编辑</el-button>
              <el-button plain size="small">添加优惠卷</el-button>
              <el-button type="danger" plain size="small" @click="deleteShop(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import { getShopList, getStock, deleteSpu } from '@/api/shop.js';
export default {
  name: 'ShopList',
  data() {
    return {
      // 搜索框
      form: {
        input: '',
      },
      // table数据
      tableData: []
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
        this.tableData = res.data;
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
      // console.log(data.title);
      let name = data.title;
      let brandName = data.title.slice(0, 2);
      let img = data.img;
      let price = data.price;
      this.$router.push(`/shop/addShop?name=${name}&brandName=${brandName}&img=${img}&price=${price}`)
    },
    // 删除商品
    deleteShop(data) {
      deleteSpu({ id: data.id }).then((res) => {
        this.getShopList()
      })
    }
  },
  computed: {
    // 获取库存
    getStock() {
      return res
      getStock(category_id)
    }
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
}
</style>