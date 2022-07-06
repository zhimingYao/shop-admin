<template>
  <div class="shop-categories">
    <div class="data-list">
      <el-card shadow="never" style="margin-top:20px;">
        <span>
          <i class="el-icon-document"></i>
          数据列表
        </span>
        <button type="button" class="el-button el-button--primary el-button--small" style="float: right; "
          @click="addFirstCategories">
          <span>添加</span>
        </button>
      </el-card>
    </div>
    <div class="form">
      <el-dialog title="提示" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="" :label-width="formLabelWidth">
            <el-select placeholder="请选择一级分类" v-model="category_id">
              <el-option v-for="(item, index) in addParentNameArr" :value="item.id" :key="index" :label="item.name">
                {{ item.name }}</el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addParent">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="table">
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="编号" width="380">
          </el-table-column>
          <el-table-column prop="name" label="分类名称" width="380">
          </el-table-column>
          <el-table-column label="设置" width="280">
            <template slot-scope="scope">
              <el-button size="mini" @click="getMenu(scope.$index, scope.row)">查看下级</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="deleteProductType(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

    </div>
  </div>
</template>

<script>
import { getMenu, addParent, selectParentNameNUll, deleteProduct } from '@/api/menu'
export default {
  name: 'ShopCategories',

  data() {
    return {
      // 表单是否展示
      dialogFormVisible: false,

      formLabelWidth: "120",
      // 表格数据
      tableData: [
        //   {
        //   date: '1',
        //   name: '衣服',
        //   address: '上海市普陀区金沙江路 1518 弄'
        // }, {
        //   date: '2',
        //   name: '鞋帽',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }
      ],
      // 获取到的分类
      addParentNameArr: [],
      category_id: [],
    };
  },
  created() {
    // 自动渲染品类
    this.getMenu()
  },
  mounted() {

  },

  methods: {
    // 点击添加，表单显示
    addFirstCategories() {
      this.dialogFormVisible = true;
      // 发请求获取分类
      selectParentNameNUll({
        parent_name: ''
      }).then(res => {
        if (res.code == 200) {
          this.addParentNameArr = res.data;
          for (let i = 0; i < this.addParentNameArr.length; i++) {
            this.category_id = this.addParentNameArr[i].id
          }
        }
      }).catch(err => {
        console.log(err, '获取失败');
      })
    },
    // 获取二级品类
    getMenu(index, row) {
      this.$router.push({
        path: "/shop/productSecondMenu",
        query: {
          parent_name: row.name,
          id: row.id
        }
      });
    },
    // 添加品类
    addParent() {
      addParent({
        store_id: this.$store.state.user.id,
        category_id: this.category_id
      }).then(res => {
        if (res.code == 200) {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '插入成功'
          })
        }
        this.dialogVisible = false
      }).catch(err => {
        this.$message({
          type: 'error',
          message: '插入失败'
        })
        console.log(err, '插入失败');
      })
    },
    deleteProductType(index, row) {
      this.$confirm("是否要删除该品牌", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteProduct({ id: row.id }).then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          // console.log(row.id, res);
          location.reload();
        });
      });
    },
  },
  computed: {

  }
};
</script>

<style lang="scss" scoped>
.shop-categories {
  width: 95%;
  margin: 0 auto;

  .data-list {
    width: 100%;
    margin: 0 auto;
  }
}
</style>