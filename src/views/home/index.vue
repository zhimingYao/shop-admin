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
    <div class="chart" ref="chart">
    </div>
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts"); //基础实例 注意不要使用import
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
      this.chart = echarts.init(document.getElementsByClassName("chart")[0]);
      //3.配置数据
      let option = {
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        title: {
          text: "订单统计",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        // legend: {
        //   data: ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5"],
        // },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "20%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Line 1",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgb(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [140, 232, 101, 264, 90, 340, 250],
          },
          {
            name: "Line 2",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(0, 221, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(77, 119, 255)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [120, 282, 111, 234, 220, 340, 310],
          },
          {
            name: "Line 3",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(55, 162, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(116, 21, 219)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [320, 132, 201, 334, 190, 130, 220],
          },
          {
            name: "Line 4",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 0, 135)",
                },
                {
                  offset: 1,
                  color: "rgb(135, 0, 157)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 402, 231, 134, 190, 230, 120],
          },
          {
            name: "Line 5",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 191, 0)",
                },
                {
                  offset: 1,
                  color: "rgb(224, 62, 76)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 302, 181, 234, 210, 290, 150],
          },
        ],
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
  width: 80%;
  height: 400px;
  margin: 0 auto;
}
</style>