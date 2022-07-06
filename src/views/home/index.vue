<template>
  <div class="main">
    <div class="datainfo">
      <div class="total">
        <div class="icon">
          <i class="el-icon-s-order"></i>
        </div>
        <div class="info">
          <span>今日订单总数</span>
          <p>200</p>
        </div>
      </div>
      <div class="total">
        <div class="icon">
          <i class="el-icon-money"></i>
        </div>
        <div class="info">
          <span>今日销售总额</span>
          <p>200</p>
        </div>
      </div>
      <div class="total">
        <div class="icon">
          <i class="el-icon-coin"></i>
        </div>
        <div class="info">
          <span>昨日销售总额</span>
          <p>200</p>
        </div>
      </div>
      <div class="total">
        <div class="icon">
          <i class="el-icon-box"></i>
        </div>
        <div class="info">
          <span>全部商品</span>
          <p>200</p>
        </div>
      </div>
    </div>
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
let Echarts = require("echarts/lib/echarts"); //基础实例 注意不要使用import
require("echarts/lib/chart/bar"); //按需引入 bar = 柱状图
export default {
  data() {
    return { chart: null };
  }, //图表实例
  mounted() {
    this.init();
    window.addEventListener("resize", () => {
      this.chart.resize();
    });
  },
  methods: {
    init() {
      // console.log(this.$refs.chart,document.getElementsByClassName('chart'));
      //2.初始化
      // this.chart = Echarts.init(this.$refs.chart);
      this.chart = Echarts.init(document.getElementsByClassName('chart')[0]);
      //3.配置数据
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        }, //X轴
        yAxis: { type: "value" }, //Y轴
        series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: "bar" }], //配置项
      };
      // 4.传入数据
      this.chart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 0;
  margin: 0 auto;
}
.datainfo {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 80px auto;
}
.total {
  width: 22%;
  display: flex;
  justify-content: start;
  padding: 10px 10px;
  border-radius: 10px;
  border: 1px solid #e4e3e4;
  .icon {
    width: 30%;
    font-size: 60px;
    color: blue;
  }
  .info {
    line-height: 10px;
    margin-top: 20px;
  }
}
.chart {
  width: 100%;
  height: 400px;
}
</style>