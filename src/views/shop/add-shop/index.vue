<template>
  <div class="add-shop">
    <el-form ref="productInfoForm" :model="form" label-width="80px">

      <el-form-item label="产品分类">
        <el-cascader v-model="productCateOptionsValue" :options="productCateOptions" clearable
          @change="handleCateChange">
        </el-cascader>
      </el-form-item>

      <el-form-item label="*产品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="*产品品牌">
        <el-select v-model="form.brandName" placeholder="添加新品牌" @change="brandChange">
          <el-option value="添加新品牌"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="产品图片" class="product-img">
        <div style=" display: flex;justify-content: left;">
          <div>
            <img :src="form.img" alt="" style="height:135px;margin-right: 20px;" v-show="imgCreated">
          </div>
          <div class="product-img-div">
            <el-upload :auto-upload="true" :disabled="isActive" action="/upload/upload"
              list-type="picture-card" :on-preview="handlePictureCardPreview" :file-list="fileList"
              :on-remove="handleRemove" :on-success="handle_success" :before-upload="before_upload">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                    <i class="el-icon-download"></i>
                  </span>
                  <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="form.img" alt="">
            </el-dialog>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="产品介绍" prop="desc">
        <el-input type="textarea" v-model="form.description" placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item label="产品售价">
        <el-input v-model="form.price"></el-input>

      </el-form-item>

      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写商品属性</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { getCateGory, addSpu } from '@/api/shop.js'

export default {
  name: 'AddShop',
  data() {
    return {
      form: {
        name: "", // 商品名
        brandName: "",
        img: '',
        description: "",
        price: "",
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
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      isActive: false,
      imgCreated: false,
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
      // console.log('submit!');

    },
    uploadImg() {
    },
    // 分类改变时
    handleCateChange() {

      // console.log("改变了分类");
      // console.log(this.productCateOptionsValue);
      let brandArr = this.productCateOptionsValue;
      // console.log(brandArr[1]);
      // 获取品牌名
    },
    // 上传图片函数
    handleRemove(file,fileList) {
      console.log(file,fileList);
    },
    handlePictureCardPreview(res,file) {
      this.dialogImageUrl = file.url;
      // console.log(file.url);
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    // 上传之前
    before_upload(file) {
      console.log(file);
    },
    handleNext() {
      // 准备数据
      const data = {
        title: this.form.name,
        // store_id: this.storeInfo.id,
        store_id: 1,
        // spec: name,
        spec: '1',
        img: this.dialogImageUrl,
        price: this.form.price,
        brand: this.form.brandName,
        sub_title: this.form.description,
      };
      // 添加spu
      addSpu(data)
        .then((res) => {
          // console.log("添加成功", res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  // 上传成功
    handle_success(response, file, fileList) {
      this.form.img = file.url;
    }
  },

  created() {
    if (this.$route.query) {
      this.form = this.$route.query;
      this.imgCreated = true;
    }

  },

  mounted() {

  },

  watch: {

  }
}

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


      border-radius: 10px;

      i {
        display: inline-block;
        width: 28px;
        height: 28px;
        margin: 50% 50%;
        transform: translate(-20%, -50%);
      }
    }

  }
}


.el-form-item__content {
  width: 800px !important;
  display: flex;
  justify-content: left;
}

.product-img-div {
  width: 1000px !important;
}
</style>