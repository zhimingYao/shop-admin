<template>
  <div class="add-shop">
    <el-form ref="form" :model="form" label-width="80px">

      <el-form-item label="产品分类">
        <el-cascader v-model="productCateOptionsValue" :options="productCateOptions" clearable
          @change="handleCateChange"></el-cascader>
      </el-form-item>

      <el-form-item label="产品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="产品品牌">
        <el-select v-model="form.region" placeholder="添加新品牌">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="产品图片" class="product-img">
        <div class="product-img-div" @click="uploadImg"><i> + </i></div>
      </el-form-item>

      <el-form-item label="产品介绍" prop="desc">
        <el-input type="textarea" placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item label="产品售价">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写商品属性</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCateGory } from '@/api/shop.js'
export default {
  name: 'AddShop',

  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      productCateOptionsValue: [],
      productCateOptions: [
        {
          value: "shumajiadian",
          label: "数码家电",
          children: [
            {
              value: '1',
              label: 'xiangji'
            }
          ],
        },
        {
          value: "jujiashenghuo",
          label: "居家生活",
          children: [],
        },
        {
          value: "fushi",
          label: "服饰",
          children: [],
        },
        {
          value: "meishi",
          label: "美食",
          children: [],
        },
        {
          value: "gehuqignjie",
          label: "个护清洁",
          children: [],
        },
        {
          value: "shoushizhubao",
          label: "首饰珠宝",
          children: [],
        },
      ],
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    uploadImg() {
    },
    // 分类改变时
    handleCateChange() {
      console.log("改变了分类");
      console.log(this.selectProductCateValue);
      let brandArr = this.productCateOptionsValue;
      console.log(brandArr[1]);
      // 获取品牌名
    },
    // 获取2级分类
    async getProductCateList() {
      for (let i = 0; i < this.productCateOptions.length; i++) {
        let message = { parent_name: "" };
        message.parent_name = this.productCateOptions[i].label;
        await getCateGory(message)
          .then((res) => {
            console.log(res.data.data, i);
            let titleName = res.data.data;
            for (let k = 0; k < titleName.length; k++) {
              // console.log(titleName[i])
              this.productCateOptions[i].children.push({
                value: `${titleName[k].id}`,
                label: `${titleName[k].name}`,
              });
            }

            // console.log(this.productCateOptions)
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  },

  created() {
    this.getProductCateList()

  },

  mounted() {

  },
};
</script>

<style lang="scss" scoped>
.add-shop {
  width: 100%;
}

.el-form {
  width: 800px;
  height: 617px;
  margin: 20px auto;
  padding: 40px;
  box-sizing: border-box;
  border: 1px solid rgb(229, 229, 229);

  .product-img {
    .product-img-div {
      width: 128px;
      height: 128px;
      border: 1px dashed rgb(160, 159, 159);
      border-radius: 10px;

      i {
        display: inline-block;
        width: 28px;
        height: 28px;
        margin: 50% 50%;
        transform: translate(-20%, -50%);
      }

      &:hover {
        border: 1px dashed rgb(63, 130, 255);
      }
    }

  }
}
</style>