<template>
  <div id="secondMenu">
    <el-card shadow="never" style="margin:20px auto;width: 95%;">
      数据列表
      <el-button type="mini" style="float:right;" @click="addName">添加</el-button>
    </el-card>
    <el-table :data="secondMenu" border style="margin-top:10px;">
      <el-table-column prop="id" label="编号" align="center"></el-table-column>
      <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="action" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteSecondMenu(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="add">
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form>
          <el-form-item>
            <el-select placeholder="请选择二级分类" v-model="category_id">
              <el-option v-for="(item, index) in addNameArr" :value="item.id" :key="index" :label="item.name">
                {{ item.name }}</el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addOkHandle">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import { getSubMenu, , getStock } from "@/api/product";
import { getSecondList, addParent, selectParentNotNull, deleteSubmenu } from "@/api/menu";
export default {
  data() {
    return {
      dialogVisible: false,
      updateName: "",
      secondMenu: [],
      addNameArr: [],
      name: "",
      category_id: '',
      parent_name: ''
    };
  },
  created() {
    this.getSecondList();
  },
  computed: {

  },
  methods: {
    // 点击确定
    addOkHandle() {
      addParent({
        store_id: this.$store.state.user.id,
        category_id: this.category_id
      })
        .then(res => {
          // console.log(this.category_id);
          if (res.code == 200) {
            // console.log(res, "插入成功");
            this.dialogVisible = false;
            this.$message({
              type: "success",
              message: "插入成功"
            });
            this.getSecondList();
          } else {
            this.$message({
              type: "error",
              message: "插入失败"
            });
          }
          this.dialogVisible = false;
        })
        .catch(err => {
          console.log(err, "插入失败");
        });
    },
    // 点击添加
    addName() {
      this.dialogVisible = true;
      // console.log(this.parent_name);
      selectParentNotNull({
        parent_name: this.$route.query.parent_name
      }).then(res => {
        this.addNameArr = res.data;
        // console.log(this.addNameArr);
        for (let i = 0; i < this.addNameArr.length; i++) {
          this.name = this.addNameArr[i].name;
          this.category_id = this.addNameArr[i].id;
        }
        // console.log(this.name, this.category_id);
      }).catch(err => {
        console.log(err, '获取失败');
      })

    },
    // 获取列表
    getSecondList() {
      getSecondList({
        store_id: this.$store.state.user.id,
        parent_name: this.$route.query.parent_name
      }).then(res => {
        this.secondMenu = res.data.data;
        // console.log(res, '获取成功');
      }).catch(err => {
        console.log(err, '获取失败');
      })
    },
    // 点击表单叉号提示确认关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    // 删除
    deleteSecondMenu(index, row) {
      // console.log(row);
      deleteSubmenu({
        id: row.id,
        parent_name: this.parent_name
      })
        .then(res => {
          // console.log(res, "删除成功了呦");
          location.reload();
        })
        .catch(err => {
          console.log(res, "删除失败了啊");
        });
    }
  }
};
</script>
