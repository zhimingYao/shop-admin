<template>
  <div class="add-brand">
    <el-form ref="form" :model="form" label-width="80px">

      <el-form-item label="产品分类">
        <el-cascader v-model="productCateOptionsValue" :options="productCateOptions" clearable
          @change="handleCateChange">
        </el-cascader>
      </el-form-item>

      <el-form-item label="*品牌名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="*品牌首字母">
        <el-input v-model="form.firstLetter"></el-input>
      </el-form-item>


      <el-form-item label="*品牌LOGO" class="brand-img">
        <el-upload class="upload-demo" action="/upload/upload" list-type="picture" v-model="form.img"
          :on-success="handleSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

      </el-form-item>

      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCateGory, addBrand } from '@/api/shop.js'
import { uploadImg } from '../uploadImg';
export default {
  name: 'AddBrand',

  data() {
    return {
      form: {
        name: "", // 商品名
        firstLetter: "",
        img: "",
      },
      productCateOptionsValue: [],
      productCateOptions: [
        {
          value: "shumajiadian",
          label: "数码家电",
          children: [

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
          children: [{
            value: '1',
            label: '休闲上衣'
          },
          {
            value: '2',
            label: '短袖针织衫'
          },
          {
            value: '3',
            label: '中袖针织衫'
          },
          {
            value: '4',
            label: '梭织休闲长裤'
          },
          {
            value: '5',
            label: '梭织运动长裤'
          }],
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
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      maxUpload: 1,
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
    }
  },
  methods: {
    brandChange() {
      if (this.form['brandName'] === "添加新品牌") {
        this.$confirm('添加新商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/shop/addBrand')
        })
      }
    },
    onSubmit() {
      console.log('submit!');
    },
    // 上传图片
    uploadImg() {
      uploadImg()
    },
    // 分类改变时
    handleCateChange() {
      // console.log("改变了分类");
      // console.log(this.productCateOptionsValue);
      let brandArr = this.productCateOptionsValue;
      // console.log(brandArr[1]);
      // 获取品牌名
    },
    // 上传文件的几个函数
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.form.img = file.url.slice(5);
    },
    // 点击提交
    handleNext() {
      let data = { name: this.form.name, image: this.form.img, letter: this.form.firstLetter }
      addBrand(data).then((res) => {
        console.log(res);
        console.log(data);
      }).catch((err) => {
        console.log(err);
      })
      this.$router.go(-1)
    }
  },

  created() {
    if (this.$route.query) {
      this.form = {
        name: this.$route.query.name, // 商品名
        firstLetter: "",
        img: "",
      };
    }
  },

  mounted() {

  },
  watch: {

  }
};
</script>

<style lang="scss">
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

  .brand-img {
    .brand-img-div {
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

      .file {
        color: transparent;
        text-indent: 0;

      }
    }

  }

  .el-form-item {
    .el-form-item__label {
      width: 120px !important;
    }

    .el-form-item__content {
      width: 500px !important;
      box-sizing: border-box !important;
      margin-left: 130px !important;
    }
  }

}
</style>