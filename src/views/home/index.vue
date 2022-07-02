<template>
  <div>
    <el-form :model="obj" ref="formData">
      <!--
        1  prop 属性 通知组件内部，需要验证的什么数据
        2 rules 是 el-form 或者el-form-item 中属性
       -->
      <!-- 
        trigger  设置什么时候验证，默认 失去焦点，改变 change事件
        required 是否必填
        message  验证不通过的提示信息
        type     验证数据类型 
           number 数字
           email  邮箱
           date  日期
           array
        min  最小长度
        max 最大长度
        pattern 输入自定义的正则规则
           
       -->
      <el-form-item
        prop="a"
        :rules="[
          { required: true, message: '必须添加a', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在3到12之间', trigger: 'blur' },
        ]"
      >
        <el-input v-model="obj.a" />
      </el-form-item>
      <el-form-item
        prop="b"
        :rules="[
          { required: true, trigger: 'blur', message: '请输入文本内容' },
          { pattern: /\d{3,12}/, message: '请输入3到12的数字' },
        ]"
      >
        <el-input v-model="obj.b" />
      </el-form-item>

      <el-form-item prop="c" :rules="cRules" ref="itemRule">
        <el-input v-model="obj.c" />
      </el-form-item>

      <el-button @click="handle">点击获取表单验证结果</el-button>
    </el-form>

    <!-- 第二个表单,点击收验证 -->
    <el-form
      :model="a"
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="年龄"
        prop="age"
        :rules="[
          { required: true, message: '年龄不能为空' },
          { type: 'number', message: '年龄必须为数字值' },
        ]"
      >
        <el-input
          type="age"
          v-model.number="a.age"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const validator_C = (rules, value, callback) => {
      // 这里可以编写自定义配置
      // console.log(rules);
      // console.log(value); // 输入框中value之
      // console.log(callback); // callback 作用抛出错误提示信息，作用类似message
      // callback(new Error('哈哈哈哈哈'))
      if (value.trim() === "") {
        let res = callback(new Error("请输入文本内容"));
        //  console.log(res); // undefined
        return;
      }
      let reg = /\w{2}/;
      if (!reg.test(value)) {
        callback(new Error("请输入长度为2的随机字符"));
        return;
      }
      return true;
    };
    return {
      obj: {
        a: "",
        b: "",
        c: "",
      },
      cRules: [
        // { required: true, trigger: 'blur', message: '请输入文本内容' },
        { validator: validator_C, trigger: "blur" },
      ],
      a:{
        age:''
      }
    };
  },
  methods: {
    // 点击时候验证表单,需要将所有规则 将所有的 trigger删除.或者将规则放在 el-form上
    handle() {
      console.log("aaa");
      // console.log(this.$refs['formData']);
      // validate() 点击按钮验证表单时候,触发函数.
      // 表单验证通过 vaild 返回 true 不通过为 false
      this.$refs["formData"].validate((vaild) => {
        console.log("表单验证结束了");
        console.log(vaild);
      });
    },
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log('提交验证结果:',valid);
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
     },
  },
};
</script>

<style>
</style>