## elemetnUi

### 组件特点

- 1：`el-xxx`开头的组件

- 2：提供了插件,带有功能性组件。基本上都有插件。都可以支持 api调用
**Notice中组件都有插件，支持api**
~~~
1 loading
2 Message
3 MessageBox
...
~~~

- 3 表单验证
  - 属性验证
  - 自定义验证。
  - 高级验证

### 读文件
- 1：查看示例代码。复制贴贴。实现对应的效果
- 2：文档的最下面，有每一个属性的作用
  - 2.1 props 
  - 2.2 事件

### 栅格系统

作用用户：父子元素之间的布局,通过 el-col 组件控制元素的宽度

- 1：将一个容器 等分为 24份，每份 20 / 100% 的宽度
- 2: 更具屏幕尺寸设置不同的分数
~~~html
<div id="test">
    <!-- 宽度：为 11*24/100% * #test的宽度 -->
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <!-- #test的欢度的 2/24 -->
   <el-col class="line" :span="2">-</el-col>
    <!-- #text的宽度的 11/24  -->
   <el-col :span="11">
     <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
   </el-col>
 </div>   
~~~


### 表单组件

