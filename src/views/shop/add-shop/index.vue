<template>
  <div class="add-shop">
    <el-form ref="form" :model="form" label-width="80px">

      <el-form-item label="产品分类">
        <el-cascader v-model="productCateOptionsValue" :options="productCateOptions" clearable
<<<<<<< HEAD
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
            <el-upload :auto-upload="false" :disabled="isActive" action="http://192.168.205.83:3000/posts/"
              list-type="picture-card" :limit="1" :on-preview="handlePictureCardPreview" :file-list="fileList"
              :on-remove="handleRemove" :on-success="handle_success">
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
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="产品介绍" prop="desc">
        <el-input type="textarea" v-model="form.description" placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item label="产品售价">
        <el-input v-model="form.price"></el-input>
=======
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
>>>>>>> master
      </el-form-item>

      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写商品属性</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
<<<<<<< HEAD
import { getCateGory, addSpu } from '@/api/shop.js'
=======
import { getCateGory } from '@/api/shop.js'
>>>>>>> master
export default {
  name: 'AddShop',

  data() {
    return {
      form: {
<<<<<<< HEAD
        name: "", // 商品名
        brandName: "",
        img: '',
        description: "",
        price: "",
=======
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
>>>>>>> master
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
<<<<<<< HEAD
            },
            {
              value: '2',
              label: 'shoubiao'
=======
>>>>>>> master
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
<<<<<<< HEAD
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
      console.log('ddd');
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
=======
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
>>>>>>> master
    },
    uploadImg() {
    },
    // 分类改变时
    handleCateChange() {
<<<<<<< HEAD
      // console.log("改变了分类");
      // console.log(this.productCateOptionsValue);
      let brandArr = this.productCateOptionsValue;
      // console.log(brandArr[1]);
      // 获取品牌名
    },
    // 上传图片函数
    handleRemove(file) {
      // console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      // console.log(file);
    },
    handleNext() {
      // 向vuex中添加数据
      // this.updateSpuTitle(this.form.name);
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

      // console.log("进入下一栏");

      // this.$emit("nextStep");

      // 添加spu
      addSpu(data)
        .then((res) => {
          console.log("添加成功", res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.$emit("nextStep");
    },

    handle_success(response, file, fileList) {
      console.log(response, file, fileList);
=======
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
>>>>>>> master
    }
  },

  created() {
<<<<<<< HEAD
    if (this.$route.query) {
      this.form = this.$route.query;
      this.imgCreated = true;
    }
=======
    this.getProductCateList()

>>>>>>> master
  },

  mounted() {

  },
<<<<<<< HEAD
  watch: {

  }
}
=======
};
>>>>>>> master
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
<<<<<<< HEAD
=======
      border: 1px dashed rgb(160, 159, 159);
>>>>>>> master
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
<<<<<<< HEAD

.el-form-item__content {
  width: 800px !important;
  display: flex;
  justify-content: left;
}
=======
>>>>>>> master
</style>