<template>
  <div class="shop" 
  @click="shopClickHandle" 
  :style="{width}">
    <div class="image">
        <!-- 
            todo:优化：提供预定义懒加载图片，
                      提供用户选择是否懒加载
         -->
        <!-- <img :src="shop.img_list_url" alt="" :style="{height:imgHeight,}"> -->

        <img :src="shop.img_list_url" alt="" :style="{height:imgHeight}">
    </div>
    <div class="title">
        <span>{{shop.title}}</span>
    </div>
    <div class="price">
        <span class="price">{{shop.price}}</span>
        <p v-html="shop.mack"></p>
    </div>
  </div>
</template>

<script>
export default {
    name:'ShopItem',
    /**
     * 自定义属性shop
     * 接受当前组件需要的数据
     */
    props:{
        shop:Object,
        width:{
            type:String,
            default:'20%',
        },
        imgHeight:{
            type:String,
            default:'50%'
        }
    },
    methods: {
        shopClickHandle(e){
            // 定义：
            this.$emit('onShopClick',e,this.shop)
        }
    },
}
</script>

<style lang='scss' scoped>
.shop{
    display: inline-block;
    padding: 10px 15px;
    text-align: center;
    font-size: 14px;
    box-shadow: 0 0 3px #222;
    margin: 10px;
    width: 80%;
    .image>img{
        width: 100%;
    }
    &:hover{
        box-shadow: -3px 3px 3px #222;
    }
}
</style>