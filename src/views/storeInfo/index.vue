<template>
  <div class="store">
    <div class="form">
      <el-form ref="form" :model="form" label-width="80px" :style="{width:'400px',margin:'0 auto'}">
        <el-form-item label="头像上传">
          <el-upload
            class="avatar-uploader"
            action="http://192.168.205.195:3000/upload/addimguser"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺介绍">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺所在区">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="店主姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>取消</el-button>
          <el-button type="primary" @click="onSubmit">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        desc: "",
      },
      imageUrl: "",
      img_user_url:"",
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.img_user_url = res.data.imgsrc;
      // console.log(this.img_user_url);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="scss" scoped>
.store {
  padding: 0;
  margin: 0 auto;
}
.form {
  width: 800px;
  padding: 20px;
  border: 1px solid #e6e6e6;
  margin: 20px auto;
}

.avatar-uploader .el-upload {
  border: 1px dashed #1c1a1a;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

