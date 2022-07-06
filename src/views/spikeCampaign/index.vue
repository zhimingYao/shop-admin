<template>
  <div class="s-active">
    <div class="action-search">
      <div class="title">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div class="search">
        <el-input placeholder="优惠卷名称" v-model="active_name"></el-input>
        <el-button type="primary" size="small" @click="selectspike()"
          >查询搜索</el-button
        >
      </div>
    </div>
    <div class="data-list">
      <div class="add-list">
        <div class="title">
          <i class="el-icon-document"></i>
          <span>数据列表</span>
        </div>
        <div class="add">
          <el-button size="small" @click="addSpike()">添加活动</el-button>
        </div>
      </div>
      <div class="list">
        <el-table
          :data="active_list"
          border
          style="width: 100%"
          cell-class-name="cell"
        >
          <el-table-column prop="id" label="id" width="100"> </el-table-column>
          <el-table-column prop="spu_id" label="秒杀商品编号" width="140">
          </el-table-column>
          <el-table-column
            prop="active_name"
            label="活动标题"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="condition"
            label="活动状态"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="star_time"
            label="开始时间"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="end_time"
            label="结束时间"
            width="180"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="updatespu(scope.row.spu_id)"
              >
                修改商品
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="updatespike(scope.row)"
              >
                编辑活动
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="delspike(scope.row.id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <add-spike :isShow="isShow" @showAddSpike="showAddSpike()" />
    <update-spu
      :isShow="isShow_1"
      :spu_id="spu_id"
      @showUpdateSpu="showUpdateSpu()"
    />
    <update-spike
      :isShow="isShow_2"
      :spike_item="spike_item"
      @showUpdateSpike="showUpdateSpike()"
    />
  </div>
</template>

<script>
import addSpike from "./addSpike";
import updateSpu from "./updateSpu";
import updateSpike from "./updateSpike";
export default {
  components: {
    addSpike,
    updateSpu,
    updateSpike,
  },
  data() {
    return {
      active_name: "",
      active_data: [],
      isShow: false,
      isShow_1: false,
      spu_id: 0,
      spike_item: {},
      isShow_2: false,
    };
  },
  methods: {
    getspike() {
      this.$store.dispatch("spike/getspike").then((res) => {
        // console.log(res);
        this.active_data = res.res || [];
      });
    },
    addSpike() {
      this.isShow = true;
    },
    showAddSpike(isShow) {
      this.isShow = isShow;
      this.getspike();
    },
    updatespu(spu_id) {
      this.isShow_1 = true;
      this.spu_id = spu_id;
    },
    showUpdateSpu(isShow_1) {
      this.isShow_1 = isShow_1;
    },
    selectspike() {
      if (this.active_name) {
        this.$store.dispatch("spike/selectspike", {
        active_name: this.active_name,
      }).then((res) => {
        console.log(res);
        this.active_data = res.res
      });
      }else{
        this.getspike()
      }
      
    },
    updatespike(spike_item) {
      this.spike_item = spike_item;
      this.isShow_2 = true;
    },
    showUpdateSpike(isShow_2) {
      this.isShow_2 = isShow_2;
      this.getspike();
    },
    delspike(id) {
      this.$store.dispatch("spike/delspike", { id }).then((res) => {
        // console.log(res);
        this.getspike();
      });
    },
  },
  created() {
    this.getspike();
  },
  computed: {
    active_list() {
      let res = [...this.active_data];
      res.filter((item) => {
        let time = new Date(item.end_time).getTime() - new Date().getTime();
        let time1 = new Date(item.star_time).getTime() - new Date().getTime();
        if (time1 > 0) {
          item.condition = "未开始";
        } else {
          item.condition = time >= 0 ? "正在进行" : "已结束";
        }
      });
      return res;
    },
  },
};
</script>

<style lang="scss" scoped>
.s-active {
  width: 100%;
  padding: 0;
  margin: 0 auto;
}
.action-search {
  margin: 20px 20px;
  border: 1px solid #e6e6e6;
  .title {
    width: 100%;
    margin: 20px 20px;
    span {
      margin-left: 10px;
    }
  }
  .search {
    width: 300px;
    display: flex;
    margin: 20px 20px;
    font-size: 12px;
    .el-button {
      margin-left: 20px;
    }
  }
}
.data-list {
  .add-list {
    margin: 20px 20px;
    border: 1px solid #e6e6e6;
    display: flex;
    .title {
      width: 100%;
      margin: 20px 20px;
      span {
        margin-left: 10px;
      }
    }
    .add {
      margin: 20px 20px;
    }
  }
  .list {
    margin: 20px 20px;
    border: 1px solid #e6e6e6;
    .cell {
      text-align: center;
      color: red;
    }
  }
}
</style>